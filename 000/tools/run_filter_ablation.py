"""对比关闭、独立和跨场同步三种模态控制策略。"""

from __future__ import annotations

import argparse
import csv
from pathlib import Path
import sys
import time

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from orthomagtherm.config import RunConfig  # noqa: E402
from orthomagtherm.solver import OrthoMagThermSolver  # noqa: E402


def main() -> None:
    parser = argparse.ArgumentParser(description="运行 OrthoMagTherm 模态控制消融实验")
    parser.add_argument("config", type=Path, nargs="?", default=ROOT / "examples" / "quick_demo.json")
    parser.add_argument("--output", type=Path, default=ROOT / "results" / "filter_ablation")
    args = parser.parse_args()
    base = RunConfig.load(args.config)
    args.output.mkdir(parents=True, exist_ok=True)
    rows: list[dict[str, object]] = []
    for strategy in ("off", "independent", "synchronized"):
        config = RunConfig.from_dict(base.to_dict())
        config.name = f"{base.name}_{strategy}"
        config.numerical.filter_strategy = strategy
        config.output.directory = str(args.output / strategy)
        config.output.save_snapshots = False
        config.output.save_plots = False
        started = time.perf_counter()
        solver = OrthoMagThermSolver(config)
        solver.run()
        elapsed = time.perf_counter() - started
        diagnostics = solver.diagnostics()
        rows.append(
            {
                "strategy": strategy,
                "elapsed_seconds": elapsed,
                "steps": solver.state.step,
                "kinetic_energy": diagnostics["kinetic_energy"],
                "magnetic_energy": diagnostics["magnetic_perturbation_energy"],
                "thermal_variance": diagnostics["thermal_variance"],
                "nusselt_estimate": diagnostics["nusselt_estimate"],
                "max_tail_ratio": max(solver.last_report.tail_ratios),
                "max_filter_strength": solver.last_report.filter_strength,
            }
        )
        print(f"{strategy:12s} 完成：{solver.state.step} 步，耗时 {elapsed:.3f} s")
    summary = args.output / "ablation_summary.csv"
    with summary.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)
    print(f"对比表已写入：{summary.resolve()}")


if __name__ == "__main__":
    main()
