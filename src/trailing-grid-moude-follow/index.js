// CONSTANTS
const CELL_SIZE = 40; // size of each cell in the grid
const COLOR_R = 255;
const COLOR_G = 255;
const COLOR_B = 255;
const STARTING_ALPHA = 255;
const BACKGROUND_COLOR = 31;
const PROB_OF_NEIGHBOR = 0.5;
const AMT_FADE_PER_FRAME = 5;
const STROKE_WEIGHT = 1;

// VARIABLES
let colorWithAlpha;
let numRows;
let numCols;
let currentRow = -1;
let currentCol = -1;
let allNeighbors = []; // Array to store all neighbors

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorWithAlpha = color(COLOR_R, COLOR_G, COLOR_B, STARTING_ALPHA);
  noFill();
  stroke(colorWithAlpha);
  strokeWeight(STROKE_WEIGHT);
  numRows = Math.ceil(windowHeight / CELL_SIZE);
  numCols = Math.ceil(windowWidth / CELL_SIZE);
}

function draw() {
  background(BACKGROUND_COLOR);

  // Calculate the row and column of the cell that the mouse is currently over
  let row = floor(mouseY / CELL_SIZE);
  let col = floor(mouseX / CELL_SIZE);

  // Check if the mouse has moved to a different cell
  // If yes, getRandomNeighbors to display
  if (row !== currentRow || col !== currentCol) {
    currentRow = row;
    currentCol = col;

    allNeighbors.push(...getRandomNeighbors(row, col));
  }

  // Use the calculated row and column to determine the position of the cell
  let x = col * CELL_SIZE;
  let y = row * CELL_SIZE;

  // Draw a highlighted rectangle over the cell under the mouse cursor
  stroke(colorWithAlpha);
  rect(x, y, CELL_SIZE, CELL_SIZE);

  // Draw and update all neighbors
  for (let neighbor of allNeighbors) {
    let neighborX = neighbor.col * CELL_SIZE;
    let neighborY = neighbor.row * CELL_SIZE;
    // Decrease the opacity of the neighbor each frame
    neighbor.opacity = max(0, neighbor.opacity - AMT_FADE_PER_FRAME);
    stroke(COLOR_R, COLOR_G, COLOR_B, neighbor.opacity);
    rect(neighborX, neighborY, CELL_SIZE, CELL_SIZE);
  }
  // Remove neighbors with zero opacity
  allNeighbors = allNeighbors.filter((neighbor) => neighbor.opacity > 0);
}

function getRandomNeighbors(row, col) {
  let neighbors = []; // Initialize an empty array to store neighbor cells

  // Loop through the cells surrounding the given cell (row, col)
  for (let dRow = -1; dRow <= 1; dRow++) {
    for (let dCol = -1; dCol <= 1; dCol++) {
      // Calculate the neighboring cell's row and column indices
      let neighborRow = row + dRow;
      let neighborCol = col + dCol;

      // Check if the current cell in the loop is the given cell (row, col)
      let isCurrentCell = dRow === 0 && dCol === 0;

      // Check if the neighboring cell is within the grid boundaries
      let isInBounds =
        neighborRow >= 0 &&
        neighborRow < numRows &&
        neighborCol >= 0 &&
        neighborCol < numCols;

      // If the cell is not current cell, is within bounds, and meets prob,
      // add the neighboring cell to the neighbors array
      if (!isCurrentCell && isInBounds && Math.random() < PROB_OF_NEIGHBOR) {
        neighbors.push({
          row: neighborRow,
          col: neighborCol,
          opacity: STARTING_ALPHA,
        });
      }
    }
  }

  // Return the array of randomly-selected neighboring cells
  return neighbors;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  numRows = Math.ceil(windowHeight / CELL_SIZE);
  numCols = Math.ceil(windowWidth / CELL_SIZE);
}
