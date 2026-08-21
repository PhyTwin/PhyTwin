"""求解状态的数据结构。"""

from __future__ import annotations

from dataclasses import dataclass
import numpy as np
from numpy.typing import NDArray

Array = NDArray[np.float64]


@dataclass(slots=True)
class ModalState:
    vorticity: Array
    magnetic_potential: Array
    temperature: Array
    time: float = 0.0
    step: int = 0

    def copy(self) -> "ModalState":
        return ModalState(
            self.vorticity.copy(),
            self.magnetic_potential.copy(),
            self.temperature.copy(),
            self.time,
            self.step,
        )

    def arrays(self) -> tuple[Array, Array, Array]:
        return self.vorticity, self.magnetic_potential, self.temperature

    def finite(self) -> bool:
        return all(np.isfinite(array).all() for array in self.arrays())

    def squared_norm(self) -> float:
        return float(sum(np.sum(array**2) for array in self.arrays()))


@dataclass(slots=True)
class NonlinearTerms:
    vorticity: Array
    magnetic_potential: Array
    temperature: Array

    def arrays(self) -> tuple[Array, Array, Array]:
        return self.vorticity, self.magnetic_potential, self.temperature
