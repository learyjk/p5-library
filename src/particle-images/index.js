// PLAN OF ATTACK
// -draw image on canvas
// -draw single particle over image
// -map particles to image
// -set image color at particle position
// -stretch to fill screen
// -repulse particles from mouse

const PARTICLE_SIZE = 10;
const RESOLUTION = 10;
const MAX_FORCE = 10;
const MIN_FORCE = 0;
const EFFECT_DISTANCE = 200;

let imgUrl = "./src/particle-images/webflow.png";
let img;
let particles = [];

function preload() {
  img = loadImage(imgUrl);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnParticles();
}

function draw() {
  background(40);
  //image(img, 0, 0, width, height);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
}

function spawnParticles() {
  for (let i = 0; i < width; i += RESOLUTION) {
    for (let j = 0; j < height; j += RESOLUTION) {
      let x = (i / width) * img.width;
      let y = (j / height) * img.height;
      const color = img.get(x, y);
      particles.push(
        new Particle(i + PARTICLE_SIZE / 2, j + PARTICLE_SIZE / 2, color)
      );
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
    // get vectors for mouse, target, and current position
    let mouseVector = createVector(mouseX, mouseY);
    let currentVector = createVector(this.x, this.y);
    let targetVector = createVector(this.targetX, this.targetY);

    // calculate vector from mouse to particle and its magnitude (distance)
    let fromMouseToParticle = p5.Vector.sub(currentVector, mouseVector);
    let distanceToMouse = fromMouseToParticle.mag();

    // calculate vector from particle to target and its magnitude
    let fromParticleToTarget = p5.Vector.sub(targetVector, currentVector);
    let distanceToTarget = fromParticleToTarget.mag();

    let totalForce = createVector(0, 0);

    // if mouse is within 100 pixels, calculate a repulsive force
    if (distanceToMouse < EFFECT_DISTANCE) {
      let respulsionForce = map(
        distanceToMouse,
        0,
        EFFECT_DISTANCE,
        MAX_FORCE,
        MIN_FORCE
      );
      fromMouseToParticle.setMag(respulsionForce);
      totalForce.add(fromMouseToParticle);
    }

    // if particle is not at tartget, calculate an attractive force
    if (distanceToMouse > 0) {
      let attractionForce = map(
        distanceToTarget,
        0,
        EFFECT_DISTANCE,
        MIN_FORCE,
        MAX_FORCE
      );
      fromParticleToTarget.setMag(attractionForce);
      totalForce.add(fromParticleToTarget);
    }

    // add the forces to the position
    this.x += totalForce.x;
    this.y += totalForce.y;
  }

  draw() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, PARTICLE_SIZE);
  }
}
