"""Hess–Smith 常强度源面板/总环量二维势流求解器。"""

from __future__ import annotations

from dataclasses import dataclass
import numpy as np
from numpy.typing import NDArray

from .config import FlightCondition
from .geometry import AirfoilGeometry, points_inside_polygon

Array = NDArray[np.float64]


@dataclass(frozen=True, slots=True)
class PanelSolution:
    control_x: Array
    control_y: Array
    tangent_x: Array
    tangent_y: Array
    normal_x: Array
    normal_y: Array
    length: Array
    source_strength: Array
    circulation_strength: float
    tangential_velocity: Array
    pressure_coefficient: Array
    lift_coefficient: float
    pressure_drag_coefficient: float
    estimated_drag_coefficient: float
    pitching_moment_c4: float


class HessSmithSolver:
    def __init__(self, geometry: AirfoilGeometry, flight: FlightCondition) -> None:
        self.geometry = geometry
        self.flight = flight
        self.x0 = geometry.x[:-1]
        self.y0 = geometry.y[:-1]
        dx = geometry.x[1:] - geometry.x[:-1]
        dy = geometry.y[1:] - geometry.y[:-1]
        self.length = np.hypot(dx, dy)
        if np.any(self.length < 1.0e-12 * geometry.chord):
            raise ValueError("翼型包含退化面板")
        self.tx, self.ty = dx / self.length, dy / self.length
        # 逆时针轮廓的外法向指向路径右侧。
        self.nx, self.ny = self.ty, -self.tx
        self.cx = self.x0 + 0.5 * dx
        self.cy = self.y0 + 0.5 * dy

    def _panel_velocity(
        self, x: Array, y: Array, panel: int, vortex: bool = False
    ) -> tuple[Array, Array]:
        rx, ry = x - self.x0[panel], y - self.y0[panel]
        local_x = rx * self.tx[panel] + ry * self.ty[panel]
        local_y = rx * self.nx[panel] + ry * self.ny[panel]
        r1_sq = np.maximum(local_x**2 + local_y**2, 1.0e-300)
        r2_sq = np.maximum((local_x - self.length[panel]) ** 2 + local_y**2, 1.0e-300)
        source_t = 0.25 / np.pi * np.log(r1_sq / r2_sq)
        source_n = 0.5 / np.pi * (
            np.arctan2(local_y, local_x - self.length[panel])
            - np.arctan2(local_y, local_x)
        )
        if vortex:
            local_t, local_n = -source_n, source_t
        else:
            local_t, local_n = source_t, source_n
        global_x = local_t * self.tx[panel] + local_n * self.nx[panel]
        global_y = local_t * self.ty[panel] + local_n * self.ny[panel]
        return global_x, global_y

    def solve(self) -> PanelSolution:
        count = len(self.length)
        source_x = np.empty((count, count))
        source_y = np.empty((count, count))
        vortex_x = np.empty((count, count))
        vortex_y = np.empty((count, count))
        for j in range(count):
            sx, sy = self._panel_velocity(self.cx, self.cy, j)
            vx, vy = self._panel_velocity(self.cx, self.cy, j, vortex=True)
            source_x[:, j], source_y[:, j] = sx, sy
            vortex_x[:, j], vortex_y[:, j] = vx, vy
        # 使用解析自影响，避免 atan2 在正负零上的平台差异。
        diagonal = np.arange(count)
        source_x[diagonal, diagonal] = 0.5 * self.nx
        source_y[diagonal, diagonal] = 0.5 * self.ny
        vortex_x[diagonal, diagonal] = -0.5 * self.tx
        vortex_y[diagonal, diagonal] = -0.5 * self.ty

        normal_source = source_x * self.nx[:, None] + source_y * self.ny[:, None]
        normal_vortex_total = np.sum(
            vortex_x * self.nx[:, None] + vortex_y * self.ny[:, None], axis=1
        )
        alpha = np.deg2rad(self.flight.angle_of_attack_degrees)
        free_x, free_y = self.flight.speed * np.cos(alpha), self.flight.speed * np.sin(alpha)
        matrix = np.zeros((count + 1, count + 1))
        rhs = np.zeros(count + 1)
        matrix[:count, :count] = normal_source
        matrix[:count, count] = normal_vortex_total
        rhs[:count] = -(free_x * self.nx + free_y * self.ny)

        tangential_source = source_x * self.tx[:, None] + source_y * self.ty[:, None]
        tangential_vortex_total = np.sum(
            vortex_x * self.tx[:, None] + vortex_y * self.ty[:, None], axis=1
        )
        # 尾缘上下表面速度沿相反切向的代数和为零。
        matrix[count, :count] = tangential_source[0, :] + tangential_source[-1, :]
        matrix[count, count] = tangential_vortex_total[0] + tangential_vortex_total[-1]
        rhs[count] = -(free_x * (self.tx[0] + self.tx[-1]) + free_y * (self.ty[0] + self.ty[-1]))
        unknown = np.linalg.solve(matrix, rhs)
        sigma, gamma = unknown[:-1], float(unknown[-1])
        vt = (
            free_x * self.tx
            + free_y * self.ty
            + tangential_source @ sigma
            + tangential_vortex_total * gamma
        )
        cp = 1.0 - (vt / self.flight.speed) ** 2
        force_x = -float(np.sum(cp * self.nx * self.length) / self.geometry.chord)
        force_y = -float(np.sum(cp * self.ny * self.length) / self.geometry.chord)
        drag_pressure = force_x * np.cos(alpha) + force_y * np.sin(alpha)
        lift = -force_x * np.sin(alpha) + force_y * np.cos(alpha)
        dfx = -cp * self.nx * self.length / self.geometry.chord
        dfy = -cp * self.ny * self.length / self.geometry.chord
        rx = (self.cx - 0.25 * self.geometry.chord) / self.geometry.chord
        ry = self.cy / self.geometry.chord
        moment = float(np.sum(rx * dfy - ry * dfx))
        # 势流没有黏性阻力；为概念筛选提供明确标注的经验阻力代理量。
        profile_drag = 0.0065 + 0.004 * (self.geometry.thickness / 0.12) ** 2
        induced_2d_surrogate = 0.010 * lift**2
        estimated_drag = max(0.0, drag_pressure) + profile_drag + induced_2d_surrogate
        return PanelSolution(
            self.cx.copy(), self.cy.copy(), self.tx.copy(), self.ty.copy(),
            self.nx.copy(), self.ny.copy(), self.length.copy(), sigma, gamma,
            vt, cp, lift, drag_pressure, estimated_drag, moment,
        )

    def velocity_field(
        self, solution: PanelSolution, x: Array, y: Array
    ) -> tuple[Array, Array, Array]:
        alpha = np.deg2rad(self.flight.angle_of_attack_degrees)
        velocity_x = np.full(np.broadcast(x, y).shape, self.flight.speed * np.cos(alpha))
        velocity_y = np.full_like(velocity_x, self.flight.speed * np.sin(alpha))
        for j, sigma in enumerate(solution.source_strength):
            sx, sy = self._panel_velocity(x, y, j)
            vx, vy = self._panel_velocity(x, y, j, vortex=True)
            velocity_x += sigma * sx + solution.circulation_strength * vx
            velocity_y += sigma * sy + solution.circulation_strength * vy
        inside = points_inside_polygon(x, y, self.geometry.x, self.geometry.y)
        velocity_x = np.where(inside, np.nan, velocity_x)
        velocity_y = np.where(inside, np.nan, velocity_y)
        pressure_coefficient = 1.0 - (
            (velocity_x**2 + velocity_y**2) / self.flight.speed**2
        )
        return velocity_x, velocity_y, pressure_coefficient
