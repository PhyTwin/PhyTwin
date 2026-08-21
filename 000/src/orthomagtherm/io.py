"""计算结果的可追溯输出。"""

from __future__ import annotations

import csv
import json
from pathlib import Path
from typing import TYPE_CHECKING, Any

import numpy as np

from .config import RunConfig

if TYPE_CHECKING:
    from .solver import OrthoMagThermSolver


class OutputManager:
    def __init__(self, directory: Path, config: RunConfig) -> None:
        self.directory = directory
        self.snapshots = directory / "snapshots"
        self.config = config
        self.csv_path = directory / "diagnostics.csv"
        self._fieldnames: list[str] | None = None

    def prepare(self) -> None:
        self.directory.mkdir(parents=True, exist_ok=True)
        if self.config.output.save_snapshots:
            self.snapshots.mkdir(parents=True, exist_ok=True)
        self.config.save(self.directory / "resolved_config.json")
        metadata = {
            "software": "OrthoMagTherm",
            "version": "1.0.0",
            "method": "oversampled orthogonal sine Galerkin + adaptive CNAB2",
            "run_name": self.config.name,
        }
        (self.directory / "metadata.json").write_text(
            json.dumps(metadata, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        if self.csv_path.exists():
            self.csv_path.unlink()

    def record(self, solver: "OrthoMagThermSolver", force_snapshot: bool = False) -> dict[str, Any]:
        row = solver.diagnostics()
        if self._fieldnames is None:
            self._fieldnames = list(row.keys())
        write_header = not self.csv_path.exists()
        with self.csv_path.open("a", newline="", encoding="utf-8-sig") as handle:
            writer = csv.DictWriter(handle, fieldnames=self._fieldnames)
            if write_header:
                writer.writeheader()
            writer.writerow(row)
        if self.config.output.save_snapshots and force_snapshot:
            self._save_state(self.snapshots / f"state_{solver.state.step:07d}.npz", solver)
        return row

    def finalize(self, solver: "OrthoMagThermSolver") -> None:
        self._save_state(self.directory / "final_state.npz", solver, include_fields=True)
        if self.config.output.save_plots:
            from .visualize import save_summary_plot

            save_summary_plot(solver, self.directory / "final_fields.png")

    @staticmethod
    def _save_state(
        path: Path, solver: "OrthoMagThermSolver", include_fields: bool = False
    ) -> None:
        state = solver.state
        payload: dict[str, Any] = {
            "time": np.asarray(state.time),
            "step": np.asarray(state.step),
            "vorticity_coefficients": state.vorticity,
            "magnetic_potential_coefficients": state.magnetic_potential,
            "temperature_coefficients": state.temperature,
        }
        if include_fields:
            payload.update(solver.fields())
        np.savez_compressed(path, **payload)
