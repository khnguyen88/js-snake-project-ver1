import { updateGameboardCanvasSize, addContextToGameboardCanvas } from "./modules/canvas.js";

// All Initial DOM Element Objects, By ID, Single
const startMenuSection = document.getElementById("startMenuSection");
const gameSection = document.getElementById("gameSection");
const startMenuItem1 = document.getElementById("startMenuItem1");
const gameboardContainer = document.getElementById("gameboardContainer");
const gameboardCanvas = document.getElementById("gameboardCanvas");
const inGameMenuContainer = document.getElementById("inGameMenuContainer");

// All Initial Dom Elements, Objects, By Class Name, Array
const startMenuItems = document.getElementsByClassName("startMenuItem");

// Initiate Canvas Context
var gameboardCanvasContext = gameboardCanvas.getContext("2d");
var canvasBGColor = window.getComputedStyle(gameboardCanvas).backgroundColor;
var canvasCellSize = 20;
var canvasCellWidth = 20;
var canvasCellHeight = 20;

// Temporary Variable
var tempXPosition = 40;
var tempYPosition = 40;
var tempXDirect = 0;
var tempYDirect = 1;

// Other global variables used to throttle framerate down from 60fps for requestAnimationbyFrame
// Source code: https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
var isAninimationOnFlag = false;
var fps, fpsInterval, startTime, now, then, elapsed;
fps = 5;

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

    //TEMP MOVEMENT PIECE

    gameboardCanvasContext.fillStyle = canvasBGColor;
    gameboardCanvasContext.fillRect(0, 0, gameboardCanvas.width, gameboardCanvas.height);

    tempXPosition += canvasCellSize * tempXDirect;
    tempYPosition += canvasCellSize * tempYDirect;
    gameboardCanvasContext.fillStyle = "aquamarine";
    gameboardCanvasContext.fillRect(tempXPosition, tempYPosition, canvasCellSize, canvasCellSize);
  }
}

// Event listener for change to gameplay section change
// Observes any change to the gameplay section display
// Source code: https://stackoverflow.com/questions/2157963/is-it-possible-to-listen-to-a-style-change-event
// ----------------------------------------------------------------------------
var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutationRecord) {
    console.log("style changed!");
    updateGameboardCanvasSize(gameboardCanvas, gameboardContainer);
    addContextToGameboardCanvas(gameboardCanvas);
  });
});

observer.observe(gameSection, { attributes: true, attributeFilter: ["style"] });

// Event listner for window resize. Grid and position dependent on size of page.
// Any change will mess up their placement.
// ----------------------------------------------------------------------------
window.addEventListener("resize", () => {
  alert("Page resize has been detected. Game will be reset! Sorry!");
  window.location.reload();
});

// Keydown Event Listeners
// ----------------------------------------------------------------------------
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
        tempYDirect = -1;
        tempXDirect = 0;
        break;
      case "ArrowDown":
        console.log("Down");
        tempYDirect = 1;
        tempXDirect = 0;
        break;
      case "ArrowLeft":
        console.log("Left");
        tempYDirect = 0;
        tempXDirect = -1;
        break;
      case "ArrowRight":
        console.log("Right");
        tempYDirect = 0;
        tempXDirect = 1;
        break;
    }
  }
}

document.body.addEventListener("keydown", keyDownBase);
document.body.addEventListener("keydown", keyDownP1);

init_elements();
startAnimation(fps);
