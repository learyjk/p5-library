# Trailing Grid Effect

## As Seen on thisisdash.com

### Step 1: Set up the canvas and define color variables

1.1. Create a canvas with createCanvas(windowWidth, windowHeight) and set up basic drawing properties like noFill(), stroke(colorWithAlpha), and strokeWeight(1).

1.2. Define color variables for the grid cells (colorR, colorG, colorB) and the background (backgroundColor), as well as a starting alpha value (startingAlpha) for the active cell.

1.3. Calculate the number of rows and columns in the grid based on the canvas size and the desired cell size.

### Step 2: Highlight the cell under the mouse cursor

2.1. Calculate the row and column of the cell that the mouse is currently over using floor(mouseY / cellSize) and floor(mouseX / cellSize).

2.2. Use the calculated row and column to determine the position of the cell and draw a highlighted rectangle over it using the color colorWithAlpha.

### Step 3: Generate random neighboring cells

3.1. Create a function called getRandomNeighbors that takes the current row and column as input and returns an array of neighboring cells.

3.2. Use nested loops to check all cells around the current cell. For each neighboring cell, determine if it is within the grid bounds and if it is not the current cell.

3.3. Randomly decide whether to include each neighboring cell in the output array. Assign an initial opacity value to each neighbor.

### Step 4: Draw and fade out neighboring cells

4.1. Store all neighbors that need to be drawn and faded out in an array called allNeighbors.

4.2. Whenever the mouse moves to a different cell, add new neighbors to the allNeighbors array.

4.3. In the draw function, loop through all neighbors in the allNeighbors array. Draw each neighbor with its current opacity and decrease the opacity over time.

4.4. Remove neighbors from the allNeighbors array if their opacity has reached zero.

### Step 5: Handle window resizing

5.1. Add a windowResized function to handle resizing the canvas when the window is resized.

5.2. In the windowResized function, recalculate the number of rows and columns based on the new window size and resize the canvas accordingly.

5.3. Combine all the code from the previous steps into the setup, draw, and windowResized functions.

5.4. Test the result by moving the mouse over the grid. Observe the highlighted cell and the fading out of neighboring cells.

5.5. Adjust parameters like the cell size, fade-out speed, and probability of including neighbors to achieve the desired visual effect.
