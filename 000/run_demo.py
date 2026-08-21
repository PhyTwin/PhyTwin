"""无需安装包的演示入口。"""

from __future__ import annotations

from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT / "src"))

from orthomagtherm.cli import main  # noqa: E402


if __name__ == "__main__":
    config = sys.argv[1] if len(sys.argv) > 1 else str(ROOT / "examples" / "quick_demo.json")
    raise SystemExit(main(["run", config]))
