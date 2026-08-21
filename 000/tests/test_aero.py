from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

import numpy as np

from orthomagtherm.aero.config import AeroRunConfig
from orthomagtherm.aero.evaluator import DesignEvaluator
from orthomagtherm.aero.geometry import generate_airfoil
from orthomagtherm.aero.optimizer import AeroDesignOptimizer
from orthomagtherm.aero.panel import HessSmithSolver


class AeroTests(unittest.TestCase):
    def make_config(self) -> AeroRunConfig:
        config = AeroRunConfig()
        config.design.panels = 60
        config.optimization.maximum_iterations = 5
        config.optimization.field_points_x = 50
        config.optimization.field_points_y = 40
        config.output.save_plot = False
        config.output.save_iteration_surfaces = False
        return config

    def test_symmetric_airfoil_zero_alpha_has_near_zero_lift(self) -> None:
        config = self.make_config()
        config.design.camber = 0.0
        config.flight.angle_of_attack_degrees = 0.0
        solution = HessSmithSolver(generate_airfoil(config.design), config.flight).solve()
        self.assertLess(abs(solution.lift_coefficient), 0.03)
        self.assertTrue(np.isfinite(solution.pressure_coefficient).all())

    def test_positive_angle_produces_positive_lift(self) -> None:
        config = self.make_config()
        config.design.camber = 0.0
        config.flight.angle_of_attack_degrees = 4.0
        solution = HessSmithSolver(generate_airfoil(config.design), config.flight).solve()
        self.assertGreater(solution.lift_coefficient, 0.2)

    def test_feedback_loop_reduces_objective(self) -> None:
        config = self.make_config()
        initial = DesignEvaluator(config).evaluate(config.design)
        with tempfile.TemporaryDirectory() as directory:
            result = AeroDesignOptimizer(config).optimize(Path(directory))
            self.assertLessEqual(result.final.objective, initial.objective + 1.0e-10)
            self.assertTrue((Path(directory) / "design_report.json").exists())
            self.assertTrue((Path(directory) / "final_aero_field.npz").exists())


if __name__ == "__main__":
    unittest.main()
