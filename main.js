import { createScoreBoardElement } from "./modules/scoreboard.js";
import { createCanvasElement } from "./modules/canvas.js";

// Original simple event listener
const startMenuItem1 = document.getElementById("startMenuItem1");
startMenuItem1.addEventListener("click", () => {
  myFunction();
});

// Alternative for simple event listener
// startMenuItem1.addEventListener("click", myFunction);

function myFunction() {
  alert("Hello World!");
}

function init_elements() {
  console.log("hello, let's setup the file");

  // createScoreBoardElement();
  // createCanvasElement();
}

init_elements();
