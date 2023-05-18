function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  translate(windowWidth / 2, windowHeight / 2);
  background(0);

  for (let i = 0; i < 3; i++) {
    rotate(60);
    drawShape();
  }
}

function drawShape() {
  for (let angle = 0; angle < 360; angle += 10) {
    const x = cos(angle + mouseX / 5) * (windowWidth / 10 + mouseX / 5);
    const y = sin(angle + mouseY / 10) * (windowHeight / 10 + mouseY / 10);
    fill(angle);
    noStroke();
    ellipse(x, y, 50);
  }
}
