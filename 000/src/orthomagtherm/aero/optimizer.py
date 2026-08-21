"""流场反馈驱动的翼型几何闭环优化。"""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Callable

import numpy as np

from .config import AeroRunConfig, AirfoilDesign
from .evaluator import AeroEvaluation, DesignEvaluator


@dataclass(frozen=True, slots=True)
class DesignIteration:
    iteration: int
    evaluation: AeroEvaluation
    modification: str


@dataclass(frozen=True, slots=True)
class OptimizationResult:
    converged: bool
    reason: str
    final: AeroEvaluation
    history: tuple[DesignIteration, ...]
    output_directory: Path | None = None


class AeroDesignOptimizer:
    """有限差分流场敏感度 + 回溯线搜索的投影几何优化器。"""

    variable_names = ("弯度", "最大弯度位置", "厚度")

    def __init__(self, config: AeroRunConfig) -> None:
        config.validate()
        self.config = config
        self.evaluator = DesignEvaluator(config)
        bounds = config.bounds
        self.lower = np.array(
            [bounds.minimum_camber, bounds.minimum_camber_position, bounds.minimum_thickness]
        )
        self.upper = np.array(
            [bounds.maximum_camber, bounds.maximum_camber_position, bounds.maximum_thickness]
        )

    def _normalized(self, design: AirfoilDesign) -> np.ndarray:
        physical = np.array([design.camber, design.camber_position, design.thickness])
        return (physical - self.lower) / (self.upper - self.lower)

    def _design(self, normalized: np.ndarray) -> AirfoilDesign:
        values = self.lower + np.clip(normalized, 0.0, 1.0) * (self.upper - self.lower)
        original = self.config.design
        return AirfoilDesign(
            camber=float(values[0]),
            camber_position=float(values[1]),
            thickness=float(values[2]),
            chord=original.chord,
            panels=original.panels,
        )

    def _gradient(self, position: np.ndarray) -> np.ndarray:
        step = self.config.optimization.normalized_probe_step
        gradient = np.zeros(3)
        for index in range(3):
            plus, minus = position.copy(), position.copy()
            plus[index] = min(1.0, plus[index] + step)
            minus[index] = max(0.0, minus[index] - step)
            denominator = plus[index] - minus[index]
            if denominator <= 1.0e-12:
                continue
            upper_value = self.evaluator.evaluate(self._design(plus)).objective
            lower_value = self.evaluator.evaluate(self._design(minus)).objective
            gradient[index] = (upper_value - lower_value) / denominator
        return gradient

    def optimize(
        self,
        output_directory: str | Path | None = None,
        progress: Callable[[DesignIteration], None] | None = None,
    ) -> OptimizationResult:
        options = self.config.optimization
        position = self._normalized(self.config.design)
        evaluation = self.evaluator.evaluate(self._design(position))
        history: list[DesignIteration] = []
        design_step = options.normalized_design_step
        modification = "初始外形完成流场计算。"
        reason = "达到最大迭代次数"

        for iteration_index in range(options.maximum_iterations + 1):
            item = DesignIteration(iteration_index, evaluation, modification)
            history.append(item)
            if progress is not None:
                progress(item)
            if evaluation.passed:
                reason = "全部二维概念设计标准已满足"
                break
            if iteration_index == options.maximum_iterations:
                break
            gradient = self._gradient(position)
            norm = float(np.linalg.norm(gradient))
            accepted: tuple[np.ndarray, AeroEvaluation] | None = None
            if norm > 1.0e-12:
                direction = -gradient / norm
                for level in range(options.backtracking_levels):
                    trial_position = np.clip(position + design_step * (0.5**level) * direction, 0.0, 1.0)
                    trial = self.evaluator.evaluate(self._design(trial_position))
                    if trial.objective < evaluation.objective - 1.0e-10:
                        accepted = trial_position, trial
                        break
            # 非光滑约束处梯度可能失效，使用六方向模式搜索兜底。
            if accepted is None:
                candidates: list[tuple[np.ndarray, AeroEvaluation]] = []
                for axis in range(3):
                    for sign in (-1.0, 1.0):
                        trial_position = position.copy()
                        trial_position[axis] = np.clip(
                            trial_position[axis] + sign * design_step, 0.0, 1.0
                        )
                        if np.array_equal(trial_position, position):
                            continue
                        candidates.append(
                            (trial_position, self.evaluator.evaluate(self._design(trial_position)))
                        )
                if candidates:
                    best = min(candidates, key=lambda pair: pair[1].objective)
                    if best[1].objective < evaluation.objective - 1.0e-10:
                        accepted = best
            if accepted is None:
                design_step *= 0.5
                modification = f"当前邻域未找到更优外形，归一化设计步长缩小为 {design_step:.5f}。"
                if design_step < options.minimum_design_step:
                    reason = "设计步长已小于下限，当前参数边界内未能满足全部标准"
                    break
                continue
            old_design = evaluation.design
            position, evaluation = accepted
            new_design = evaluation.design
            changes = (
                new_design.camber - old_design.camber,
                new_design.camber_position - old_design.camber_position,
                new_design.thickness - old_design.thickness,
            )
            changed = [
                f"{name}{delta:+.5f}" for name, delta in zip(self.variable_names, changes)
                if abs(delta) > 1.0e-10
            ]
            modification = "根据流场敏感度修改：" + "，".join(changed) + "。"

        result = OptimizationResult(evaluation.passed, reason, evaluation, tuple(history))
        if output_directory is not None or self.config.output.directory:
            from .output import save_optimization_result

            directory = Path(output_directory or self.config.output.directory)
            save_optimization_result(self.config, result, directory)
            result = OptimizationResult(
                result.converged, result.reason, result.final, result.history, directory
            )
        return result
