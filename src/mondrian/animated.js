let queue = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(0);
  strokeWeight(5);
  noLoop();
  frameRate(2);
  queue.push({ x: 0, y: 0, w: width, h: height, depth: 3 });
}

function draw() {
  background(255);
  if (queue.length > 0) {
    let rect = queue.shift();
    drawRect(rect.x, rect.y, rect.w, rect.h, rect.depth);
  } else {
    noLoop(); // stop drawing when queue is empty
  }
}

function drawRect(x, y, w, h, depth) {
  let toggle = random([true, false]);

  if (depth > 0) {
    let sizePercentage = random([0.4, 0.8]);
    if (toggle) {
      setTimeout(function () {
        queue.push({
          x: x,
          y: y,
          w: w * sizePercentage,
          h: h,
          depth: depth - 1,
        });
        loop();
      }, 1000); // delay in milliseconds

      setTimeout(function () {
        queue.push({
          x: x + w * sizePercentage,
          y: y,
          w: w * (1 - sizePercentage),
          h: h,
          depth: depth - 1,
        });
        loop();
      }, 1000);
    } else {
      setTimeout(function () {
        queue.push({
          x: x,
          y: y,
          w: w,
          h: h * sizePercentage,
          depth: depth - 1,
        });
        loop();
      }, 1000);

      setTimeout(function () {
        queue.push({
          x: x,
          y: y + h * sizePercentage,
          w: w,
          h: h * (1 - sizePercentage),
          depth: depth - 1,
        });
        loop();
      }, 1000);
    }
  } else {
    fill(255);
    let colors = [
      [230, 0, 0],
      [0, 0, 230],
      [230, 230, 0],
    ];
    if (random(1) < 0.3) {
      fill(random(colors));
    }
    rect(x, y, w, h);
  }
}

function mousePressed() {
  loop(); // start drawing when mouse is pressed
  queue.push({ x: 0, y: 0, w: width, h: height, depth: 3 });
}
