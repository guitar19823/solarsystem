import { SolarSystem } from "./simulation/solar-system";
import { CanvasRenderer } from "./rendering/canvas-renderer";

// Инициализация холста
const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 800;
document.body.appendChild(canvas);

const renderer = new CanvasRenderer(canvas);
const system = new SolarSystem(86400); // шаг 1 день

// Анимация
function animate() {
  system.step();
  renderer.clear();
  renderer.renderPlanets(system.getPlanets());
  requestAnimationFrame(animate);
}

animate();
