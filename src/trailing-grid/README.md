# Trailing Grid Effect

## As Seen on thisisdash.com

### Step 1: Set up the canvas and draw a grid

1.1. Create a canvas with createCanvas(windowWidth, windowHeight) and set up basic drawing properties like noFill(), stroke(255), and strokeWeight(1).

1.2. Calculate the number of rows and columns in the grid based on the canvas size and the desired cell size.

1.3. Use nested loops to draw a grid of rectangles on the canvas. Each rectangle represents a cell in the grid.

1.4 Add windowResized function to make the canvas responsive. Update numRows and numCols within that functiona s well.

### Step 2: Highlight the cell under the mouse cursor

2.1. Calculate the row and column of the cell that the mouse is currently over using floor(mouseY / cellSize) and floor(mouseX / cellSize).

2.2. Use the calculated row and column to determine the position of the cell and draw a highlighted rectangle over it.

### Step 3: Generate random neighboring cells

3.1. Create a function called getRandomNeighbors that takes the current row and column as input and returns an array of neighboring cells.

3.2. Use nested loops to check all cells around the current cell. For each neighboring cell, determine if it is within the grid bounds and if it is not the current cell.

3.3. Randomly decide whether to include each neighboring cell in the output array. Assign an initial opacity value to each neighbor.

### Step 4: Draw and fade out neighboring cells

4.1. Store all neighbors that need to be drawn and faded out in an array called allNeighbors.

4.2. Whenever the mouse moves to a different cell, add new neighbors to the allNeighbors array.

4.3. In the draw function, loop through all neighbors in the allNeighbors array. Draw each neighbor with its current opacity and decrease the opacity over time.

4.4. Remove neighbors from the allNeighbors array if their opacity has reached zero.

### Step 5: Combine everything and test the result

5.1. Combine all the code from the previous steps into the setup and draw functions.

5.2. Test the result by moving the mouse over the grid. Observe the highlighted cell and the fading out of neighboring cells.

5.3. Adjust parameters like the cell size, fade-out speed, and probability of including neighbors to achieve the desired visual effect.

With these steps, learners can gradually build up the code and understand the concepts involved in creating the effect of trailing grid cells that fade out over time. Each step introduces new concepts and builds on the previous step, making it easier for beginners to follow along.
