import { createScoreBoardElement } from "./modules/scoreboard.js";
import { createCanvasElement } from "./modules/canvas.js";

// Simple Event listner by class name
const startMenuItems = document.getElementsByClassName("startMenuItem");
for (var i = 0; i < startMenuItems.length; i++) {
  startMenuItems[i].addEventListener("click", myFunction);
}

// Simple Event listner by id
const startMenuItem1 = document.getElementById("startMenuItem1");
startMenuItem1.addEventListener("click", () => {
  myFunction();
});

// Alternative for simple event listener by id
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
