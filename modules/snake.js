// This is just an initial stub of code, will need to think a little harder about how we want to represent basic snake
// Snake Class -> Extends to other snakes, P1Snake, P2Snake, and PCSnake - each with their own set of controls and movment
// Javascript is a bit confusing since its Prototype Type Based OOP, using classes below because I'm more familiar with it.

export class Snake {
  constructor() {
    // Constructor properties and public fields both represent the same thing in JS.
    // https://stackoverflow.com/questions/54851200/what-is-the-difference-between-class-fields-and-properties-in-javascript

    // This is the initial properties that I think a snake object should have

    //This array field represents the snake, each unit of body is represented an element inside the array
    //Each element contains an X, Y coordinate. Possibly color? Think about it.
    //Each element will be object literal w/ X and Y coordinate {x: 20, y: 20}
    this.snakeBody = [];
    this.bodyLength = 0;
    this.cellUnitSize = 0;
    this.xDir = 0;
    this.yDir = 0;
    this.keyDownInputs = { up: "", down: "", left: "", right: "", shoot: "" };
    this.lastHeadPos = [];
    this.bodyColor = "white";
    this.glowColor = "white";
    this.glowSize = 0;
    this.score = 0;
    this.scoreBoardDOMElement = 0;
    this.isAliveStatus = true;
    this.isAnimatedStatus = false;

    // Class Event Listener Method 1: Add event listener within the class
    document.addEventListener("keydown", (event) => this.movementControls(event), true);

    // https://stackoverflow.com/questions/816071/prototype-based-vs-class-based-inheritanceja
    // https://stackoverflow.com/questions/38122497/javascript-event-listener-called-with-class-method
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
    // https://stackoverflow.com/questions/67729799/canvas-in-a-javascript-class
    // https://stackoverflow.com/questions/54851200/what-is-the-difference-between-class-fields-and-properties-in-javascript
  }

  // Initial setter, getter, and methods that defines behaviors anc actions of the snake objects.
  // Trying to breakdown functionalities own individual methods for unit testing.
  // Some methods may have dependencies on one another, but shall be kept to minimum

  // Sets the basic body and glow color of the snake
  setBodyGlowColors(inputBodyColor, inputGlowColor) {
    this.bodyColor = inputBodyColor;
    this.glowColor = inputGlowColor;
  }

  // Set cell size
  setCellSize(inputCellSize) {
    this.cellUnitSize = inputCellSize;
  }

  // Set glow size
  setGlowSize() {
    this.glowSize = parseInt(this.cellUnitSize / 2);
  }

  // Set keydown inputs
  setKeyDownInputs(upKey, downKey, leftKey, rightKey, shootKey) {
    this.keyDownInputs.up = upKey;
    this.keyDownInputs.down = downKey;
    this.keyDownInputs.left = leftKey;
    this.keyDownInputs.right = rightKey;
    this.keyDownInputs.shoot = shootKey;
  }

  // Set the initial position of the snake based on size of the gameboard
  // Adds an object literal w/ X and Y coordinate {x: 20, y: 20} to snake body array
  setPosition(inputXPos, inputYPos) {
    this.snakeBody.push({ x: inputXPos, y: inputYPos });
  }

  // Set the intial direction of the snake
  setInitDirection() {}

  // Set the initial position of the snake
  setInitPosition() {}

  // Set the snake scoreboard
  setScoreBoard(inputScoreBoardDOMElement) {
    this.scoreBoardDOMElement = inputScoreBoardDOMElement;
  }

  // Set the inital score of user snake
  setInitialScore() {
    this.score = 0;
  }

  // Update the direction of the snake based on user or AI controls
  updateDirection(newX, newY) {
    this.xDir = newX;
    this.yDir = newY;
  }

  // Update the position of the snake at the next frame
  // (or adjust positions of all of the snake units)
  // Given it's current position, direction, and cellsize
  updatePosition() {}

  // Update the snake scoreboard
  updateScoreBoard() {}

  // Update the score of user snake
  updateScore() {}

  // Update the pausedStatus
  updatePauseStatus(AnimationStatus) {
    this.isAnimatedStatus = AnimationStatus;
  }

  // Function that grows the body of the snake by one unit and update the snake position
  // (or adjust positions of all of the snake units)
  // based on the snake's current position, direction, and cellsize
  // if the snake "head" has eaten or collided with food.
  growBody() {}

  // Method to draw snake on gameboard canvas
  // Pass canvas into draw method
  draw() {}

  // Event Listener movements for player snake
  // Need to do a bit more research on this
  movementControls(event) {
    if (this.isAnimatedStatus == true) {
      switch (event.key) {
        case this.keyDownInputs.up:
          console.log("Up");
          if (this.yDir == 0) {
            this.yDir = -1;
            this.xDir = 0;
          }
          console.log("YEAAAHHH-UP");
          break;

        case this.keyDownInputs.down:
          console.log("Down");
          if (this.yDir == 0) {
            this.yDir = 1;
            this.xDir = 0;
          }
          console.log("YEAAAHHH-DOWN");
          break;

        case this.keyDownInputs.left:
          if (this.xDir == 0) {
            this.yDir = 0;
            this.xDir = -1;
            console.log("YEAAAHHH-LEFT");
          }
          break;

        case this.keyDownInputs.right:
          if (this.xDir == 0) {
            this.yDir = 0;
            this.xDir = 1;
            console.log("YEAAAHHH-RIGHT");
          }
          break;
      }
    }
  }

  // Check position of snake "head", at element [0] in body
  // If snake head position coordinates (X, Y) matches the food
  eatFoodCheck() {}

  // Check position of snake "head", at element [0] in body
  // If snake head position coordinates (X, Y) matches the food
  eatFoodCheck() {}

  // Checks if snake dies
  deathCheck() {}

  // Checks if snake "head" collided w/ enemys
  collisionWithWall() {}

  // Checks if snake "head" collided w/ enemys
  collisionWithEnemyBodyCheck() {}

  // Checks if snake "head"
  collisionWithEnemyHeadCheck() {}

  // Snake dies
  die() {}
}
