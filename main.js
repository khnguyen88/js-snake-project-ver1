// import { createScoreBoardElement } from "./modules/discard/old_scoreboard_test.js";
// import { createCanvasElement } from "./modules/discard/old_canvas_test.js";

// All Initial DOM Element Objects, By ID, Single
const startMenuSection = document.getElementById("startMenuSection");
const gameSection = document.getElementById("gameSection");
const startMenuItem1 = document.getElementById("startMenuItem1");
const gameboardContainer = document.getElementById("gameboardContainer");
const inGameMenuContainer = document.getElementById("inGameMenuContainer");

// All Initial Dom Elements, Objects, By Class Name, Array
const startMenuItems = document.getElementsByClassName("startMenuItem");

// Other global variables used to throttle framerate down from 60fps for requestAnimationbyFrame
// Source code: https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
var isAninimationOnFlag = false;
var fps, fpsInterval, startTime, now, then, elapsed;
fps = 1;

// Event listener test code
//----------------------------------------------------------------
// Simple Event listner by id
startMenuItem1.addEventListener("click", () => {
  myFunction();
});

function myFunction() {
  console.log("HI");
}
// Alternative for simple event listener by id
// startMenuItem1.addEventListener("click", myFunction);

// Code to transition from start menu screen to gameplay screen
//----------------------------------------------------------------
// Simple Event listner by class name
for (var i = 0; i < startMenuItems.length; i++) {
  startMenuItems[i].addEventListener("click", () => {
    toggleDisplayBetweenTwoDOMElements(startMenuSection, gameSection);
  });
}

function toggleDisplayBetweenTwoDOMElements(
  DOMElementDefaultDisplayOn,
  DOMElementDefaultDisplayOff
) {
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

// Code to check and toggle display of in-game menu during gameplay (at gameplay screen)
//--------------------------------------------------------------------------------------
function toggleDisplayForOneElement(SingleDOMElement) {
  let DOMElement = SingleDOMElement;
  // We need to use window.getComputedStyle(element).someCSS property to get style defined in CSS file
  // DOMElement.style.someCSS only gets properties defined in HTML <style> tags. Positions okay, but others not so much
  if (window.getComputedStyle(DOMElement).display === "none") {
    DOMElement.style.display = "block";
  } else {
    DOMElement.style.display = "none";
  }
}

function checkDisplayOn(SingleDOMElement) {
  let DOMElement = SingleDOMElement;

  if (window.getComputedStyle(DOMElement).display === "none") {
    return false;
  } else {
    return true;
  }
}

function toggleAnimationFlag(ingameMenuDOMElement) {
  let DOMElement = ingameMenuDOMElement;
  if (window.getComputedStyle(DOMElement).display === "none") {
    return true;
  } else {
    return false;
  }
}

// Code to initialize elements
//----------------------------------------------------------------
function init_elements() {
  console.log("hello, let's setup the file");

  // createScoreBoardElement();
  // createCanvasElement();
}

// Code to animate execute codes inside requestAnimationFrame method at a defined fixed FPS, default animation is 60fps
// Source code:  https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
//----------------------------------------------------------------
// Code to initialize the timer variables and start the animation
function startAnimation(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  console.log(startTime);
  animate();
}

//  The animation loop calculates time elapsed since the last loop
//  and only draws if your specified fps interval is achieved
function animate() {
  // Stop animation if check flag is off
  console.log(isAninimationOnFlag);
  if (!isAninimationOnFlag) {
    return;
  }

  // Request another frame
  requestAnimationFrame(animate);

  // Calculate elapsed time since last loop
  now = Date.now();
  elapsed = now - then;

  // If enough time has elapsed, draw the next frame
  if (elapsed > fpsInterval) {
    // Get ready for next frame by setting then=now, but also adjust for your
    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
    then = now - (elapsed % fpsInterval);

    // draw stuff here
    console.log("hi mom");
  }
}

function keyDownBase(event) {
  // Do not allow any users control keys until they're out of the start menu
  if (checkDisplayOn(startMenuSection) == false) {
    switch (event.key) {
      case "Enter":
        toggleDisplayForOneElement(inGameMenuContainer);
        isAninimationOnFlag = toggleAnimationFlag(inGameMenuContainer);

        // Start or unpause animation if the in-game menu is off
        // Else pause animation if the in-game menu is on
        if (checkDisplayOn(inGameMenuContainer) == false) {
          startAnimation(fps);
        }
        break;

      case "Escape":
        alert("End Game!");
        window.close();
        break;
    }
  }
}

function keyDownP1(event) {
  // Do not allow any users control keys until they're out of the start menu
  if (checkDisplayOn(startMenuSection) == false && checkDisplayOn(inGameMenuContainer) == false) {
    switch (event.key) {
      case "ArrowUp":
        console.log("Up");
        break;
      case "ArrowDown":
        console.log("Down");
        break;
      case "ArrowLeft":
        console.log("Left");
        break;
      case "ArrowRight":
        console.log("Right");
        break;
    }
  }
}

init_elements();
document.body.addEventListener("keydown", keyDownBase);
document.body.addEventListener("keydown", keyDownP1);
startAnimation(fps);
