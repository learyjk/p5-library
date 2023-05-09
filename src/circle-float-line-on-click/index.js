const NUM_CIRCLES = 16;
const FLOAT_SPEED = 2;
const TRANSITION_SPEED = 0.05; // Adjust this value to change the transition speed

// Declare a global array variable to store circle objects
let circles = [];
let float = true;
let circleSize;

function setup() {
  // Set up the canvas size
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Create and initialize circle objects with position and speed
  for (let i = 0; i < NUM_CIRCLES; i++) {
    circleSize = width / 25;
    let circle = {
      x: random(circleSize / 2, width - circleSize / 2),
      y: random(circleSize / 2, height - circleSize / 2),
      speedX: random(-FLOAT_SPEED, FLOAT_SPEED),
      speedY: random(-FLOAT_SPEED, FLOAT_SPEED),
      targetX: null,
      targetY: null,
    };
    circles.push(circle);
  }
}

function draw() {
  // Clear the background each frame
  background(30);

  // Update and draw each circle in the array
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    if (float) {
      // Update the circle's position based on its speed
      circle.x += circle.speedX;
      circle.y += circle.speedY;

      // Check for collisions with the edges and reverse speed if necessary
      if (circle.x < 0 + circleSize / 2 || circle.x > width - circleSize / 2) {
        circle.speedX = -circle.speedX;
      }
      if (circle.y < 0 + circleSize / 2 || circle.y > height - circleSize / 2) {
        circle.speedY = -circle.speedY;
      }
    } else {
      let spacing = width / NUM_CIRCLES;
      // Set target positions for the lined-up state
      circle.targetX = i * spacing + circleSize / 1.5;
      circle.targetY = height / 2;

      // Animate the transition to the target positions using lerp
      circle.x = lerp(circle.x, circle.targetX, TRANSITION_SPEED);
      circle.y = lerp(circle.y, circle.targetY, TRANSITION_SPEED);
    }

    // Draw the circle at the updated position
    ellipse(circle.x, circle.y, circleSize, circleSize);
  }
}

function mouseClicked() {
  float = !float;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  circleSize = width / 25;
}
