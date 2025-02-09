const frame = document.getElementById("canvas");

frame.height = window.innerHeight;
const ctx = frame.getContext("2d");
ctx.fillStyle = "black"; // Color de relleno para las figuras
ctx.strokeStyle = "red"; // Color para el contorno
ctx.lineWidth = 5; // Grosor de la línea

const R = 8;
const r = 2;

let angle = 0; // Ángulo de rotación

function rotatePoint(x, y, z, angle) {
  // Rotación sobre el eje Y (por ejemplo)
  const newX = x * Math.cos(angle) - z * Math.sin(angle);
  const newZ = x * Math.sin(angle) + z * Math.cos(angle);
  return [newX, y, newZ]; // Devuelve las coordenadas rotadas
}

function donut(u, v, R, r) {
  const x = (R + r * Math.cos(v)) * Math.cos(u);
  const y = (R + r * Math.cos(v)) * Math.sin(u);
  const z = r * Math.sin(v);
  return [x, y, z];
}

function drawTorus(frame, R, r) {
  const scale = 10;
  const centerX = frame.width / 2;
  const centerY = frame.height / 2;
  const chars = " .:-=+*%@#";
  ctx.clearRect(0, 0, frame.width, frame.height);

  for (let u = 0; u < 2 * Math.PI; u += 0.05) {
    for (let v = 0; v < 2 * Math.PI; v += 0.05) {
      const [x, y, z] = donut(u, v, R, r);

      const [rotX, rotY, rotZ] = rotatePoint(x, y, z, angle);

      const x2D = Math.floor(centerX + rotX * scale);
      const y2D = Math.floor(centerY + rotY * scale);

      const intensity = Math.floor((1 - rotZ / r) * (chars.length - 1));

      const char = chars[intensity];
      ctx.font = "5px monospace";

      ctx.fillText(char, x2D, y2D);
    }
  }
  angle += 0.01; // Actualiza el ángulo de rotación
  requestAnimationFrame(() => drawTorus(frame, R, r));
}

drawTorus(frame, R, r);
