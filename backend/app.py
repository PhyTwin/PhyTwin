"""PhyTwin FastAPI 计算接口；核心数值逻辑位于 solver.py。"""
from __future__ import annotations

import math
import time
from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, model_validator

try:
    from .solver import solve_beam, solve_flow, solve_thermal
except ImportError:  # 支持在 backend 目录直接运行 uvicorn app:app
    from solver import solve_beam, solve_flow, solve_thermal

app = FastAPI(title="PhyTwin CAE API", version="2.0.0", docs_url="/docs")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://phytwin.com", "https://www.phytwin.com"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class SimulationRequest(BaseModel):
    model: Literal["beam", "thermal", "flow"]
    params: dict[str, float]

    @model_validator(mode="after")
    def validate_parameters(self) -> "SimulationRequest":
        required = {
            "beam": ("length", "width", "height", "load", "young", "poisson"),
            "thermal": ("width", "height", "hot", "cold", "conductivity", "source"),
            "flow": ("speed", "density", "radius", "viscosity", "angle"),
        }[self.model]
        missing = [key for key in required if key not in self.params]
        if missing:
            raise ValueError(f"缺少参数: {', '.join(missing)}")
        if any(not math.isfinite(float(self.params[key])) for key in required):
            raise ValueError("参数必须为有限数值")
        return self


@app.get("/health")
def health() -> dict:
    return {"ok": True, "service": "phytwin-cae-api", "version": "2.0.0"}


@app.post("/api/v1/simulate")
def simulate(request: SimulationRequest) -> dict:
    started = time.perf_counter()
    try:
        result = {"beam": solve_beam, "thermal": solve_thermal, "flow": solve_flow}[request.model](request.params)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
    return {"ok": True, "model": request.model, "elapsed_ms": round((time.perf_counter() - started) * 1000, 3), "result": result}
