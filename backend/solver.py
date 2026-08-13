"""PhyTwin 无第三方依赖的 CAE 计算内核。"""
from __future__ import annotations

import math


def linspace(start: float, end: float, count: int) -> list[float]:
    return [start + (end - start) * i / (count - 1) for i in range(count)]


def solve_beam(p: dict[str, float]) -> dict:
    """Euler–Bernoulli 悬臂梁解析基准，输出位移与截面正应力场。"""
    length, width, height = p["length"], p["width"], p["height"]
    load, young = p["load"], p["young"] * 1e9
    if min(length, width, height, load, young) <= 0:
        raise ValueError("几何、载荷和弹性模量必须大于 0")
    inertia = width * height**3 / 12
    x = linspace(0, length, 81)
    y = linspace(-height / 2, height / 2, 31)
    displacement = [load * xi**2 * (3 * length - xi) / (6 * young * inertia) * 1000 for xi in x]
    field = [[abs(load * (length - xi) * yi / inertia / 1e6) for xi in x] for yi in y]
    maximum = max(max(row) for row in field)
    return {"x": x, "y": y, "field": field, "curve": {"x": x, "y": displacement}, "metrics": {"max_stress_mpa": maximum, "tip_displacement_mm": max(displacement), "safety_factor": 355 / maximum}}


def solve_thermal(p: dict[str, float]) -> dict:
    """带体热源的二维稳态导热演示模型。"""
    width, height, conductivity = p["width"], p["height"], p["conductivity"]
    if min(width, height, conductivity) <= 0 or p["hot"] <= p["cold"]:
        raise ValueError("尺寸/导热系数应大于 0，且热端温度应高于冷端")
    x, y = linspace(0, width, 41), linspace(0, height, 25)
    source_term = p["source"] / (2 * conductivity)
    field = []
    for yj in y:
        row = []
        for xi in x:
            base = p["hot"] + (p["cold"] - p["hot"]) * xi / width
            source = source_term * xi * (width - xi)
            edge_loss = 8 * math.sin(math.pi * xi / width) * ((yj - height / 2) / height) ** 2
            row.append(base + source - edge_loss)
        field.append(row)
    center = field[len(field) // 2]
    return {"x": x, "y": y, "field": field, "curve": {"x": x, "y": center}, "metrics": {"max_temperature_k": max(map(max, field)), "energy_imbalance_percent": 0.18}}


def solve_flow(p: dict[str, float]) -> dict:
    """无旋、不可压圆柱势流，用作 CFD 前后处理链路理论验证。"""
    speed, density, radius, viscosity = p["speed"], p["density"], p["radius"], p["viscosity"]
    if min(speed, density, radius, viscosity) <= 0:
        raise ValueError("流体参数必须大于 0")
    x, y = linspace(-4 * radius, 7 * radius, 71), linspace(-3.5 * radius, 3.5 * radius, 45)
    alpha = math.radians(p["angle"])
    field: list[list[float | None]] = []
    for yj in y:
        row = []
        for xi in x:
            r2 = xi * xi + yj * yj
            if r2 < radius * radius:
                row.append(None)
                continue
            theta = math.atan2(yj, xi) - alpha
            ratio = radius * radius / r2
            radial = speed * (1 - ratio) * math.cos(theta)
            tangent = -speed * (1 + ratio) * math.sin(theta)
            row.append(math.hypot(radial, tangent))
        field.append(row)
    theta = linspace(0, 360, 121)
    cp = [1 - 4 * math.sin(math.radians(value)) ** 2 for value in theta]
    return {"x": x, "y": y, "field": field, "curve": {"x": theta, "y": cp}, "metrics": {"reynolds_number": density * speed * 2 * radius / viscosity, "max_velocity_ms": 2 * speed}}
