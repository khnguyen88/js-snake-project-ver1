// Use to make sure everything rounds to the nearest unit size
function roundToNearestUnitSize(num, unitSize) {
  // Unit Size will always either be 20 or 40 based on screen resolution
  return Math.floor(num / unitSize) * unitSize;
}

// Use to randomly set the starting position of object on canvas
function randomizedBasedOnUnitSize(unitSize) {
  // Returns a random integer from 0 to (unitSize - 2)
  var randomNum = Math.floor(Math.random() * (unitSize - 1));

  // Adjust a randonmize interger to range from 1 to (unitSize - 1)
  return randomNum + 1;
}

// This function adjusts and updates the canvas height and width based off container
// This ensure canvas size changes to promote a responsive game
function updateGameboardCanvasSize(gameboardCanvas, gameboardContainer, canvasCellUnitSize) {
  var canvasGameBoard = gameboardCanvas;
  var containerGameboard = gameboardContainer;
  // Note DOMElement.scrollHeight will approximate estimate, can use if desired
  // Note DOMElement.scrollWidth will approximate estimate, can use if desired
  var containerGameboardHeight = parseInt(window.getComputedStyle(containerGameboard).height);
  var containerGameboardWidth = parseInt(window.getComputedStyle(containerGameboard).width);
  canvasGameBoard.height = roundToNearestUnitSize(containerGameboardHeight, canvasCellUnitSize);
  canvasGameBoard.width = roundToNearestUnitSize(containerGameboardWidth, canvasCellUnitSize);
}

// ToDo: Context likely need to be called once and applied JS files
// ToDo: This function is only temporary. To help practice how to draw style
function addContextToGameboardCanvas(gameboardCanvas) {
  var canvasGameBoardContext = gameboardCanvas.getContext("2d");
  canvasGameBoardContext.fillStyle = "#F3002E";
  canvasGameBoardContext.fillRect(20, 20, 20, 20);
  canvasGameBoardContext.fillStyle = "#F3D02E";
  canvasGameBoardContext.fillRect(40, 40, 20, 20);
}

// Clears existing canvas context
// Canvas needs to be cleared at the start of very new frame, else there will be an overlap between old and new drawings
// Learning source: https://stackoverflow.com/questions/18598838/canvas-fillstyle-none-in-html5
function clearGameboardCanvasContext(gameboardCanvas, gameboardCanvasContext, canvasBGColor) {
  gameboardCanvasContext.fillStyle = canvasBGColor;
  gameboardCanvasContext.fillRect(0, 0, gameboardCanvas.width, gameboardCanvas.height);
}

// This function defines the cell size based on dimension or resolution of screen
function cellUnitSizeBasedOnWindowSize(windowHeight, windowWidth) {
  if ((windowWidth <= 3000) & (windowHeight <= 2000)) {
    return 20;
  } else {
    return 40;
  }
}

// This function helps defines the starting position of objects drawin within the canvas
function startingPositionBasedOnCanvasAndCellSize(gameboardCanvas, cellSize, position = "") {
  var cellUnitSize = cellSize;
  var gameboardCanvasHeight = gameboardCanvas.height;
  var gameboardCanvasWidth = gameboardCanvas.width;
  var positionOnCanvas = position;

  var x = 0;
  var y = roundToNearestUnitSize(gameboardCanvasHeight / 2 - cellUnitSize, cellUnitSize);

  // User specified to draw object at center of canvas
  if (positionOnCanvas == "center") {
    x = roundToNearestUnitSize(gameboardCanvasWidth / 2 - cellUnitSize, cellUnitSize);
  }
  // User specified to draw object 1/5 of the canvas from left
  else if (positionOnCanvas == "left") {
    x = roundToNearestUnitSize(gameboardCanvasWidth * (1 / 5), cellUnitSize);
  }
  // User specified to draw object 1/5 of the canvas from the right
  else if (positionOnCanvas == "right") {
    x = roundToNearestUnitSize(gameboardCanvasWidth * (4 / 5), cellUnitSize);
  }
  // No specification, position will be randomized
  else {
    let xRandom = randomizedBasedOnUnitSize(cellUnitSize);
    let yRandom = randomizedBasedOnUnitSize(cellUnitSize);

    x = roundToNearestUnitSize(gameboardCanvasWidth * (xRandom / cellUnitSize), cellUnitSize);
    y = roundToNearestUnitSize(gameboardCanvasHeight * (yRandom / cellUnitSize), cellUnitSize);
  }

  return { xPos: x, yPos: y };
}

export {
  updateGameboardCanvasSize,
  addContextToGameboardCanvas,
  clearGameboardCanvasContext,
  cellUnitSizeBasedOnWindowSize,
  startingPositionBasedOnCanvasAndCellSize,
};
