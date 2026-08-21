"""多物理场正交模态尾能控制器。"""

from __future__ import annotations

from dataclasses import dataclass
import math
import numpy as np

from .basis import SineGalerkinBasis
from .config import NumericalConfig
from .state import ModalState


@dataclass(frozen=True, slots=True)
class ControlDecision:
    ratios: tuple[float, float, float]
    strengths: tuple[float, float, float]
    strategy: str

    @property
    def shared_strength(self) -> float:
        return max(self.strengths)


class CoupledModalTailController:
    """按自然能量范数测量尾能，并同步或独立控制三个场。"""

    def __init__(self, basis: SineGalerkinBasis, config: NumericalConfig) -> None:
        self.basis = basis
        self.config = config

    def decide(self, candidate: ModalState) -> ControlDecision:
        b, n = self.basis, self.config
        ratios = (
            b.tail_energy_ratio(candidate.vorticity, n.tail_fraction, 1.0 / b.lambda2),
            b.tail_energy_ratio(candidate.magnetic_potential, n.tail_fraction, b.lambda2),
            b.tail_energy_ratio(candidate.temperature, n.tail_fraction),
        )
        strategy = n.filter_strategy if n.adaptive_filter else "off"
        if strategy == "off":
            return ControlDecision(ratios, (0.0, 0.0, 0.0), strategy)
        if strategy == "independent":
            strengths = tuple(self._basic_strength(ratio) for ratio in ratios)
            return ControlDecision(ratios, strengths, strategy)

        shared_ratio = max(ratios)
        if shared_ratio <= n.tail_energy_target:
            return ControlDecision(ratios, (0.0, 0.0, 0.0), strategy)
        # 低于目标六个数量级的值视作零信号，限制零场对离散程度的放大。
        floor = n.tail_energy_target * 1.0e-6
        log_ratios = np.log10(np.maximum(np.asarray(ratios), floor))
        spread = min(4.0, float(np.std(log_ratios)))
        strength = self._basic_strength(shared_ratio)
        strength *= 1.0 + n.coupling_spread_gain * spread
        strength = min(n.max_filter_strength, strength)
        return ControlDecision(ratios, (strength, strength, strength), strategy)

    def apply(self, candidate: ModalState) -> tuple[ModalState, ControlDecision]:
        decision = self.decide(candidate)
        b, n = self.basis, self.config
        sw, sa, st = decision.strengths
        controlled = ModalState(
            b.filter(candidate.vorticity, sw, n.filter_order),
            b.filter(candidate.magnetic_potential, sa, n.filter_order),
            b.filter(candidate.temperature, st, n.filter_order),
            candidate.time,
            candidate.step,
        )
        return controlled, decision

    def _basic_strength(self, ratio: float) -> float:
        n = self.config
        if ratio <= n.tail_energy_target:
            return 0.0
        raw = n.filter_gain * math.log(ratio / n.tail_energy_target)
        return min(n.max_filter_strength, max(0.0, raw))
