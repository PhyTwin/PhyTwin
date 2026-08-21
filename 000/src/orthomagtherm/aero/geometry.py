"""参数化二维机翼外形。"""

from __future__ import annotations

from dataclasses import dataclass
import numpy as np
from numpy.typing import NDArray

from .config import AirfoilDesign

Array = NDArray[np.float64]


@dataclass(frozen=True, slots=True)
class AirfoilGeometry:
    x: Array
    y: Array
    chord: float
    camber: float
    camber_position: float
    thickness: float


def generate_airfoil(design: AirfoilDesign) -> AirfoilGeometry:
    """生成闭合的连续 NACA 型翼型轮廓，方向为逆时针。"""
    half = design.panels // 2
    beta = np.linspace(0.0, np.pi, half + 1)
    x = 0.5 * (1.0 - np.cos(beta))
    t = design.thickness
    yt = 5.0 * t * (
        0.2969 * np.sqrt(np.maximum(x, 0.0))
        - 0.1260 * x
        - 0.3516 * x**2
        + 0.2843 * x**3
        - 0.1036 * x**4
    )
    m, p = design.camber, design.camber_position
    yc = np.zeros_like(x)
    slope = np.zeros_like(x)
    left = x < p
    if m > 0:
        yc[left] = m / p**2 * (2.0 * p * x[left] - x[left] ** 2)
        slope[left] = 2.0 * m / p**2 * (p - x[left])
        yc[~left] = m / (1.0 - p) ** 2 * (
            (1.0 - 2.0 * p) + 2.0 * p * x[~left] - x[~left] ** 2
        )
        slope[~left] = 2.0 * m / (1.0 - p) ** 2 * (p - x[~left])
    angle = np.arctan(slope)
    xu, yu = x - yt * np.sin(angle), yc + yt * np.cos(angle)
    xl, yl = x + yt * np.sin(angle), yc - yt * np.cos(angle)
    # 上表面尾缘→前缘，下表面前缘→尾缘；首尾均为尾缘闭合点。
    contour_x = np.concatenate((xu[::-1], xl[1:])) * design.chord
    contour_y = np.concatenate((yu[::-1], yl[1:])) * design.chord
    return AirfoilGeometry(
        contour_x,
        contour_y,
        design.chord,
        design.camber,
        design.camber_position,
        design.thickness,
    )


def points_inside_polygon(x: Array, y: Array, polygon_x: Array, polygon_y: Array) -> NDArray[np.bool_]:
    """向量化射线法，用于屏蔽翼型实体内部流场。"""
    inside = np.zeros(np.broadcast(x, y).shape, dtype=bool)
    xq, yq = np.broadcast_arrays(x, y)
    j = len(polygon_x) - 1
    for i in range(len(polygon_x)):
        yi, yj = polygon_y[i], polygon_y[j]
        crosses = (yi > yq) != (yj > yq)
        x_intersection = (polygon_x[j] - polygon_x[i]) * (yq - yi) / (yj - yi + 1.0e-300)
        x_intersection += polygon_x[i]
        inside ^= crosses & (xq < x_intersection)
        j = i
    return inside
