"""OrthoMagTherm 正交 Galerkin 热磁流体求解器。"""

from .config import RunConfig
from .solver import OrthoMagThermSolver

__all__ = ["RunConfig", "OrthoMagThermSolver"]
__version__ = "1.0.0"
