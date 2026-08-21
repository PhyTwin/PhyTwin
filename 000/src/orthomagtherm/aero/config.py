"""翼型设计闭环配置。"""

from __future__ import annotations

from dataclasses import asdict, dataclass, field
import json
from pathlib import Path
from typing import Any


@dataclass(slots=True)
class AirfoilDesign:
    """NACA 四参数族的连续化几何变量。"""

    camber: float = 0.006
    camber_position: float = 0.40
    thickness: float = 0.12
    chord: float = 1.0
    panels: int = 100


@dataclass(slots=True)
class FlightCondition:
    speed: float = 60.0
    density: float = 1.225
    angle_of_attack_degrees: float = 3.0


@dataclass(slots=True)
class DesignStandards:
    target_lift_coefficient: float = 0.75
    lift_tolerance: float = 0.025
    max_abs_pitching_moment: float = 0.12
    minimum_allowed_cp: float = -5.0
    minimum_thickness: float = 0.10
    maximum_thickness: float = 0.16
    max_estimated_drag_coefficient: float = 0.025


@dataclass(slots=True)
class ShapeBounds:
    minimum_camber: float = 0.0
    maximum_camber: float = 0.09
    minimum_camber_position: float = 0.20
    maximum_camber_position: float = 0.80
    minimum_thickness: float = 0.06
    maximum_thickness: float = 0.24


@dataclass(slots=True)
class AeroOptimizationConfig:
    maximum_iterations: int = 24
    normalized_probe_step: float = 0.035
    normalized_design_step: float = 0.12
    minimum_design_step: float = 0.002
    backtracking_levels: int = 6
    regularization_weight: float = 0.015
    field_points_x: int = 180
    field_points_y: int = 110


@dataclass(slots=True)
class AeroOutputConfig:
    directory: str = "results/aero_design"
    save_iteration_surfaces: bool = True
    save_plot: bool = True


@dataclass(slots=True)
class AeroRunConfig:
    name: str = "automatic_airfoil_design"
    design: AirfoilDesign = field(default_factory=AirfoilDesign)
    flight: FlightCondition = field(default_factory=FlightCondition)
    standards: DesignStandards = field(default_factory=DesignStandards)
    bounds: ShapeBounds = field(default_factory=ShapeBounds)
    optimization: AeroOptimizationConfig = field(default_factory=AeroOptimizationConfig)
    output: AeroOutputConfig = field(default_factory=AeroOutputConfig)

    def validate(self) -> None:
        d, f, s, b, o = self.design, self.flight, self.standards, self.bounds, self.optimization
        if d.chord <= 0 or d.panels < 40 or d.panels % 2:
            raise ValueError("chord 必须为正数，panels 必须是不小于 40 的偶数")
        if f.speed <= 0 or f.density <= 0 or abs(f.angle_of_attack_degrees) >= 25:
            raise ValueError("来流速度/密度必须为正，攻角绝对值应小于 25 度")
        if not (0 <= d.camber <= 0.12 and 0 < d.camber_position < 1 and 0.02 < d.thickness < 0.30):
            raise ValueError("初始翼型几何参数超出可计算范围")
        if not (b.minimum_camber < b.maximum_camber):
            raise ValueError("弯度边界无效")
        if not (b.minimum_camber_position < b.maximum_camber_position):
            raise ValueError("弯度位置边界无效")
        if not (b.minimum_thickness < b.maximum_thickness):
            raise ValueError("厚度边界无效")
        if not (b.minimum_camber <= d.camber <= b.maximum_camber):
            raise ValueError("初始弯度不在优化边界内")
        if not (b.minimum_camber_position <= d.camber_position <= b.maximum_camber_position):
            raise ValueError("初始弯度位置不在优化边界内")
        if not (b.minimum_thickness <= d.thickness <= b.maximum_thickness):
            raise ValueError("初始厚度不在优化边界内")
        if s.lift_tolerance <= 0 or s.minimum_thickness >= s.maximum_thickness:
            raise ValueError("升力容差或设计厚度标准无效")
        if o.maximum_iterations < 1 or not (0 < o.minimum_design_step < o.normalized_design_step):
            raise ValueError("优化迭代参数无效")
        if min(o.field_points_x, o.field_points_y) < 40:
            raise ValueError("流场输出网格每个方向至少 40 点")

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)

    def save(self, path: str | Path) -> None:
        target = Path(path)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(json.dumps(self.to_dict(), ensure_ascii=False, indent=2), encoding="utf-8")

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "AeroRunConfig":
        config = cls(
            name=data.get("name", "automatic_airfoil_design"),
            design=AirfoilDesign(**data.get("design", {})),
            flight=FlightCondition(**data.get("flight", {})),
            standards=DesignStandards(**data.get("standards", {})),
            bounds=ShapeBounds(**data.get("bounds", {})),
            optimization=AeroOptimizationConfig(**data.get("optimization", {})),
            output=AeroOutputConfig(**data.get("output", {})),
        )
        config.validate()
        return config

    @classmethod
    def load(cls, path: str | Path) -> "AeroRunConfig":
        return cls.from_dict(json.loads(Path(path).read_text(encoding="utf-8")))
