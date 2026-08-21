"""可选的 Matplotlib 结果绘图。"""

from __future__ import annotations

from pathlib import Path
from typing import TYPE_CHECKING

import numpy as np

if TYPE_CHECKING:
    from .solver import OrthoMagThermSolver


def save_summary_plot(solver: "OrthoMagThermSolver", path: str | Path) -> bool:
    try:
        import matplotlib.pyplot as plt
    except ImportError:
        return False
    fields = solver.fields()
    x, y = fields["x"], fields["y"]
    magnetic_magnitude = np.sqrt(fields["magnetic_x"] ** 2 + fields["magnetic_y"] ** 2)
    panels = (
        (fields["vorticity"], "Vorticity", "RdBu_r"),
        (magnetic_magnitude, "Magnetic magnitude", "viridis"),
        (fields["temperature"], "Total temperature", "inferno"),
    )
    fig, axes = plt.subplots(1, 3, figsize=(14, 4.2), constrained_layout=True)
    for axis, (values, title, color_map) in zip(axes, panels):
        image = axis.pcolormesh(x, y, values.T, shading="auto", cmap=color_map)
        axis.set_title(title)
        axis.set_xlabel("x")
        axis.set_ylabel("y")
        axis.set_aspect("equal")
        fig.colorbar(image, ax=axis, shrink=0.82)
    fig.suptitle(f"OrthoMagTherm  t={solver.state.time:.4f}, step={solver.state.step}")
    fig.savefig(path, dpi=180)
    plt.close(fig)
    return True
