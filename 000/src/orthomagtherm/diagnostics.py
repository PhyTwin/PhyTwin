"""物理场重构与守恒/稳定性诊断。"""

from __future__ import annotations

import numpy as np

from .basis import SineGalerkinBasis
from .config import PhysicsConfig
from .state import ModalState


def reconstruct_fields(
    basis: SineGalerkinBasis, state: ModalState, physics: PhysicsConfig
) -> dict[str, np.ndarray]:
    psi = state.vorticity / basis.lambda2
    current_coefficients = basis.lambda2 * state.magnetic_potential
    u = basis.dy(psi)
    v = -basis.dx(psi)
    magnetic_x = basis.dy(state.magnetic_potential)
    magnetic_y_perturbation = -basis.dx(state.magnetic_potential)
    temperature_perturbation = basis.evaluate(state.temperature)
    background = 1.0 - physics.background_temperature_gradient * basis.y[None, :]
    return {
        "x": basis.x.copy(),
        "y": basis.y.copy(),
        "streamfunction": basis.evaluate(psi),
        "vorticity": basis.evaluate(state.vorticity),
        "u": u,
        "v": v,
        "magnetic_potential": basis.evaluate(state.magnetic_potential),
        "magnetic_x": magnetic_x,
        "magnetic_y": physics.imposed_vertical_magnetic_field + magnetic_y_perturbation,
        "magnetic_y_perturbation": magnetic_y_perturbation,
        "current_density": basis.evaluate(current_coefficients),
        "temperature_perturbation": temperature_perturbation,
        "temperature": background + temperature_perturbation,
    }


def calculate_diagnostics(
    basis: SineGalerkinBasis,
    state: ModalState,
    physics: PhysicsConfig,
    dt: float,
    filter_strengths: tuple[float, float, float],
    tail_ratios: tuple[float, float, float],
) -> dict[str, float | int]:
    fields = reconstruct_fields(basis, state, physics)
    u, v = fields["u"], fields["v"]
    bx = fields["magnetic_x"]
    byp = fields["magnetic_y_perturbation"]
    theta = fields["temperature_perturbation"]
    omega = fields["vorticity"]
    current = fields["current_density"]
    area = basis.lx * basis.ly
    kinetic = 0.5 * basis.integrate(u**2 + v**2)
    magnetic_perturbation = 0.5 * basis.integrate(bx**2 + byp**2)
    thermal_variance = 0.5 * basis.integrate(theta**2)
    enstrophy = 0.5 * basis.integrate(omega**2)
    current_energy = 0.5 * basis.integrate(current**2)
    convective_flux = basis.mean(v * theta)
    conductive_scale = max(
        abs(physics.thermal_diffusivity * physics.background_temperature_gradient), 1.0e-30
    )
    return {
        "step": state.step,
        "time": state.time,
        "dt": dt,
        "kinetic_energy": kinetic,
        "magnetic_perturbation_energy": magnetic_perturbation,
        "thermal_variance": thermal_variance,
        "enstrophy": enstrophy,
        "current_density_energy": current_energy,
        "mean_convective_heat_flux": convective_flux,
        "nusselt_estimate": 1.0 + convective_flux / conductive_scale,
        "rms_speed": float(np.sqrt(basis.integrate(u**2 + v**2) / area)),
        "max_speed": float(np.max(np.sqrt(u**2 + v**2))),
        "max_temperature_perturbation": float(np.max(np.abs(theta))),
        "velocity_divergence_l2": 0.0,
        "magnetic_divergence_l2": 0.0,
        "filter_strength": max(filter_strengths),
        "vorticity_filter_strength": filter_strengths[0],
        "magnetic_filter_strength": filter_strengths[1],
        "temperature_filter_strength": filter_strengths[2],
        "vorticity_tail_ratio": tail_ratios[0],
        "magnetic_tail_ratio": tail_ratios[1],
        "temperature_tail_ratio": tail_ratios[2],
    }
