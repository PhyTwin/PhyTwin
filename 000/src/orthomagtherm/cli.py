"""命令行入口。"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys

from .config import RunConfig
from .solver import OrthoMagThermSolver


def _progress(row: dict[str, float | int]) -> None:
    if "kinetic_energy" in row:
        print(
            f"t={float(row['time']):.5f}  step={int(row['step']):6d}  "
            f"Ek={float(row['kinetic_energy']):.4e}  "
            f"Em={float(row['magnetic_perturbation_energy']):.4e}  "
            f"Nu*={float(row['nusselt_estimate']):.5f}"
        )
    else:
        print(f"时间步回退: t={row.get('time')} retries={row.get('retries')}")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="omt-sim", description="正交 Galerkin 热磁流体求解器")
    sub = parser.add_subparsers(dest="command", required=True)
    run = sub.add_parser("run", help="运行 JSON 配置")
    run.add_argument("config", type=Path)
    run.add_argument("--output", type=Path, help="覆盖配置中的输出目录")
    init = sub.add_parser("init-config", help="生成默认配置")
    init.add_argument("path", type=Path, nargs="?", default=Path("omt_config.json"))
    inspect = sub.add_parser("inspect", help="显示 npz 结果摘要")
    inspect.add_argument("path", type=Path)
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    if args.command == "init-config":
        config = RunConfig()
        config.validate()
        config.save(args.path)
        print(f"已生成配置: {args.path.resolve()}")
        return 0
    if args.command == "inspect":
        import numpy as np

        with np.load(args.path) as data:
            summary = {name: list(data[name].shape) for name in data.files}
            summary["time"] = float(data["time"])
            summary["step"] = int(data["step"])
        print(json.dumps(summary, ensure_ascii=False, indent=2))
        return 0
    config = RunConfig.load(args.config)
    solver = OrthoMagThermSolver(config)
    destination = solver.run(args.output, progress=_progress)
    print(f"计算完成，结果目录: {destination.resolve()}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
