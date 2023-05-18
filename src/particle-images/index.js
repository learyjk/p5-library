const MAX_FORCE = 10;
const MIN_FORCE = 0;
const PARTICLE_SIZE = 10;

let showGhosts = false;

let particles = [];
let resolution = 20; // draw every 4th pixel to prevent lag
let img;

function preload() {
  img = loadImage("./src/particle-images/webflow.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnParticles();
}

function draw() {
  background(40);
  noStroke();

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  //image(img, 0, 0, width, height);
}

function spawnParticles() {
  // i and j are screen coordinates
  for (let i = 0; i < width; i += resolution) {
    for (let j = 0; j < height; j += resolution) {
      let x = (i / width) * img.width;
      let y = (j / height) * img.height;
      let color = img.get(x, y); // get color from image [r, g, b, a]
      // skip transparent pixels (alpha = 0
      if (color[3] !== 0) {
        particles.push(new Particle(i, j, color));
      }
    }
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;

    this.targetX = x;
    this.targetY = y;
  }

  update() {
    // distance and angle to cursor
    let distanceToMouse = dist(this.x, this.y, mouseX, mouseY);
    let angleToMouse = atan2(this.y - mouseY, this.x - mouseX);

    // target distance and angle
    let targetDistance = dist(this.x, this.y, this.targetX, this.targetY);
    let targetAngle = atan2(this.targetY - this.y, this.targetX - this.x);

    //attractive force
    let mouseForce = 0;
    if (distanceToMouse < 100) {
      mouseForce = map(distanceToMouse, 0, 100, MAX_FORCE, MIN_FORCE);
    }
    // repulsive force
    let homeForce = map(targetDistance, 0, 100, MIN_FORCE, MAX_FORCE); // repulsive force

    // calculate velocity based on forces
    let velocityX =
      cos(angleToMouse) * mouseForce + cos(targetAngle) * homeForce;
    let velocityY =
      sin(angleToMouse) * mouseForce + sin(targetAngle) * homeForce;

    this.x += velocityX;
    this.y += velocityY;
  }

  draw() {
    const x1 = this.x + PARTICLE_SIZE / 2;
    const y1 = this.y + PARTICLE_SIZE / 2;
    const x2 = this.targetX + PARTICLE_SIZE / 2;
    const y2 = this.targetY + PARTICLE_SIZE / 2;

    if (showGhosts) {
      fill(255, 20);
      ellipse(x2, y2, PARTICLE_SIZE);
      strokeWeight(1);
      stroke(255, 20);
      line(x1, y1, x2, y2);
    }

    fill(this.color);
    ellipse(x1, y1, PARTICLE_SIZE);
  }
}
