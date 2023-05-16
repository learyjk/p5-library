const canvasSize = 200;
const numDots = 8;
const hueSpacing = 360 / numDots;
let polySynth;
let dots = [];
let isPlaying = false; // Variable to check if the sketch is playing

// Define a major scale
const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];

function setup() {
  createCanvas(canvasSize, canvasSize);
  const spacing = canvasSize / numDots;
  for (let i = 0; i < numDots; i++) {
    dots.push({
      x: 0 + spacing / 2,
      y: spacing * i + spacing / 2,
      direction: 1,
      speed: 1 + i / 10, // random speed for each dot
      radius: spacing / 2,
      note: notes[i % notes.length], // assign a note to each dot
    });
  }

  // Create a button for starting the sketch
  let startButton = createButton("Start");
  startButton.mousePressed(startSketch);
}

let hue = 0;

function draw() {
  if (!isPlaying) {
    return; // If the sketch is not playing, don't draw anything
  }

  background(220);

  for (let i = 0; i < numDots; i++) {
    const myDot = dots[i];

    fill(hue + hueSpacing * i);

    ellipse(myDot.x, myDot.y, myDot.radius);

    // Update the dot's position
    myDot.x += myDot.speed * myDot.direction;

    // Check if the dot hits an edge of the canvas
    if (
      myDot.x >= canvasSize - myDot.radius / 2 ||
      myDot.x <= myDot.radius / 2
    ) {
      // Reverse the direction of movement
      polySynth.play(myDot.note, 0.5, 0); // play the dot's note
      myDot.direction *= -1;
    }
  }
}

// Function to start the sketch
function startSketch() {
  if (!isPlaying) {
    // Create the PolySynth in response to a user gesture
    polySynth = new p5.PolySynth();
    userStartAudio();
    isPlaying = true;
  }
}
