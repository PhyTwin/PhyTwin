from __future__ import annotations

import unittest
import numpy as np

from orthomagtherm.basis import SineGalerkinBasis


class BasisTests(unittest.TestCase):
    def test_projection_recovers_coefficients(self) -> None:
        basis = SineGalerkinBasis(8, 6, 2.0, 1.0, 1.7)
        rng = np.random.default_rng(7)
        coefficients = rng.normal(size=basis.shape)
        recovered = basis.project(basis.evaluate(coefficients))
        np.testing.assert_allclose(recovered, coefficients, atol=2.0e-14, rtol=2.0e-14)

    def test_jacobian_of_field_with_itself_is_zero(self) -> None:
        basis = SineGalerkinBasis(7, 5, 1.5, 1.0, 1.8)
        rng = np.random.default_rng(8)
        coefficients = rng.normal(size=basis.shape)
        np.testing.assert_allclose(basis.jacobian(coefficients, coefficients), 0.0, atol=1.0e-13)


if __name__ == "__main__":
    unittest.main()
