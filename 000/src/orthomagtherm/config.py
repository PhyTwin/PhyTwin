"""配置模型及 JSON 序列化。"""

from __future__ import annotations

from dataclasses import asdict, dataclass, field
import json
from pathlib import Path
from typing import Any


@dataclass(slots=True)
class DomainConfig:
    length_x: float = 2.0
    length_y: float = 1.0


@dataclass(slots=True)
class PhysicsConfig:
    """无量纲物理参数。

    buoyancy 对应温度浮力旋度系数，lorentz 对应洛伦兹力系数。
    background_temperature_gradient 为向下温度梯度的正值。
    """

    viscosity: float = 2.0e-3
    magnetic_diffusivity: float = 3.0e-3
    thermal_diffusivity: float = 2.5e-3
    buoyancy: float = 4.0
    lorentz: float = 0.8
    imposed_vertical_magnetic_field: float = 0.35
    background_temperature_gradient: float = 1.0
    heat_source_amplitude: float = 0.0
    heat_source_x: float = 1.0
    heat_source_y: float = 0.25
    heat_source_width: float = 0.10


@dataclass(slots=True)
class NumericalConfig:
    modes_x: int = 18
    modes_y: int = 12
    oversampling: float = 1.6
    initial_dt: float = 2.0e-3
    max_dt: float = 8.0e-3
    min_dt: float = 1.0e-7
    end_time: float = 1.0
    output_interval: float = 0.05
    cfl: float = 0.42
    max_retries: int = 10
    state_growth_limit: float = 6.0
    adaptive_filter: bool = True
    filter_strategy: str = "synchronized"
    tail_fraction: float = 0.22
    tail_energy_target: float = 2.0e-5
    filter_order: int = 12
    filter_gain: float = 1.8
    max_filter_strength: float = 18.0
    coupling_spread_gain: float = 0.25


@dataclass(slots=True)
class InitialConfig:
    seed: int = 20260821
    streamfunction_amplitude: float = 1.0e-3
    temperature_amplitude: float = 2.0e-2
    magnetic_potential_amplitude: float = 5.0e-4
    excited_modes_x: int = 4
    excited_modes_y: int = 3


@dataclass(slots=True)
class OutputConfig:
    directory: str = "results/default_run"
    save_snapshots: bool = True
    snapshot_stride: int = 1
    save_plots: bool = True


@dataclass(slots=True)
class RunConfig:
    name: str = "thermal_mhd_demo"
    domain: DomainConfig = field(default_factory=DomainConfig)
    physics: PhysicsConfig = field(default_factory=PhysicsConfig)
    numerical: NumericalConfig = field(default_factory=NumericalConfig)
    initial: InitialConfig = field(default_factory=InitialConfig)
    output: OutputConfig = field(default_factory=OutputConfig)

    def validate(self) -> None:
        d, p, n, i = self.domain, self.physics, self.numerical, self.initial
        if d.length_x <= 0 or d.length_y <= 0:
            raise ValueError("计算域长度必须为正数")
        if min(p.viscosity, p.magnetic_diffusivity, p.thermal_diffusivity) < 0:
            raise ValueError("扩散系数不能为负数")
        if n.modes_x < 3 or n.modes_y < 3:
            raise ValueError("每个方向至少需要 3 个模态")
        if n.oversampling < 1.0:
            raise ValueError("oversampling 必须不小于 1")
        if not (0 < n.min_dt <= n.initial_dt <= n.max_dt):
            raise ValueError("时间步长应满足 0 < min_dt <= initial_dt <= max_dt")
        if n.end_time <= 0 or n.output_interval <= 0 or not (0 < n.cfl <= 1):
            raise ValueError("end_time、output_interval、cfl 配置无效")
        if not (0 < n.tail_fraction < 1) or n.tail_energy_target <= 0:
            raise ValueError("模态尾部控制参数无效")
        if n.filter_strategy not in {"synchronized", "independent", "off"}:
            raise ValueError("filter_strategy 只能是 synchronized、independent 或 off")
        if min(i.excited_modes_x, i.excited_modes_y) < 1:
            raise ValueError("初始激发模态数必须为正整数")

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)

    def save(self, path: str | Path) -> None:
        target = Path(path)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(json.dumps(self.to_dict(), ensure_ascii=False, indent=2), encoding="utf-8")

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "RunConfig":
        config = cls(
            name=data.get("name", "thermal_mhd_demo"),
            domain=DomainConfig(**data.get("domain", {})),
            physics=PhysicsConfig(**data.get("physics", {})),
            numerical=NumericalConfig(**data.get("numerical", {})),
            initial=InitialConfig(**data.get("initial", {})),
            output=OutputConfig(**data.get("output", {})),
        )
        config.validate()
        return config

    @classmethod
    def load(cls, path: str | Path) -> "RunConfig":
        data = json.loads(Path(path).read_text(encoding="utf-8"))
        return cls.from_dict(data)
