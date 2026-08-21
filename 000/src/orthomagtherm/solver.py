"""热磁流体正交 Galerkin 时间推进核心。"""

from __future__ import annotations

from dataclasses import dataclass
import math
from pathlib import Path
from typing import Callable

import numpy as np

from .basis import SineGalerkinBasis
from .config import RunConfig
from .controller import CoupledModalTailController
from .diagnostics import calculate_diagnostics, reconstruct_fields
from .state import ModalState, NonlinearTerms


@dataclass(slots=True)
class StepReport:
    dt: float
    retries: int
    filter_strengths: tuple[float, float, float]
    tail_ratios: tuple[float, float, float]

    @property
    def filter_strength(self) -> float:
        return max(self.filter_strengths)


class OrthoMagThermSolver:
    """二维不可压缩流体—磁场—温度场耦合求解器。

    变量为涡量 omega、面外磁势 a、温度扰动 theta。流函数 psi 由
    -Delta(psi)=omega 得到，因此速度与磁感应强度均由势函数的旋度
    重构，在连续离散结构上自动满足散度为零。
    """

    def __init__(self, config: RunConfig) -> None:
        config.validate()
        self.config = config
        d, n = config.domain, config.numerical
        self.basis = SineGalerkinBasis(
            n.modes_x, n.modes_y, d.length_x, d.length_y, n.oversampling
        )
        self.state = self._create_initial_state()
        self.previous_nonlinear: NonlinearTerms | None = None
        self.previous_dt: float | None = None
        self.controller = CoupledModalTailController(self.basis, n)
        self.last_report = StepReport(n.initial_dt, 0, (0.0, 0.0, 0.0), (0.0, 0.0, 0.0))
        self.heat_source_coefficients = self._create_heat_source()

    def _create_initial_state(self) -> ModalState:
        cfg = self.config.initial
        rng = np.random.default_rng(cfg.seed)
        shape = self.basis.shape
        psi = np.zeros(shape)
        magnetic = np.zeros(shape)
        temperature = np.zeros(shape)
        ex = min(cfg.excited_modes_x, shape[0])
        ey = min(cfg.excited_modes_y, shape[1])
        ix = np.arange(1, ex + 1)[:, None]
        iy = np.arange(1, ey + 1)[None, :]
        decay = 1.0 / (ix**2 + iy**2)
        psi[:ex, :ey] = cfg.streamfunction_amplitude * decay * rng.normal(size=(ex, ey))
        magnetic[:ex, :ey] = (
            cfg.magnetic_potential_amplitude * decay * rng.normal(size=(ex, ey))
        )
        temperature[:ex, :ey] = (
            cfg.temperature_amplitude * decay * rng.normal(size=(ex, ey))
        )
        # 确保基准对流胞存在，避免随机种子恰好产生近零主模态。
        temperature[0, 0] += cfg.temperature_amplitude
        psi[0, 0] += 0.25 * cfg.streamfunction_amplitude
        return ModalState(self.basis.lambda2 * psi, magnetic, temperature)

    def _create_heat_source(self) -> np.ndarray:
        p = self.config.physics
        if p.heat_source_amplitude == 0:
            return self.basis.zeros()
        xx, yy = np.meshgrid(self.basis.x, self.basis.y, indexing="ij")
        width2 = max(p.heat_source_width, 1.0e-12) ** 2
        source = p.heat_source_amplitude * np.exp(
            -((xx - p.heat_source_x) ** 2 + (yy - p.heat_source_y) ** 2) / (2.0 * width2)
        )
        return self.basis.project(source)

    def nonlinear_terms(self, state: ModalState) -> NonlinearTerms:
        b, p = self.basis, self.config.physics
        psi = state.vorticity / b.lambda2
        current = b.lambda2 * state.magnetic_potential

        advected_vorticity = b.jacobian(psi, state.vorticity)
        buoyancy_curl = p.buoyancy * b.project(b.dx(state.temperature))
        lorentz_curl = p.lorentz * (
            b.jacobian(current, state.magnetic_potential)
            + p.imposed_vertical_magnetic_field * b.project(b.dy(current))
        )

        magnetic_advection = b.jacobian(psi, state.magnetic_potential)
        imposed_field_induction = p.imposed_vertical_magnetic_field * b.project(b.dy(psi))

        thermal_advection = b.jacobian(psi, state.temperature)
        vertical_velocity = -b.dx(psi)
        background_heat_advection = (
            p.background_temperature_gradient * b.project(vertical_velocity)
        )
        return NonlinearTerms(
            advected_vorticity + buoyancy_curl + lorentz_curl,
            magnetic_advection + imposed_field_induction,
            thermal_advection + background_heat_advection + self.heat_source_coefficients,
        )

    def suggest_dt(self, state: ModalState) -> float:
        n, p, b = self.config.numerical, self.config.physics, self.basis
        psi = state.vorticity / b.lambda2
        u, v = b.dy(psi), -b.dx(psi)
        bx = b.dy(state.magnetic_potential)
        by = p.imposed_vertical_magnetic_field - b.dx(state.magnetic_potential)
        alfven_scale = math.sqrt(max(p.lorentz, 0.0))
        transport_x = float(np.max(np.abs(u) + alfven_scale * np.abs(bx)))
        transport_y = float(np.max(np.abs(v) + alfven_scale * np.abs(by)))
        dx, dy = b.lx / (b.nx + 1), b.ly / (b.ny + 1)
        inverse_dt = transport_x / dx + transport_y / dy
        if inverse_dt < 1.0e-14:
            return n.max_dt
        return min(n.max_dt, max(n.min_dt, n.cfl / inverse_dt))

    def _advance_candidate(
        self, state: ModalState, current: NonlinearTerms, dt: float
    ) -> ModalState:
        p, b = self.config.physics, self.basis
        diffusion = (
            p.viscosity * b.lambda2,
            p.magnetic_diffusivity * b.lambda2,
            p.thermal_diffusivity * b.lambda2,
        )
        result: list[np.ndarray] = []
        if self.previous_nonlinear is None or self.previous_dt is None:
            for old, nonlinear, rate in zip(state.arrays(), current.arrays(), diffusion):
                result.append((old + dt * nonlinear) / (1.0 + dt * rate))
        else:
            ratio = dt / self.previous_dt
            previous_arrays = self.previous_nonlinear.arrays()
            for old, now_nl, old_nl, rate in zip(
                state.arrays(), current.arrays(), previous_arrays, diffusion
            ):
                explicit = (1.0 + 0.5 * ratio) * now_nl - 0.5 * ratio * old_nl
                numerator = (1.0 - 0.5 * dt * rate) * old + dt * explicit
                result.append(numerator / (1.0 + 0.5 * dt * rate))
        return ModalState(result[0], result[1], result[2], state.time + dt, state.step + 1)

    def _candidate_is_valid(self, old: ModalState, new: ModalState) -> bool:
        if not new.finite():
            return False
        old_norm = old.squared_norm()
        new_norm = new.squared_norm()
        permitted = max(
            self.config.numerical.state_growth_limit * old_norm,
            old_norm + 1.0e-10,
        )
        return new_norm <= permitted

    def step(self, requested_dt: float | None = None) -> StepReport:
        n = self.config.numerical
        dt = min(requested_dt if requested_dt is not None else self.suggest_dt(self.state), n.max_dt)
        if dt < n.min_dt:
            raise RuntimeError(f"请求时间步 {dt:.3e} 小于 min_dt={n.min_dt:.3e}")
        current_nonlinear = self.nonlinear_terms(self.state)
        retries = 0
        while True:
            candidate = self._advance_candidate(self.state, current_nonlinear, dt)
            candidate, decision = self.controller.apply(candidate)
            if self._candidate_is_valid(self.state, candidate):
                break
            retries += 1
            dt *= 0.5
            if retries > n.max_retries or dt < n.min_dt:
                raise FloatingPointError("时间推进连续回退失败：请减小时间步或增加模态数")
        self.previous_nonlinear = current_nonlinear
        self.previous_dt = dt
        self.state = candidate
        self.last_report = StepReport(dt, retries, decision.strengths, decision.ratios)
        return self.last_report

    def diagnostics(self) -> dict[str, float | int]:
        r = self.last_report
        return calculate_diagnostics(
            self.basis, self.state, self.config.physics, r.dt, r.filter_strengths, r.tail_ratios
        )

    def fields(self) -> dict[str, np.ndarray]:
        return reconstruct_fields(self.basis, self.state, self.config.physics)

    def run(
        self,
        output_directory: str | Path | None = None,
        progress: Callable[[dict[str, float | int]], None] | None = None,
    ) -> Path:
        from .io import OutputManager

        n = self.config.numerical
        target = Path(output_directory or self.config.output.directory)
        manager = OutputManager(target, self.config)
        manager.prepare()
        manager.record(self, force_snapshot=True)
        next_output = min(n.output_interval, n.end_time)
        output_index = 1
        tolerance = 1.0e-12 * max(1.0, n.end_time)
        while self.state.time < n.end_time - tolerance:
            stable_dt = min(self.suggest_dt(self.state), n.max_dt)
            stop_time = min(next_output, n.end_time)
            remaining = stop_time - self.state.time
            dt = min(stable_dt, remaining)
            if dt < n.min_dt and remaining <= 10 * tolerance:
                self.state.time = stop_time
            else:
                report = self.step(dt)
                if report.retries and progress is not None:
                    progress({"time": self.state.time, "step": self.state.step, "retries": report.retries})
            if self.state.time >= stop_time - tolerance:
                row = manager.record(
                    self,
                    force_snapshot=(output_index % max(1, self.config.output.snapshot_stride) == 0),
                )
                if progress is not None:
                    progress(row)
                output_index += 1
                next_output = min(output_index * n.output_interval, n.end_time)
        manager.finalize(self)
        return target
