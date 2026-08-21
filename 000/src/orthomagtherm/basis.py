"""二维正交正弦 Galerkin 基与过采样投影算子。"""

from __future__ import annotations

import math
import numpy as np
from numpy.typing import NDArray

Array = NDArray[np.float64]


class SineGalerkinBasis:
    """在矩形域上构造连续归一化的 sin-sin 正交基。

    内点等权求积对当前截断基保持离散正交。非线性乘积在加密内点网格
    上计算，再执行 Galerkin 投影，以降低卷积混叠。
    """

    def __init__(
        self,
        modes_x: int,
        modes_y: int,
        length_x: float,
        length_y: float,
        oversampling: float = 1.5,
    ) -> None:
        self.mx, self.my = modes_x, modes_y
        self.lx, self.ly = length_x, length_y
        self.nx = max(modes_x + 2, int(math.ceil(oversampling * modes_x)))
        self.ny = max(modes_y + 2, int(math.ceil(oversampling * modes_y)))
        self.x = np.arange(1, self.nx + 1, dtype=float) * length_x / (self.nx + 1)
        self.y = np.arange(1, self.ny + 1, dtype=float) * length_y / (self.ny + 1)
        self.wx = length_x / (self.nx + 1)
        self.wy = length_y / (self.ny + 1)

        kx = np.arange(1, modes_x + 1, dtype=float) * np.pi / length_x
        ky = np.arange(1, modes_y + 1, dtype=float) * np.pi / length_y
        self.kx, self.ky = kx, ky
        self.phi_x = np.sqrt(2.0 / length_x) * np.sin(np.outer(self.x, kx))
        self.phi_y = np.sqrt(2.0 / length_y) * np.sin(np.outer(self.y, ky))
        self.dphi_x = np.sqrt(2.0 / length_x) * np.cos(np.outer(self.x, kx)) * kx
        self.dphi_y = np.sqrt(2.0 / length_y) * np.cos(np.outer(self.y, ky)) * ky
        self.lambda2 = kx[:, None] ** 2 + ky[None, :] ** 2

        rx = np.arange(1, modes_x + 1, dtype=float) / modes_x
        ry = np.arange(1, modes_y + 1, dtype=float) / modes_y
        self.modal_radius = np.sqrt((rx[:, None] ** 2 + ry[None, :] ** 2) / 2.0)

    @property
    def shape(self) -> tuple[int, int]:
        return self.mx, self.my

    def zeros(self) -> Array:
        return np.zeros(self.shape, dtype=float)

    def evaluate(self, coefficients: Array) -> Array:
        self._check_coefficients(coefficients)
        return self.phi_x @ coefficients @ self.phi_y.T

    def dx(self, coefficients: Array) -> Array:
        self._check_coefficients(coefficients)
        return self.dphi_x @ coefficients @ self.phi_y.T

    def dy(self, coefficients: Array) -> Array:
        self._check_coefficients(coefficients)
        return self.phi_x @ coefficients @ self.dphi_y.T

    def project(self, values: Array) -> Array:
        expected = (self.nx, self.ny)
        if values.shape != expected:
            raise ValueError(f"物理网格数组形状应为 {expected}，实际为 {values.shape}")
        return self.wx * self.wy * (self.phi_x.T @ values @ self.phi_y)

    def jacobian(self, first: Array, second: Array) -> Array:
        """投影 J(f,g)=f_x g_y-f_y g_x。"""
        values = self.dx(first) * self.dy(second) - self.dy(first) * self.dx(second)
        return self.project(values)

    def integrate(self, values: Array) -> float:
        return float(self.wx * self.wy * np.sum(values))

    def mean(self, values: Array) -> float:
        return self.integrate(values) / (self.lx * self.ly)

    def tail_energy_ratio(self, coefficients: Array, fraction: float, weight: Array | None = None) -> float:
        self._check_coefficients(coefficients)
        edge_x = max(1, int(math.ceil(fraction * self.mx)))
        edge_y = max(1, int(math.ceil(fraction * self.my)))
        mask = np.zeros(self.shape, dtype=bool)
        mask[-edge_x:, :] = True
        mask[:, -edge_y:] = True
        energy = coefficients**2 if weight is None else weight * coefficients**2
        return float(np.sum(energy[mask]) / (np.sum(energy) + 1.0e-30))

    def filter(self, coefficients: Array, strength: float, order: int) -> Array:
        if strength <= 0:
            return coefficients.copy()
        transfer = np.exp(-strength * self.modal_radius**order)
        return coefficients * transfer

    def _check_coefficients(self, coefficients: Array) -> None:
        if coefficients.shape != self.shape:
            raise ValueError(f"模态系数形状应为 {self.shape}，实际为 {coefficients.shape}")
