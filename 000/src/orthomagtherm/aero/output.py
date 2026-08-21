"""翼型闭环结果导出与可选绘图。"""

from __future__ import annotations

import csv
import json
from pathlib import Path

import numpy as np

from .config import AeroRunConfig
from .evaluator import evaluation_to_dict
from .optimizer import OptimizationResult
from .panel import HessSmithSolver


def save_optimization_result(
    config: AeroRunConfig, result: OptimizationResult, directory: Path
) -> None:
    directory.mkdir(parents=True, exist_ok=True)
    iterations = directory / "iterations"
    if config.output.save_iteration_surfaces:
        iterations.mkdir(parents=True, exist_ok=True)
    config.save(directory / "resolved_aero_config.json")
    rows: list[dict[str, object]] = []
    for item in result.history:
        evaluation = item.evaluation
        metrics = evaluation.metrics()
        row: dict[str, object] = {
            "iteration": item.iteration,
            "camber": evaluation.design.camber,
            "camber_position": evaluation.design.camber_position,
            "thickness": evaluation.design.thickness,
            **metrics,
            "modification": item.modification,
            "feedback": " | ".join(evaluation.feedback),
        }
        rows.append(row)
        if config.output.save_iteration_surfaces:
            _save_surface(iterations / f"surface_{item.iteration:03d}.csv", evaluation)
    with (directory / "design_history.csv").open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)

    final = result.final
    _save_geometry(directory / "final_geometry.csv", final.geometry.x, final.geometry.y)
    _save_surface(directory / "final_surface_pressure.csv", final)
    field = _calculate_final_field(config, result)
    np.savez_compressed(directory / "final_aero_field.npz", **field)
    report = {
        "software": "OrthoMagTherm AeroDesign",
        "model_level": "二维不可压缩无黏势流概念设计",
        "converged": result.converged,
        "reason": result.reason,
        "iterations": len(result.history) - 1,
        "final": evaluation_to_dict(final),
        "limitations": [
            "不包含三维机翼诱导效应、边界层、分离、激波和结构载荷",
            "estimated_drag_coefficient 为明确标注的经验代理值",
            "结果不能替代 RANS/LES、风洞试验或适航验证",
        ],
    }
    (directory / "design_report.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    if config.output.save_plot:
        _save_plot(config, result, field, directory / "aero_design_summary.png")


def _save_geometry(path: Path, x: np.ndarray, y: np.ndarray) -> None:
    np.savetxt(path, np.column_stack((x, y)), delimiter=",", header="x,y", comments="")


def _save_surface(path: Path, evaluation: object) -> None:
    solution = evaluation.solution
    data = np.column_stack(
        (
            solution.control_x,
            solution.control_y,
            solution.tangential_velocity,
            solution.pressure_coefficient,
        )
    )
    np.savetxt(path, data, delimiter=",", header="x,y,tangential_velocity,cp", comments="")


def _calculate_final_field(config: AeroRunConfig, result: OptimizationResult) -> dict[str, np.ndarray]:
    final = result.final
    chord = final.design.chord
    options = config.optimization
    x = np.linspace(-0.45 * chord, 1.55 * chord, options.field_points_x)
    y = np.linspace(-0.55 * chord, 0.55 * chord, options.field_points_y)
    xx, yy = np.meshgrid(x, y, indexing="ij")
    solver = HessSmithSolver(final.geometry, config.flight)
    velocity_x, velocity_y, cp = solver.velocity_field(final.solution, xx, yy)
    return {
        "x": x,
        "y": y,
        "velocity_x": velocity_x,
        "velocity_y": velocity_y,
        "speed": np.sqrt(velocity_x**2 + velocity_y**2),
        "pressure_coefficient": cp,
        "airfoil_x": final.geometry.x,
        "airfoil_y": final.geometry.y,
    }


def _save_plot(
    config: AeroRunConfig, result: OptimizationResult, field: dict[str, np.ndarray], path: Path
) -> bool:
    try:
        import matplotlib.pyplot as plt
    except ImportError:
        return False
    final = result.final
    fig, axes = plt.subplots(3, 1, figsize=(10, 11), constrained_layout=True)
    speed_ratio = field["speed"] / config.flight.speed
    image = axes[0].pcolormesh(field["x"], field["y"], speed_ratio.T, shading="auto", cmap="turbo")
    axes[0].fill(final.geometry.x, final.geometry.y, color="white", edgecolor="black")
    axes[0].set_aspect("equal")
    axes[0].set_title("Final velocity magnitude / freestream")
    fig.colorbar(image, ax=axes[0])
    axes[1].plot(final.solution.control_x, final.solution.pressure_coefficient, ".-")
    axes[1].invert_yaxis()
    axes[1].set_xlabel("x")
    axes[1].set_ylabel("Cp")
    axes[1].set_title("Surface pressure coefficient")
    iterations = [item.iteration for item in result.history]
    objective = [item.evaluation.objective for item in result.history]
    lift = [item.evaluation.solution.lift_coefficient for item in result.history]
    axes[2].semilogy(iterations, np.maximum(objective, 1.0e-12), "o-", label="objective")
    twin = axes[2].twinx()
    twin.plot(iterations, lift, "s--", color="tab:orange", label="Cl")
    twin.axhline(config.standards.target_lift_coefficient, color="tab:orange", alpha=0.4)
    axes[2].set_xlabel("accepted iteration")
    axes[2].set_ylabel("objective")
    twin.set_ylabel("lift coefficient")
    axes[2].grid(True, alpha=0.25)
    fig.suptitle(f"AeroDesign: converged={result.converged}, {result.reason}")
    fig.savefig(path, dpi=180)
    plt.close(fig)
    return True
