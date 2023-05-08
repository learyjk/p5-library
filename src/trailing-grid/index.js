const cellSize = 40; // size of each cell in the grid
const colorR = 79;
const colorG = 38;
const colorB = 233;
const startingAlpha = 200;
const backgroundColor = 31;
let colorWithAlpha;

let numRows;
let numCols;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorWithAlpha = color(colorR, colorG, colorB, startingAlpha);
  noFill();
  stroke(colorWithAlpha);
  strokeWeight(1);
  numRows = Math.ceil(windowHeight / cellSize); // number of rows in the grid
  numCols = Math.ceil(windowWidth / cellSize); // number of columns in the grid
}

function draw() {
  background(backgroundColor);
  // Draw the grid
  /*
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      let x = col * cellSize;
      let y = row * cellSize;
      rect(x, y, cellSize, cellSize);
    }
  }
  */

  // Calculate the row and column of the cell that the mouse is currently over
  let currentRow = floor(mouseY / cellSize);
  let currentCol = floor(mouseX / cellSize);

  // Use the calculated row and column to determine the position of the cell
  let x = currentCol * cellSize;
  let y = currentRow * cellSize;

  // Draw a highlighted rectangle over the cell under the mouse cursor
  stroke(colorWithAlpha);
  rect(x, y, cellSize, cellSize);
}
