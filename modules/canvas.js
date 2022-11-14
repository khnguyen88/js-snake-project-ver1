function roundToNearest10(num) {
  return Math.floor(num / 10) * 10;
}

function updateGameboardCanvasSize(gameboardCanvas, gameboardContainer) {
  var canvasGameBoard = gameboardCanvas;
  var containerGameboard = gameboardContainer;
  var containerGameboardHeight = parseInt(window.getComputedStyle(containerGameboard).height);
  var containerGameboardWidth = parseInt(window.getComputedStyle(containerGameboard).width);
  canvasGameBoard.height = roundToNearest10(containerGameboardHeight);
  canvasGameBoard.width = roundToNearest10(containerGameboardWidth);
}

export { updateGameboardCanvasSize };
