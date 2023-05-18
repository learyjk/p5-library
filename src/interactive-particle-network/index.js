const numParticles = 20;
const particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(40);

  particles.forEach((particle, index) => {
    particle.update();
    particle.drawParticle();
    particle.drawLines(particles.slice(index));
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.acceleration = createVector();
    this.size = 5;
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    let direction = mouse.sub(this.position);
    let distance = direction.mag();

    // Only apply the force if the particle is within a certain radius of the mouse
    if (distance < 100) {
      direction.normalize();
      direction.mult(0.5);
      this.acceleration = direction;
      this.velocity.add(this.acceleration);
      this.velocity.limit(4); // Limit the velocity so the particles don't go too fast
    }

    this.position.add(this.velocity);
    this.detectEdges();
  }

  detectEdges() {
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }
    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }
  }

  drawLines(particles) {
    particles.forEach((particle) => {
      let distance = dist(
        this.position.x,
        this.position.y,
        particle.position.x,
        particle.position.y
      );
      if (distance < 100) {
        let alpha = map(distance, 0, 100, 255, 0); // Map the distance to an alpha value
        stroke(100, 100, 100, alpha); // Set the stroke color with the calculated alpha
        line(
          this.position.x,
          this.position.y,
          particle.position.x,
          particle.position.y
        );
      }
    });
  }

  drawParticle() {
    noStroke();
    fill(230);
    circle(this.position.x, this.position.y, this.size);
  }
}
