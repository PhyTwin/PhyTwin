from __future__ import annotations

import unittest
import numpy as np

from orthomagtherm.basis import SineGalerkinBasis
from orthomagtherm.config import NumericalConfig
from orthomagtherm.controller import CoupledModalTailController
from orthomagtherm.state import ModalState


class ControllerTests(unittest.TestCase):
    def make_state(self, basis: SineGalerkinBasis) -> ModalState:
        low = np.zeros(basis.shape)
        low[0, 0] = 1.0
        omega, magnetic, temperature = low.copy(), low.copy(), low.copy()
        magnetic[-1, -1] = 0.2
        return ModalState(omega, magnetic, temperature)

    def test_synchronized_strategy_uses_one_strength(self) -> None:
        basis = SineGalerkinBasis(8, 6, 2.0, 1.0, 1.6)
        config = NumericalConfig(modes_x=8, modes_y=6, filter_strategy="synchronized")
        decision = CoupledModalTailController(basis, config).decide(self.make_state(basis))
        self.assertGreater(decision.shared_strength, 0.0)
        self.assertEqual(len(set(decision.strengths)), 1)

    def test_independent_strategy_only_controls_rough_field(self) -> None:
        basis = SineGalerkinBasis(8, 6, 2.0, 1.0, 1.6)
        config = NumericalConfig(modes_x=8, modes_y=6, filter_strategy="independent")
        decision = CoupledModalTailController(basis, config).decide(self.make_state(basis))
        self.assertEqual(decision.strengths[0], 0.0)
        self.assertGreater(decision.strengths[1], 0.0)
        self.assertEqual(decision.strengths[2], 0.0)


if __name__ == "__main__":
    unittest.main()
