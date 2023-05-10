function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(0);
  strokeWeight(5);
  noLoop();
}

function draw() {
  background(255);
  drawRect(0, 0, width, height, 3);
}

let toggle = true;

function drawRect(x, y, w, h, depth) {
  if (depth > 0) {
    // Recursive Case
    if (toggle) {
      // Vertical line = left and right rects
      let sizePercentage = random([0.4, 0.8]);
      // left rect
      drawRect(x, y, w * sizePercentage, h, depth - 1);
      // right rect
      drawRect(
        x + w * sizePercentage,
        y,
        w * (1 - sizePercentage),
        h,
        depth - 1
      );
    } else {
      // Horizontal line = top and bottom rects
      let sizePercentage = random([0.4, 0.8]);
      // top rect
      drawRect(x, y, w, h * sizePercentage, depth - 1);
      // bottom rect
      drawRect(
        x,
        y + h * sizePercentage,
        w,
        h * (1 - sizePercentage),
        depth - 1
      );
    }
    toggle = !toggle;
  } else {
    // Base case: depth = 0
    // draw a rectangle with white fill or random color
    fill(255);
    let colors = [
      [230, 0, 0], // red
      [0, 0, 230], // blue
      [230, 230, 0], // yellow
    ];
    if (random(1) < 0.3) {
      fill(random(colors));
    }
    rect(x, y, w, h);
  }
}
