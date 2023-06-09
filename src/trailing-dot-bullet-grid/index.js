const dotSize = 5;
const spacing = dotSize * 4;
const areaOfEffect = 50;

let dots = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < width; i += spacing) {
    for (let j = 0; j < height; j += spacing) {
      dots.push(new Dot(i + spacing / 2, j + spacing / 2, dotSize));
    }
  }
}

function draw() {
  background(0);
  dots.forEach((dot) => {
    dot.update();
    dot.render();
  });
}

let mouseIsMoving = false;

function mouseMoved() {
  mouseIsMoving = true;
  setTimeout(() => (mouseIsMoving = false), 100);
}

class Dot {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.transparency = 40;
  }

  update() {
    let distance = dist(mouseX, mouseY, this.x, this.y);
    if (mouseIsMoving && distance < areaOfEffect) {
      this.transparency = 255;
    } else {
      this.transparency = max(40, this.transparency - 10);
    }
  }

  render() {
    fill(255, this.transparency);
    ellipse(this.x, this.y, this.size);
  }
}
