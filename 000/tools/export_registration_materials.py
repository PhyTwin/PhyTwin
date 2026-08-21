"""导出带行号的自主源程序清单和 SHA-256 清单，辅助整理登记材料。"""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path


def source_files(root: Path) -> list[Path]:
    candidates = [root / "run_demo.py"]
    candidates.extend(sorted((root / "src" / "orthomagtherm").rglob("*.py")))
    return [path for path in candidates if path.is_file()]


def export(root: Path, output: Path) -> None:
    output.mkdir(parents=True, exist_ok=True)
    files = source_files(root)
    manifest: dict[str, object] = {
        "software": "正交模态热磁流体多物理场数值计算软件 V1.0",
        "files": [],
        "total_nonblank_lines": 0,
    }
    listing: list[str] = []
    total = 0
    for path in files:
        relative = path.relative_to(root).as_posix()
        raw = path.read_bytes()
        text = raw.decode("utf-8")
        lines = text.splitlines()
        nonblank = sum(bool(line.strip()) for line in lines)
        total += nonblank
        manifest["files"].append(
            {
                "path": relative,
                "sha256": hashlib.sha256(raw).hexdigest(),
                "physical_lines": len(lines),
                "nonblank_lines": nonblank,
            }
        )
        listing.append("=" * 88)
        listing.append(f"文件：{relative}")
        listing.append("=" * 88)
        listing.extend(f"{number:05d}  {line}" for number, line in enumerate(lines, 1))
        listing.append("")
    manifest["total_nonblank_lines"] = total
    (output / "自主源程序清单.txt").write_text("\n".join(listing), encoding="utf-8-sig")
    (output / "源程序校验清单.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"已导出 {len(files)} 个文件、{total} 行非空源程序到 {output.resolve()}")


def main() -> None:
    parser = argparse.ArgumentParser(description="整理 OrthoMagTherm 自主源程序材料")
    parser.add_argument(
        "--output", type=Path, default=Path("registration_export"), help="材料输出目录"
    )
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    export(root, args.output)


if __name__ == "__main__":
    main()
