import { PlatformAdapter } from "./types/platform-adapter";
import { CanvasRenderer } from "./rendering/canvas-renderer";
import { SolarSystem } from "./simulation/solar-system";
import { SIMULATION_CONFIG } from "./config/simulation-config";
import { BrowserAdapter } from "./adapters/browser-adapter";

export function runSimulation(platformAdapter: PlatformAdapter) {
  const canvas = platformAdapter.createCanvas();
  const renderer = new CanvasRenderer(canvas, platformAdapter);

  platformAdapter.appendToDom(canvas);

  const system = new SolarSystem(SIMULATION_CONFIG.MAX_DT);

  let lastTimestamp = 0;

  function animate(currentTimestamp: number) {
    const deltaTime = currentTimestamp - lastTimestamp;
    lastTimestamp = currentTimestamp;
    const deltaSeconds = deltaTime / 1000;

    const simulationTimeStep = Math.min(
      deltaSeconds * SIMULATION_CONFIG.SIMULATION_DT,
      SIMULATION_CONFIG.MAX_DT
    );

    system.step(simulationTimeStep);
    renderer.clear();
    renderer.renderPlanets(system.getPlanets());

    platformAdapter.requestAnimationFrame(animate);
  }

  platformAdapter.requestAnimationFrame(animate);
}

const platformAdapter = new BrowserAdapter();

runSimulation(platformAdapter);
