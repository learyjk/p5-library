const MIN_LINES = 2;
const MAX_LINES = 5;
const PADDING_MULTIPLE = 4;
const MIN_SPACING = 50;
const LINE_SIZE = 10;

let xCoordsForVerticalLines = [];
let yCoordsForHorizontalLines = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(windowWidth);
  xCoordsForVerticalLines = getStartCoordinates(windowWidth);
  yCoordsForHorizontalLines = getStartCoordinates(windowHeight);
  fill(30);
  noStroke();
}

function draw() {
  drawLinesFromCoordinates(xCoordsForVerticalLines, "vertical");
  drawLinesFromCoordinates(yCoordsForHorizontalLines);
}

function getStartCoordinates(distance) {
  let coords = [];
  const spacing = LINE_SIZE * PADDING_MULTIPLE;
  const numLines = floor(random(MIN_LINES, MAX_LINES));

  // kkep looping until we have the number of lines we need
  while (coords.length < numLines) {
    let randomCoord = floor(random(spacing, distance - spacing));
    let isGoodCoord = true;
    // Check that coord for this line is far enough from other coords
    for (let coord of coords) {
      if (Math.abs(randomCoord - coord) < LINE_SIZE + spacing) {
        isGoodCoord = false;
      }
      if (!isGoodCoord) break;
    }
    if (isGoodCoord) coords.push(randomCoord);
  }
  console.log(coords);
  return coords;
}

function drawLinesFromCoordinates(coords, orientation = "horizontal") {
  coords.forEach(function (coord) {
    if (orientation === "vertical") {
      rect(coord, -LINE_SIZE + frameCount * 10, LINE_SIZE);
    } else {
      rect(-LINE_SIZE + frameCount * 10, coord, LINE_SIZE);
    }
  });
}
