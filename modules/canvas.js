function roundUpNearest10(num) {
  return Math.floor(num / 10) * 10;
}

function createCanvasElement() {
  var createCanvasGameBoard = document.createElement("canvas");
  createCanvasGameBoard.setAttribute("id", "canvasID");
  createCanvasGameBoard.style.background = "#03002E";
  document.body.appendChild(createCanvasGameBoard);
  var canvasGameBoard = document.getElementById("canvasID");
  canvasGameBoard.height = 400;
  canvasGameBoard.width = 600;
  var canvasGameBoardContext = canvasGameBoard.getContext("2d");
  canvasGameBoardContext.fillStyle = "#F3002E";
  canvasGameBoardContext.fillRect(20, 20, 20, 20);
  canvasGameBoardContext.fillStyle = "#F3D02E";
  canvasGameBoardContext.fillRect(40, 40, 20, 20);
  console.log("testing call");
  console.log(roundUpNearest10(window.innerWidth));
  console.log(roundUpNearest10(window.innerHeight));
}

export { createCanvasElement };
