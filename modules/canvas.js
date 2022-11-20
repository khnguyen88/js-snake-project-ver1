function roundToNearestUnitSize(num, unitSize) {
  // Unit Size will always either be 10 or 20 based on screen resolution
  return Math.floor(num / unitSize) * unitSize;
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

// ToDo: Add function that will define cell size based on dimension or resolution of screen
// This size of cell unit will. Currently cells are in 20x20 in test function
function cellUnitSizeBasedOnWindowSize(windowHeight, windowWidth) {
  if ((windowWidth <= 500) & (windowHeight <= 1000)) {
    return 20;
  } else {
    return 40;
  }
}

export {
  updateGameboardCanvasSize,
  addContextToGameboardCanvas,
  clearGameboardCanvasContext,
  cellUnitSizeBasedOnWindowSize,
};
