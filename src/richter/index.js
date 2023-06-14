let cols = 16; // number of columns
let rows = 16; // number of rows
let spacing = 10; // spacing between rectangles

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  noLoop(); // only call draw() once
  noStroke();
}

function draw() {
  background(255); // Set the background to white
  let cellWidth = (width - (cols + 1) * spacing) / cols;
  let cellHeight = cellWidth / 2;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = spacing + i * (cellWidth + spacing);
      let y = spacing + j * (cellHeight + spacing);
      fill(random(255), random(200, 255), random(0, 150));
      rect(x, y, cellWidth, cellHeight);
    }
  }
}
