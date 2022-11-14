function roundToNearest10(num) {
  return Math.floor(num / 10) * 10;
}

// This function adjusts and updates the canvas height and width based off container
// This ensure canvas size changes to promote a responsive game
function updateGameboardCanvasSize(gameboardCanvas, gameboardContainer) {
  var canvasGameBoard = gameboardCanvas;
  var containerGameboard = gameboardContainer;
  // Note DOMElement.scrollHeight will approximate estimate, can use if desired
  // Note DOMElement.scrollWidth will approximate estimate, can use if desired
  var containerGameboardHeight = parseInt(window.getComputedStyle(containerGameboard).height);
  var containerGameboardWidth = parseInt(window.getComputedStyle(containerGameboard).width);
  canvasGameBoard.height = roundToNearest10(containerGameboardHeight);
  canvasGameBoard.width = roundToNearest10(containerGameboardWidth);
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

// ToDo: Add function that will define cell size based on dimension or resolution of screen
// This size of cell unit will. Currently cells are in 20x20 in test function
export { updateGameboardCanvasSize, addContextToGameboardCanvas };
