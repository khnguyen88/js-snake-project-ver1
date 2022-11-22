export class Food {
  constructor(setCellUnitSize, canvasColumnCellNum, canvasRowCellNum, initFoodNum = 0) {
    // Constructor properties and public fields both represent the same thing in JS.
    // https://stackoverflow.com/questions/54851200/what-is-the-difference-between-class-fields-and-properties-in-javascript

    // This is the initial properties that I think a food object

    //This array field represents the food avaliable on the field, each unit of food is represented an element inside the array
    //Each element contains an X, Y coordinate. Possibly color? Think about it.
    //Each element will be object literal w/ X and Y coordinate {x: 20, y: 20}
    this.foodSet = [];

    this.cellUnitSize = setCellUnitSize;
    this.canvasColumCells = canvasColumnCellNum;
    this.canvasRowCells = canvasRowCellNum;
    this.foodEatenFlag = false;
    this.foodNum = initFoodNum;
    this.setFoodNum(initFoodNum, this.canvasColumCells, this.canvasRowCells, this.cellUnitSize);
    this.initializeFoodSet(
      this.foodNum,
      this.canvasColumCells,
      this.canvasRowCells,
      this.cellUnitSize
    );
    this.foodIndexToUpdate = -1;

    // If the total amount of food eaten equals the product of the canvas height and width minus snake
    // We can obtain this number from the sum of scoreboard minus (1 or 2, depending on the single player or multiplayer mode)
    // We can obtained this from snake object scores
    // We subtract one or two points
    this.totalFoodEatenCount = 0;

    this.foodColor = "gold";
    this.glowColor = "lemonchiffon";
    this.glowSize = this.cellUnitSize / 2;
  }

  // Use to randomly set the starting position of object based on canvas's row or column cells
  randomizedBasedOnCanvasCellCount(canvasDimensionCellNum) {
    // Generates a random integer from 0 to (canvas's row or column cell count - 2)
    let randomNum = Math.floor(Math.random() * (canvasDimensionCellNum - 1));

    // Adjust a randonmize integer to range from 1 to (canvas's row or column cell count - 1)
    // We do this to ensure everything remains within bound
    return randomNum + 1;
  }

  // Generates the number of food based on the user input and stores it in the food set array
  initializeFoodSet(num, canvasColumnCellNum, canvasRowCellNum, cellUnitSize) {
    for (let i = 0; i < num; i++) {
      let tempXPos = this.randomizedBasedOnCanvasCellCount(canvasColumnCellNum) * cellUnitSize;
      let tempYPos = this.randomizedBasedOnCanvasCellCount(canvasRowCellNum) * cellUnitSize;
      this.foodSet.push({ x: tempXPos, y: tempYPos });
    }
  }

  // Update any food element's position in the set where food was eaten or collided with an object
  updateFoodSetPosition(indexToUpdate, canvasColumnCellNum, canvasRowCellNum, cellUnitSize) {
    let newXPos = this.randomizedBasedOnCanvasCellCount(canvasColumnCellNum) * cellUnitSize;
    let newYPos = this.randomizedBasedOnCanvasCellCount(canvasRowCellNum) * cellUnitSize;
    this.foodSet[indexToUpdate] = { x: newXPos, y: newYPos };
  }

  // Update food set size as the avaliable space on the canvas decreases
  updateFoodSetSize() {}

  // Checks if there is any collision between a snake object
  // Call updateFoodSet to update food element that has been eaten by snake
  checkSnakeCollision(someSnakeObjectArray) {
    let snakeHead = someSnakeObjectArray[0];
    for (let i = 0; i < this.foodSet.length; i++) {
      if (this.foodSet[i].x == snakeHead.x && this.foodSet[i].y == snakeHead.y) {
        this.updateFoodSetPosition(
          i,
          this.canvasColumCells,
          this.canvasRowCells,
          this.cellUnitSize
        );
        this.foodEatenFlag = true;
      }
    }
  }

  resetFoodEatenFlag() {
    this.foodEatenFlag = false;
  }

  // Update the food number if there is no user input
  // Generate based on canvas resolution
  setFoodNum(userFoodNumInput, canvasColumnCellNum, canvasRowCellNum, cellUnitSize) {
    if (userFoodNumInput <= 0) {
      let newFoodNum = 0;
      let canvasResolutionInKilo =
        (canvasColumnCellNum * canvasRowCellNum * Math.pow(cellUnitSize, 2)) / 1000;
      if (canvasResolutionInKilo <= 250) {
        newFoodNum = 2;
      } else if (canvasResolutionInKilo > 250 && canvasResolutionInKilo <= 500) {
        newFoodNum = 3;
      } else if (canvasResolutionInKilo > 500 && canvasResolutionInKilo <= 1000) {
        newFoodNum = 5;
      } else if (canvasResolutionInKilo > 1000 && canvasResolutionInKilo <= 2000) {
        newFoodNum = 7;
      } else if (canvasResolutionInKilo > 2000 && canvasResolutionInKilo <= 4000) {
        newFoodNum = 10;
      } else if (canvasResolutionInKilo > 4000) {
        newFoodNum = 20;
      }
      this.foodNum = newFoodNum;
    }
  }

  draw(gameboardCanvasContext) {
    // Update X,Y position of foods on canvas.
    if (this.foodSet.length > 0) {
      // Add color to canvas
      gameboardCanvasContext.fillStyle = this.foodColor;

      // Adds glow effect to drawn object
      // Learning source: https://stackoverflow.com/questions/5067368/html5-canvas-create-outer-glow-effect-of-shape
      gameboardCanvasContext.shadowBlur = this.glowSize;
      gameboardCanvasContext.shadowColor = this.glowColor;

      // Iterate through each food from set and draw into canvas context
      for (let i = 0; i < this.foodSet.length; i++) {
        gameboardCanvasContext.fillRect(
          this.foodSet[i].x,
          this.foodSet[i].y,
          this.cellUnitSize,
          this.cellUnitSize
        );
      }
    }
  }

  getFoodEatenFlag() {
    return this.foodEatenFlag;
  }
}
