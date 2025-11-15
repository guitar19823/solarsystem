import { PlatformAdapter } from "./types/platform-adapter";
import { CanvasRenderer } from "./rendering/canvas-renderer";
import { SolarSystem } from "./simulation/solar-system";
import { SIMULATION_CONFIG } from "./config/simulation-config";
import { BrowserAdapter } from "./adapters/browser-adapter";
import { ConfigAPI } from "./config/config-api";

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

function initControls() {
  const speedSlider = document.getElementById(
    "speed-slider"
  ) as HTMLInputElement;
  const scaleSlider = document.getElementById(
    "scale-slider"
  ) as HTMLInputElement;
  const planetScaleSlider = document.getElementById(
    "planet-scale-slider"
  ) as HTMLInputElement;

  const speedValue = document.getElementById("speed-value");
  const scaleValue = document.getElementById("scale-value");
  const planetScaleValue = document.getElementById("planet-scale-value");

  speedSlider.value = SIMULATION_CONFIG.SIMULATION_DT.toString();
  scaleSlider.value = SIMULATION_CONFIG.AU_IN_PX.toString();
  planetScaleSlider.value = SIMULATION_CONFIG.PLANET_RADIUS_SCALE.toString();

  if (speedValue) {
    speedValue.textContent = SIMULATION_CONFIG.SIMULATION_DT.toString();

    speedSlider.addEventListener("input", () => {
      const value = parseInt(speedSlider.value, 10);
      ConfigAPI.setSimulationSpeed(value);
      speedValue.textContent = value.toString();
    });
  }

  if (scaleValue) {
    scaleValue.textContent = SIMULATION_CONFIG.AU_IN_PX.toString();

    scaleSlider.addEventListener("input", () => {
      const value = parseInt(scaleSlider.value, 10);
      ConfigAPI.setScale(value);
      scaleValue.textContent = value.toString();
    });
  }

  if (planetScaleValue) {
    planetScaleValue.textContent =
      SIMULATION_CONFIG.PLANET_RADIUS_SCALE.toFixed(1);

    planetScaleSlider.addEventListener("input", () => {
      const value = parseFloat(planetScaleSlider.value);
      ConfigAPI.setPlanetScale(value);
      planetScaleValue.textContent = value.toFixed(1);
    });
  }
}

const platformAdapter = new BrowserAdapter();

runSimulation(platformAdapter);
initControls();
