"""翼型闭环设计命令行。"""

from __future__ import annotations

import argparse
from pathlib import Path

from .config import AeroRunConfig
from .optimizer import AeroDesignOptimizer, DesignIteration


def _progress(item: DesignIteration) -> None:
    evaluation = item.evaluation
    solution = evaluation.solution
    status = "PASS" if evaluation.passed else "ADJUST"
    print(
        f"iter={item.iteration:02d}  J={evaluation.objective:.5e}  "
        f"Cl={solution.lift_coefficient:+.4f}  Cm={solution.pitching_moment_c4:+.4f}  "
        f"Cpmin={solution.pressure_coefficient.min():+.3f}  {status}"
    )
    print(f"  {item.modification}")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="omt-aero", description="流场反馈驱动的二维翼型自动设计")
    sub = parser.add_subparsers(dest="command", required=True)
    run = sub.add_parser("run", help="运行翼型闭环设计")
    run.add_argument("config", type=Path)
    run.add_argument("--output", type=Path)
    init = sub.add_parser("init-config", help="生成默认航空设计配置")
    init.add_argument("path", type=Path, nargs="?", default=Path("aero_design.json"))
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    if args.command == "init-config":
        config = AeroRunConfig()
        config.validate()
        config.save(args.path)
        print(f"已生成配置：{args.path.resolve()}")
        return 0
    config = AeroRunConfig.load(args.config)
    result = AeroDesignOptimizer(config).optimize(args.output, progress=_progress)
    final = result.final
    print(f"结束原因：{result.reason}")
    print(
        f"最终外形：弯度={final.design.camber:.5f}，"
        f"弯度位置={final.design.camber_position:.5f}，厚度={final.design.thickness:.5f}"
    )
    print(f"结果目录：{result.output_directory.resolve() if result.output_directory else '未保存'}")
    return 0 if result.converged else 2


if __name__ == "__main__":
    raise SystemExit(main())
