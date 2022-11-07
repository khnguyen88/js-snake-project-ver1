import { createScoreBoardElement } from "./modules/scoreboard.js";
import { createCanvasElement } from "./modules/canvas.js";

function init_elements() {
  console.log("hello, let's setup the file");
  createScoreBoardElement();
  createCanvasElement();
}

init_elements();
