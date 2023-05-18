// draw image on canvas
// draw single particle over image
// map particles to image
// set image color at particle position
// stretch to fill screen
// repulse particles from mouse

const imgURL = `./src/particle-images/webflow.png`;
const PARTICLE_SIZE = 10;
let img;
let particles = [];

function preload() {
  img = loadImage(imgURL);
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  spawnParticles();
}

function draw() {
  //image(img, 0, 0, 154, 154);
  background(40);

  particles.forEach((p) => {
    p.update();
    p.draw();
  });
}

function spawnParticles() {
  for (let i = 0; i < width; i += 10) {
    for (let j = 0; j < height; j += 10) {
      let x = (i / width) * img.width;
      let y = (j / height) * img.height;

      let color = img.get(x, y);
      if (color[3] === 0) continue; // transparent pixel
      let p = new Particle(i, j, color);
      particles.push(p);
    }
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;
    this.color = color;
  }

  update() {
    // get vectors for mouse, target, and current position
    let mousePosition = createVector(mouseX, mouseY);
    let targetPosition = createVector(this.targetX, this.targetY);
    let currentPosition = createVector(this.x, this.y);

    // calculate vector from mouse to particle and its magnitude (distance)
    let fromMouseToParticle = p5.Vector.sub(currentPosition, mousePosition);
    let distanceToMouse = fromMouseToParticle.mag();

    // calculate vector from particle to target and its magnitude
    let fromParticleToTarget = p5.Vector.sub(targetPosition, currentPosition);
    let distanceToTarget = fromParticleToTarget.mag();

    let totalForce = createVector(0, 0);

    // if mouse is within 100 pixels, calculate a repulsive force
    if (distanceToMouse < 100) {
      let repulsionForceValue = map(distanceToMouse, 0, 100, 10, 0);
      fromMouseToParticle.setMag(repulsionForceValue);
      totalForce.add(fromMouseToParticle);
    }

    // if particle is not at tartget, calculate an attractive force
    if (distanceToMouse > 0) {
      let attractionForceValue = map(distanceToTarget, 0, 100, 0, 10);
      fromParticleToTarget.setMag(attractionForceValue);
      totalForce.add(fromParticleToTarget);
    }

    // add the forces to the position
    this.x += totalForce.x;
    this.y += totalForce.y;
  }

  draw() {
    fill(this.color);
    noStroke();
    ellipse(
      this.x + PARTICLE_SIZE / 2,
      this.y + PARTICLE_SIZE / 2,
      PARTICLE_SIZE
    );
  }
}
