const SPIN_MULTIPLIER = 45;
const MIN_PARTICLE_COUNT = 200;
const MAX_PARTICLE_COUNT = 700;
const MIN_PARTICLE_SIZE = 12;
const MAX_PARTICLE_SIZE = 50;
const MIN_FORCE = 0.4;
const MAX_FORCE = 0.6;
const REPULSION_RADIUS = 100;
const REPULSION_STRENGTH = 1;
const IMG_RESIZED_WIDTH = 400;
const IMG_SCAN_STEPS = 2;

const DrawTypes = {
  Rect: 0,
  Ellipse: 1,
  Triangle: 2,
};

var imgName = "webflow.png";
var particles = [];
var indices = [];
var imgIndex = 0;
var drawType = 1;
var particleCount = 600;
var maxSize = 0;
var img;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.canvas.oncontextmenu = () => false;
  loadImg(`src/exploding-images/${imgName}`);
}

function draw() {
  background(0);

  fill(255);
  noStroke();

  if (img == null) {
    return;
  }

  push();
  translate(width / 2 - img.width / 2, height / 2 - img.height / 2);

  fill(255);
  noStroke();

  rectMode(CENTER);

  particles.forEach((particle) => {
    particle.move();

    push();
    translate(particle.pos.x, particle.pos.y);

    let spin = particle.vel.mag() * SPIN_MULTIPLIER;
    rotate(radians(particle.mapped_angle + spin));

    fill(particle.color);

    switch (drawType) {
      case DrawTypes.Ellipse:
        ellipse(0, 0, particle.size, particle.size);
        break;
      case DrawTypes.Rect:
        rect(0, 0, particle.size, particle.size);
        break;
      case DrawTypes.Triangle:
        triangle(
          particle.size * -0.5,
          particle.size * -0.5,
          0,
          particle.size,
          particle.size * 0.5,
          particle.size * -0.5
        );
    }

    pop();
  });

  rectMode(CORNER);

  //   if (mouseIsPressed && mouseButton == RIGHT) {
  //     image(img, 0, 0);
  //   }

  pop();
}

class Particle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.pos = createVector(img.width / 2, img.height / 2);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.target = createVector(x, y);
    this.size = size;
    this.mapped_angle =
      map(x, 0, img.width, -180, 180) + map(y, 0, img.height, -180, 180);
    this.color = color;
    this.maxForce = random(MIN_FORCE, MAX_FORCE);
  }

  goToTarget() {
    let steer = createVector(this.target.x, this.target.y);

    let distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
    if (distance > 0.5) {
      let distThreshold = 20;
      steer.sub(this.pos);
      steer.normalize();
      steer.mult(
        map(min(distance, distThreshold), 0, distThreshold, 0, this.maxForce)
      );
      this.acc.add(steer);
    }
  }

  avoidMouse() {
    let mousePos = createVector(
      mouseX - width / 2 + img.width / 2,
      mouseY - height / 2 + img.height / 2
    );
    let distance = dist(this.pos.x, this.pos.y, mousePos.x, mousePos.y);
    if (distance < REPULSION_RADIUS) {
      let steer = createVector(this.pos.x, this.pos.y);
      steer.sub(mousePos);
      steer.normalize();
      steer.mult(map(distance, 0, REPULSION_RADIUS, REPULSION_STRENGTH, 0));
      this.acc.add(steer);
    }
  }

  move() {
    this.avoidMouse();
    this.goToTarget();

    this.vel.mult(0.95);

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
}

function loadNextImg() {
  imgIndex++;
  if (imgIndex >= imgNames.length) {
    imgIndex = 0;
  }
  loadImg(imgNames[imgIndex]);
}

function loadImg(imgName) {
  loadImage(imgName, (newImg) => {
    img = newImg;
    img.loadPixels();
    img.resize(IMG_RESIZED_WIDTH, 0);
    spawnParticles();
  });
}

// Collects valid positions where a particle can spawn onto.
function setupImg() {
  indices = [];

  for (let x = 0; x < img.width; x += IMG_SCAN_STEPS * 4) {
    for (let y = 0; y < img.height; y += IMG_SCAN_STEPS * 4) {
      let index = (x + y * img.width) * 4;

      let a = img.pixels[index + 3];
      if (a > 10) {
        indices.push(index);
      }
    }
  }
}

function spawnParticles() {
  particles = [];

  setupImg();

  maxSize = map(
    particleCount,
    MIN_PARTICLE_COUNT,
    MAX_PARTICLE_COUNT,
    MAX_PARTICLE_SIZE,
    MIN_PARTICLE_SIZE
  );

  if (indices.length == 0) {
    return;
  }

  for (let i = 0; i < particleCount; i++) {
    let max_attempts = 20;
    let attempts = 0;
    let newParticle = null;

    // Pick a random position from the active image and attempt to spawn a valid particle.
    while (newParticle == null) {
      let index = indices[int(random(indices.length))];

      let x = (index / 4) % img.width;
      let y = index / 4 / img.width;

      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let a = img.pixels[index + 3];

      if (particles.length > 0) {
        let smallestSize = null;

        for (let i = 0; i < particles.length; i++) {
          let otherParticle = particles[i];
          let d = dist(x, y, otherParticle.target.x, otherParticle.target.y);
          let newSize = (d - otherParticle.size / 2) * 2;

          if (smallestSize == null || newSize < smallestSize) {
            smallestSize = newSize;
          }
        }

        if (smallestSize > 0) {
          newParticle = new Particle(
            x,
            y,
            min(smallestSize, maxSize) * 0.75,
            color(r, g, b, a)
          );
        }
      } else {
        newParticle = new Particle(x, y, maxSize, color(r, g, b, a));
      }

      attempts += 1;
      if (attempts > max_attempts) {
        break;
      }
    }

    if (newParticle != null) {
      particles.push(newParticle);
    }
  }
}

function nextDrawType() {
  drawType++;
  if (drawType >= Object.keys(DrawTypes).length) {
    drawType = 0;
  }
}
