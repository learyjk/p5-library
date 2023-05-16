const canvasSize = 200;
const numDots = 10;
let dots = [];

function setup() {
  createCanvas(canvasSize, canvasSize);
  const maxRadius = canvasSize / 2;
  const radiusStep = maxRadius / numDots;

  for (let i = 0; i < numDots; i++) {
    const radius = radiusStep * (i + 1); // Radius increases for each dot
    const speed = TWO_PI / (120 - i * 10); // Speed decreases as radius increases
    dots.push({
      radius: radius,
      angle: 0,
      speed: speed,
    });
  }
}

function draw() {
  background(220);
  translate(canvasSize / 2, canvasSize / 2); // Center the dots

  for (let dot of dots) {
    const x = dot.radius * cos(dot.angle);
    const y = dot.radius * sin(dot.angle);
    ellipse(x, y, 20); // Draw the dot
    dot.angle += dot.speed; // Update the angle for the next frame
  }
}
