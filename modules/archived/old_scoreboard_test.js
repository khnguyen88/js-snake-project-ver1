function createScoreBoardElement() {
  var divScoreBoard = document.createElement("div");
  divScoreBoard.setAttribute("id", "scoreboardID");
  divScoreBoard.style.width = "100px";
  divScoreBoard.style.height = "100px";
  divScoreBoard.style.background = "red";
  divScoreBoard.style.color = "white";
  divScoreBoard.innerHTML = "Hello";
  document.body.appendChild(divScoreBoard);
  console.log("testing call");
}

export { createScoreBoardElement };
