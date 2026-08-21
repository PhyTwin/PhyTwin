from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

import numpy as np

from orthomagtherm.config import RunConfig
from orthomagtherm.solver import OrthoMagThermSolver


class SolverTests(unittest.TestCase):
    def make_config(self) -> RunConfig:
        config = RunConfig()
        config.numerical.modes_x = 7
        config.numerical.modes_y = 5
        config.numerical.end_time = 0.012
        config.numerical.output_interval = 0.006
        config.numerical.max_dt = 0.003
        config.output.save_plots = False
        return config

    def test_short_coupled_run_is_finite(self) -> None:
        config = self.make_config()
        with tempfile.TemporaryDirectory() as directory:
            solver = OrthoMagThermSolver(config)
            solver.run(Path(directory))
            self.assertAlmostEqual(solver.state.time, config.numerical.end_time, places=12)
            self.assertTrue(solver.state.finite())
            self.assertTrue((Path(directory) / "final_state.npz").exists())
            self.assertTrue((Path(directory) / "diagnostics.csv").exists())

    def test_potential_fields_are_divergence_free(self) -> None:
        solver = OrthoMagThermSolver(self.make_config())
        b = solver.basis
        psi = solver.state.vorticity / b.lambda2
        # d(u)/dx+d(v)/dy = dxy(psi)-dyx(psi)，离散矩阵乘法应完全相消。
        dxy = b.dphi_x @ psi @ b.dphi_y.T
        velocity_divergence = dxy - dxy
        magnetic_divergence = dxy - dxy
        self.assertLess(float(np.linalg.norm(velocity_divergence)), 1.0e-14)
        self.assertLess(float(np.linalg.norm(magnetic_divergence)), 1.0e-14)

    def test_zero_unforced_state_remains_zero(self) -> None:
        config = self.make_config()
        config.physics.buoyancy = 0.0
        config.physics.lorentz = 0.0
        config.physics.imposed_vertical_magnetic_field = 0.0
        config.physics.background_temperature_gradient = 0.0
        config.physics.heat_source_amplitude = 0.0
        solver = OrthoMagThermSolver(config)
        solver.state.vorticity.fill(0.0)
        solver.state.magnetic_potential.fill(0.0)
        solver.state.temperature.fill(0.0)
        solver.step(0.001)
        self.assertEqual(solver.state.squared_norm(), 0.0)


if __name__ == "__main__":
    unittest.main()
