import { createScoreBoardElement } from "./modules/scoreboard.js";
import { createCanvasElement } from "./modules/canvas.js";

const startMenuItems = document.getElementById("startMenuItem1");
startMenuItems.addEventListener("click", () => {
  myFunction();
});

startMenuItems.addEventListener("click", myFunction);

function myFunction() {
  alert("Hello World!");
}

function init_elements() {
  console.log("hello, let's setup the file");

  // createScoreBoardElement();
  // createCanvasElement();
}

init_elements();
