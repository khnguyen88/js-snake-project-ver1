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

    this.foodCount = initFoodNum;
    this.updateFoodCount(initFoodNum, this.canvasColumCells, this.canvasRowCells);
    this.initializeFoodSet(this.foodCount, this.canvasColumCells, this.canvasRowCells);

    this.foodColor = "gold";
    this.glowColor = "lemonchiffon";
    this.glowSize = cellUnitSize / 2;
  }

  // Use to randomly set the starting position of object based on canvas's row or column cells
  randomizedBasedOnCanvasCellCount(canvasDimensionCellNum) {
    // Generates a random integer from 0 to (canvas's row or column cell count - 2)
    let randomNum = Math.floor(Math.random() * (canvasDimensionCellNum - 1));

    // Adjust a randonmize integer to range from 1 to (canvas's row or column cell count - 1)
    // We do this to ensure everything remains within bound
    return randomNum + 1;
  }

  // Generate the number food set based on the number of user request and store in database
  initializeFoodSet(num, canvasColumnCellNum, canvasRowCellNum) {
    for (let i = 0; i < num; i++) {
      let tempXPos = this.randomizedBasedOnCanvasCellCount(canvasColumnCellNum);
      let tempYPos = this.randomizedBasedOnCanvasCellCount(canvasRowCellNum);
      this.foodSet.push({ x: tempXPos, y: tempYPos });
    }
  }

  // Update any food element's position in the set where food was eaten or collided with an object
  updateFoodSet() {}

  // Checks if there is any collision between a snake object
  // Call updateFoodSet to update food element that has been eaten by snake
  checkSnakeCollision(someSnakeObject) {}

  // Update the food number if there is no user input
  // Generate based on screen resolution
  updateFoodCount(userFoodNumInput, canvasColumnCellNum, canvasRowCellNum) {
    if (userFoodNumInput <= 0) {
      let newFoodNum = 0;
      let canvasResolutionInKilo = (canvasColumnCellNum * canvasRowCellNum) / 1000;
      if (canvasResolutionInKilo <= 250) {
        let = newFoodNum = 2;
      } else if (canvasResolutionInKilo > 250 && canvasResolutionInKilo <= 500) {
        let = newFoodNum = 3;
      } else if (canvasResolutionInKilo > 500 && canvasResolutionInKilo <= 1000) {
        let = newFoodNum = 5;
      } else if (canvasResolutionInKilo > 1000 && canvasResolutionInKilo <= 2000) {
        let = newFoodNum = 7;
      } else if (canvasResolutionInKilo > 2000 && canvasResolutionInKilo <= 4000) {
        let = newFoodNum = 10;
      } else if (canvasResolutionInKilo > 4000) {
        let = newFoodNum = 20;
      }
    }
    this.foodCount = newFoodNum;
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
}
