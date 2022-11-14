function roundToNearest10(num) {
  return Math.floor(num / 10) * 10;
}

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

function addContextToGameboardCanvas(gameboardCanvas) {
  var canvasGameBoardContext = gameboardCanvas.getContext("2d");
  canvasGameBoardContext.fillStyle = "#F3002E";
  canvasGameBoardContext.fillRect(20, 20, 20, 20);
  canvasGameBoardContext.fillStyle = "#F3D02E";
  canvasGameBoardContext.fillRect(40, 40, 20, 20);
}
export { updateGameboardCanvasSize, addContextToGameboardCanvas };
