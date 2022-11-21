import {
  updateGameboardCanvasSize,
  addContextToGameboardCanvas,
  clearGameboardCanvasContext,
  cellUnitSizeBasedOnWindowSize,
  startingPositionBasedOnCanvasAndCellSize,
  getCanvasCellNum,
} from "./modules/canvas.js";
import { Snake } from "./modules/snake.js";
import { Food } from "./modules/food.js";

// All Initial DOM Element Objects, By ID, Single
const startMenuSection = document.getElementById("startMenuSection");
const gameSection = document.getElementById("gameSection");
const startMenuItem1 = document.getElementById("startMenuItem1");
const gameboardContainer = document.getElementById("gameboardContainer");
const gameboardCanvas = document.getElementById("gameboardCanvas");
const inGameMenuContainer = document.getElementById("inGameMenuContainer");
const P1scoreboard = document.getElementById("P1Scoreboard");
const P2scoreboard = document.getElementById("P2Scoreboard");

// All Initial Dom Elements, Objects, By Class Name, Array
const startMenuItems = document.getElementsByClassName("startMenuItem");

// Initiate Canvas Context
// Learning source: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
// Learning source: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
var gameboardCanvasContext = gameboardCanvas.getContext("2d");
var canvasBGColor = window.getComputedStyle(gameboardCanvas).backgroundColor;
var canvasCellSize = cellUnitSizeBasedOnWindowSize(window.innerHeight, window.innerWidth);

// Declared variable name, to populate late Canvas dimensions defaults to arbitary number when it's not displayed;
// Will populate Canvas Height and Canvas Width when gameboard section is displayed and canvas dimension is updated to fill size of it's container.
// Not sure if I will need the # of cells in canvas row and column given a cell size unit, will stub out anyways
var canvasWidth;
var canvasHeight;
var canvasColumnCellNum;
var canvasRowCellNum;

// Declared, but undefined Snake;

var snakeP1;
var snakeP2;
var snakePC;
var food;

// Other global variables used to throttle framerate down from 60fps for requestAnimationbyFrame
// Source code: https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
var isAnimationOnFlag = false;
var fps, fpsInterval, startTime, now, then, elapsed;
fps = 10;

// Event listener test code set
//----------------------------------------------------------------

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
  animate();
}

//  The animation loop calculates time elapsed since the last loop
//  and only draws if your specified fps interval is achieved
function animate() {
  // Stop animation if check flag is off
  if (!isAnimationOnFlag) {
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

    //TEMP MOVEMENT PIECE
    // Clears canvas before every loop, else previous drawn stuff remains!
    clearGameboardCanvasContext(gameboardCanvas, gameboardCanvasContext, canvasBGColor);

    if (typeof snakeP1 != "undefined") {
      snakeP1.updatePosition();
      snakeP1.draw(gameboardCanvasContext);
    }

    if (typeof food != "undefined") {
      food.draw(gameboardCanvasContext);
    }
  }
}

// Event listener for change to gameplay section change
// Observes any change to the gameplay section display
// Source code: https://stackoverflow.com/questions/2157963/is-it-possible-to-listen-to-a-style-change-event
// ----------------------------------------------------------------------------
var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutationRecord) {
    console.log("style changed!");

    // Update canvas height and width based the new size of it's container, based on size of screen;
    updateGameboardCanvasSize(gameboardCanvas, gameboardContainer, canvasCellSize);
    addContextToGameboardCanvas(gameboardCanvas);

    // Assign updated canvas height and width to variables
    canvasWidth = gameboardCanvas.width;
    canvasHeight = gameboardCanvas.height;

    // Create P1 snake object and set properties
    let snakeP1startingPosition = startingPositionBasedOnCanvasAndCellSize(
      gameboardCanvas,
      canvasCellSize,
      "left"
    );

    snakeP1 = new Snake();
    snakeP1.setKeyDownInputs("ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "");
    snakeP1.setInitPosition(snakeP1startingPosition.xPos, snakeP1startingPosition.yPos);
    snakeP1.setInitDirection();
    snakeP1.setBodyAndGlowColors("aquamarine", "white");
    snakeP1.setCellSize(canvasCellSize);
    snakeP1.setGlowSize();
    snakeP1.setScoreBoardObject(P1scoreboard);

    let canvasCellNums = getCanvasCellNum(gameboardCanvas, canvasCellSize);
    canvasColumnCellNum = canvasCellNums.columnUnit;
    canvasRowCellNum = canvasCellNums.rowUnit;

    // Create food set object
    food = new Food(canvasCellSize, canvasColumnCellNum, canvasRowCellNum, 0);
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
        isAnimationOnFlag = toggleAnimationFlag(inGameMenuContainer);

        // If snakeP1 object is instantiated and exists
        // Update the snake isAnimatedStatus to reflect isAnimation
        // Learning source: https://stackoverflow.com/questions/4186906/check-if-object-exists-in-javascript
        if (typeof snakeP1 != "undefined") {
          snakeP1.updatePauseStatus(isAnimationOnFlag);
        }

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

document.body.addEventListener("keydown", keyDownBase);

init_elements();
startAnimation(fps);
