const cellSize = 40; // size of each cell in the grid
const colorR = 79;
const colorG = 38;
const colorB = 233;
const startingAlpha = 200;
const backgroundColor = 31;
let colorWithAlpha;

let numRows;
let numCols;

let currentRow = -1;
let currentCol = -1;
let allNeighbors = []; // Array to store all neighbors

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
  let row = floor(mouseY / cellSize);
  let col = floor(mouseX / cellSize);
  if (row !== currentRow || col !== currentCol) {
    currentRow = row;
    currentCol = col;
    // Add new neighbors to the allNeighbors array
    allNeighbors.push(...getRandomNeighbors(row, col));
  }
  let x = col * cellSize;
  let y = row * cellSize;
  // Draw active cell
  stroke(colorWithAlpha);
  rect(x, y, cellSize, cellSize);
  // Draw and update all neighbors
  for (let neighbor of allNeighbors) {
    let neighborX = neighbor.col * cellSize;
    let neighborY = neighbor.row * cellSize;
    // Update the opacity of the neighbor
    neighbor.opacity = max(0, neighbor.opacity - 5); // Decrease opacity by 5 each frame
    stroke(colorR, colorG, colorB, neighbor.opacity);
    rect(neighborX, neighborY, cellSize, cellSize);
  }
  // Remove neighbors with zero opacity
  allNeighbors = allNeighbors.filter((neighbor) => neighbor.opacity > 0);
}

function getRandomNeighbors(row, col) {
  let neighbors = [];
  for (let dRow = -1; dRow <= 1; dRow++) {
    for (let dCol = -1; dCol <= 1; dCol++) {
      let neighborRow = row + dRow;
      let neighborCol = col + dCol;
      let isCurrentCell = dRow === 0 && dCol === 0;
      let isInBounds =
        neighborRow >= 0 &&
        neighborRow < numRows &&
        neighborCol >= 0 &&
        neighborCol < numCols;
      if (!isCurrentCell && isInBounds && Math.random() < 0.5) {
        neighbors.push({
          row: neighborRow,
          col: neighborCol,
          opacity: 255, // Initial opacity of the neighbor
        });
      }
    }
  }
  return neighbors;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  numRows = Math.ceil(windowHeight / cellSize); // number of rows in the grid
  numCols = Math.ceil(windowWidth / cellSize); // number of columns in the grid
}
