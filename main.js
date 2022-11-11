import { createScoreBoardElement } from "./modules/scoreboard.js";
import { createCanvasElement } from "./modules/canvas.js";

// All Initial DOM Element Objects, By ID, Single
const startMenuSection = document.getElementById("startMenuSection");
const gameSection = document.getElementById("gameSection");
const startMenuItem1 = document.getElementById("startMenuItem1");

// All Initial Dom Elements, Objects, By Class Name, Array
const startMenuItems = document.getElementsByClassName("startMenuItem");

// Simple Event listner by id
startMenuItem1.addEventListener("click", () => {
  myFunction();
});

// Alternative for simple event listener by id
// startMenuItem1.addEventListener("click", myFunction);

// Simple Event listner by class name
for (var i = 0; i < startMenuItems.length; i++) {
  startMenuItems[i].addEventListener("click", () => {
    toggleDisplayofDOMElements(startMenuSection, gameSection);
  });
}

function myFunction() {
  console.log("HI");
}

function toggleDisplayofDOMElements(DOMElementDefaultDisplayOn, DOMElementDefaultDisplayOff) {
  let DOMElementOn = DOMElementDefaultDisplayOn;
  let DOMElementOff = DOMElementDefaultDisplayOff;
  // We need to use window.getComputedStyle(element).someCSS property to get style defined in CSS file
  // DOMElement.style.someCSS only gets properties defined in HTML <style> tags. Positions okay, but others not so much
  if (window.getComputedStyle(DOMElementOff).display === "none") {
    DOMElementOff.style.display = "grid";
    DOMElementOn.style.display = "none";
  } else {
    DOMElementOff.style.display = "none";
    DOMElementOn.style.display = "grid";
  }
}

function init_elements() {
  console.log("hello, let's setup the file");

  // createScoreBoardElement();
  // createCanvasElement();
}

init_elements();
