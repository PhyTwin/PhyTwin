"""无需启动 HTTP 服务即可执行的计算内核冒烟测试。"""
from solver import solve_beam, solve_flow, solve_thermal


def main() -> None:
    beam = solve_beam({"length": 1.2, "width": .05, "height": .1, "load": 8000, "young": 210, "poisson": .3})
    thermal = solve_thermal({"width": .4, "height": .24, "hot": 393, "cold": 293, "conductivity": 45, "source": 15000})
    flow = solve_flow({"speed": 12, "density": 1.225, "radius": .05, "viscosity": 1.81e-5, "angle": 0})
    assert 100 < beam["metrics"]["max_stress_mpa"] < 130
    assert thermal["metrics"]["max_temperature_k"] >= 393
    assert 70_000 < flow["metrics"]["reynolds_number"] < 100_000
    print("PhyTwin solver smoke tests passed")


if __name__ == "__main__":
    main()
