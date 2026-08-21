"""气动结果评价、设计标准判断和可解释反馈。"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from .config import AeroRunConfig, AirfoilDesign
from .geometry import AirfoilGeometry, generate_airfoil
from .panel import HessSmithSolver, PanelSolution


@dataclass(frozen=True, slots=True)
class AeroEvaluation:
    design: AirfoilDesign
    geometry: AirfoilGeometry
    solution: PanelSolution
    objective: float
    passed: bool
    criteria: dict[str, bool]
    feedback: tuple[str, ...]

    def metrics(self) -> dict[str, float | bool]:
        s = self.solution
        return {
            "lift_coefficient": s.lift_coefficient,
            "pressure_drag_coefficient": s.pressure_drag_coefficient,
            "estimated_drag_coefficient": s.estimated_drag_coefficient,
            "pitching_moment_c4": s.pitching_moment_c4,
            "minimum_cp": float(s.pressure_coefficient.min()),
            "maximum_cp": float(s.pressure_coefficient.max()),
            "objective": self.objective,
            "passed": bool(self.passed),
        }


class DesignEvaluator:
    def __init__(self, config: AeroRunConfig) -> None:
        self.config = config

    def evaluate(self, design: AirfoilDesign) -> AeroEvaluation:
        geometry = generate_airfoil(design)
        solution = HessSmithSolver(geometry, self.config.flight).solve()
        standards = self.config.standards
        lift_error = solution.lift_coefficient - standards.target_lift_coefficient
        min_cp = float(solution.pressure_coefficient.min())
        criteria = {
            "lift": abs(lift_error) <= standards.lift_tolerance,
            "pitching_moment": abs(solution.pitching_moment_c4)
            <= standards.max_abs_pitching_moment,
            "suction_peak": min_cp >= standards.minimum_allowed_cp,
            "thickness": standards.minimum_thickness
            <= design.thickness
            <= standards.maximum_thickness,
            "estimated_drag": solution.estimated_drag_coefficient
            <= standards.max_estimated_drag_coefficient,
        }
        objective = self._objective(design, solution)
        feedback = self._feedback(design, solution, criteria)
        criteria = {name: bool(value) for name, value in criteria.items()}
        return AeroEvaluation(
            design, geometry, solution, objective, bool(all(criteria.values())), criteria, tuple(feedback)
        )

    def _objective(self, design: AirfoilDesign, solution: PanelSolution) -> float:
        s = self.config.standards
        lift_scale = max(0.12, 4.0 * s.lift_tolerance)
        objective = ((solution.lift_coefficient - s.target_lift_coefficient) / lift_scale) ** 2
        objective += (max(0.0, abs(solution.pitching_moment_c4) - s.max_abs_pitching_moment) / 0.05) ** 2
        objective += (max(0.0, s.minimum_allowed_cp - float(solution.pressure_coefficient.min())) / 1.5) ** 2
        objective += (max(0.0, s.minimum_thickness - design.thickness) / 0.025) ** 2
        objective += (max(0.0, design.thickness - s.maximum_thickness) / 0.025) ** 2
        objective += (
            max(0.0, solution.estimated_drag_coefficient - s.max_estimated_drag_coefficient) / 0.008
        ) ** 2
        objective += self.config.optimization.regularization_weight * (
            (design.camber / max(self.config.bounds.maximum_camber, 1.0e-12)) ** 2
            + ((design.thickness - 0.12) / 0.12) ** 2
        )
        return float(objective)

    def _feedback(
        self, design: AirfoilDesign, solution: PanelSolution, criteria: dict[str, bool]
    ) -> list[str]:
        s = self.config.standards
        messages: list[str] = []
        if not criteria["lift"]:
            direction = "提高弯度或使最大弯度前移" if solution.lift_coefficient < s.target_lift_coefficient else "降低弯度"
            messages.append(
                f"升力系数 {solution.lift_coefficient:.4f} 未进入目标 "
                f"{s.target_lift_coefficient:.4f}±{s.lift_tolerance:.4f}，建议{direction}。"
            )
        if not criteria["pitching_moment"]:
            messages.append(
                f"四分之一弦长力矩 {solution.pitching_moment_c4:.4f} 超限，建议调整弯度位置或减小弯度。"
            )
        min_cp = float(solution.pressure_coefficient.min())
        if not criteria["suction_peak"]:
            messages.append(
                f"最低 Cp={min_cp:.3f} 低于限制 {s.minimum_allowed_cp:.3f}，存在过强局部加速风险。"
            )
        if not criteria["thickness"]:
            messages.append(
                f"厚度比 {design.thickness:.4f} 不在 "
                f"[{s.minimum_thickness:.4f}, {s.maximum_thickness:.4f}] 内。"
            )
        if not criteria["estimated_drag"]:
            messages.append(
                f"阻力代理值 {solution.estimated_drag_coefficient:.4f} 超过 "
                f"{s.max_estimated_drag_coefficient:.4f}。"
            )
        if not messages:
            messages.append("当前二维概念设计的全部配置标准均已满足。")
        return messages


def evaluation_to_dict(evaluation: AeroEvaluation) -> dict[str, Any]:
    result: dict[str, Any] = {
        "design": {
            "camber": evaluation.design.camber,
            "camber_position": evaluation.design.camber_position,
            "thickness": evaluation.design.thickness,
        },
        "criteria": evaluation.criteria,
        "feedback": list(evaluation.feedback),
    }
    result.update(evaluation.metrics())
    return result
