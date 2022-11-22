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
    this.cellUnitSize = 0;
    this.xDir = 0;
    this.yDir = 0;
    this.keyDownInputs = { up: "", down: "", left: "", right: "", shoot: "" };
    this.lastHeadPos = { x: 0, y: 0 };
    this.bodyColor = "white";
    this.glowColor = "white";
    this.glowSize = 0;
    this.score = 0;
    this.scoreBoardDOMElement;
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
  setBodyAndGlowColors(inputBodyColor, inputGlowColor) {
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
  setInitPosition(inputXPos, inputYPos) {
    this.snakeBody.push({ x: inputXPos, y: inputYPos });
  }

  // Set the intial direction of the snake
  // Direction can be either -1, 0, 1
  // Snake can only move in one direction at a time, so if the x-direction is -1 or 1,
  // then the y-direction must be 0, and vice versa
  setInitDirection(initXDir = 0, initYDir = 0) {
    // If the initial x direction and y direction are a) both set to zero, b) set the same value,
    // c) the initial x direction is less than -1 or greater than 1,
    // d) the initial y direction is less than -1 or greater than 1,
    // e) the initial x direction is 1 while the y direction is -1, and
    // f) the initial x direction is -1 while the y direction is 1, then we
    // will generate a new set of direction values
    if (
      (initXDir == 0 && initYDir == 0) ||
      initXDir == initYDir ||
      (initXDir < -1 && initXDir > 1) ||
      (initYDir < -1 && initYDir > 1) ||
      (initXDir == 1 && initYDir == -1) ||
      (initXDir == -1 && initYDir == 1)
    ) {
      // Generates x-direction value
      // Generates a random numbers from 0 through 2.
      let randomizeNumX = Math.floor(Math.random() * 3);

      // If the randomized number is 2, assign a -1 to the x-direction
      if (randomizeNumX == 2) {
        this.xDir = -1;
        this.yDir = 0;
      }

      // If the randomized number is 1, assign a 1 to the x-direction, and 0 to the y-direction
      else if (randomizeNumX == 1) {
        this.xDir = 1;
        this.yDir = 0;
      }
      // If the randomized number is 0, assign 0 to x-direction, and generate numbers for y-direction
      else {
        this.xDir = 0;

        // Generates y-direction value
        // Generates a random numbers from 0 through 1.
        let randomizeNumY = Math.floor(Math.random() * 2);
        if (randomizeNumY == 1) {
          this.yDir = 1;
        } else {
          this.yDir = -1;
        }
      }
    } else {
      this.xDir = initXDir;
      this.yDir = initYDir;
    }
  }

  // Set the snake scoreboard
  setScoreBoardObject(inputScoreBoardDOMElement) {
    this.scoreBoardDOMElement = inputScoreBoardDOMElement;
  }

  // Set the inital score of user snake
  setInitialScore() {
    this.score = 0;
  }

  // Get snakeBody array
  getSnakeBodyArray() {
    return this.snakeBody;
  }

  // Update the direction of the snake based on user or AI controls
  updateDirection(newX, newY) {
    this.xDir = newX;
    this.yDir = newY;
  }

  // Update the position of the snake at the next frame
  // (or adjust positions of all of the snake units)
  // Given it's current position, direction, and cellsize
  updatePosition() {
    if (this.snakeBody.length > 0) {
      // Store the last head position of the snake
      this.lastHeadPos.x = this.snakeBody[0].x;
      this.lastHeadPos.y = this.snakeBody[0].y;

      // Update the head position of the snake and temporary store in the variable
      let newXHeadPos = this.lastHeadPos.x + this.cellUnitSize * this.xDir;
      let newYHeadPos = this.lastHeadPos.y + this.cellUnitSize * this.yDir;

      // Update the position of all cells in the snake body
      // We can do this by insert new head with the next position at the beginning of the snake body,
      // this will effectively shift the old positions of each position down the body, and
      // after we remove the old tail. The position will be updated throughout the snake body

      this.snakeBody.splice(0, 0, { x: newXHeadPos, y: newYHeadPos });
      this.snakeBody.pop();
    }
  }

  // Update the snake scoreboard
  updateScoreBoard() {
    this.scoreBoardDOMElement.innerHTML = this.score;
  }

  // Update the score of user snake
  updateScore() {
    this.score++;
  }

  // Update the pausedStatus
  updatePauseStatus(AnimationStatus) {
    this.isAnimatedStatus = AnimationStatus;
  }

  // Function that grows the body of the snake by one unit and update the snake position
  // (or adjust positions of all of the snake units)
  // based on the snake's current position, direction, and cellsize
  // if the snake "head" has eaten or collided with food.
  growBody() {
    // If we want to grow the snake at the head we can just duplicate code in updatePosition()
    // and exclude the code to pop the last element.
    // However pushes the snake forward a little by one unit

    // This particular line of code grow the snake at the tail
    if (this.snakeBody.length > 0) {
      // Store the last tail position of the snake
      let oldXTailPos = this.snakeBody[this.snakeBody.length - 1].x;
      let oldYTailPos = this.snakeBody[this.snakeBody.length - 1].y;

      // Create a new new tail position of the snake based on the previous tail position,
      // cell size and current direction of the snake, and temporary store in the variable
      let newXTailPos = oldXTailPos - this.cellUnitSize * this.xDir;
      let newYTailPos = oldYTailPos - this.cellUnitSize * this.yDir;

      // Insert the new tail position of the snake at the end
      this.snakeBody.push({ x: newXTailPos, y: newYTailPos });
    }
  }

  // Method to draw snake on gameboard canvas
  // Pass canvas context object into draw method
  draw(gameboardCanvasContext) {
    // Update X,Y position of stubbed snake. Using a starting temporary position
    if (this.snakeBody.length > 0) {
      // Add color to canvas
      gameboardCanvasContext.fillStyle = this.bodyColor;

      // Adds glow effect to drawn object
      // Learning source: https://stackoverflow.com/questions/5067368/html5-canvas-create-outer-glow-effect-of-shape
      gameboardCanvasContext.shadowBlur = this.glowSize;
      gameboardCanvasContext.shadowColor = this.glowColor;

      // Iterate through each snake cell and draw into canvas context
      for (let i = 0; i < this.snakeBody.length; i++) {
        gameboardCanvasContext.fillRect(
          this.snakeBody[i].x,
          this.snakeBody[i].y,
          this.cellUnitSize,
          this.cellUnitSize
        );
      }
    }
  }

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

        case " ":
          console.log("YEAAAHHH-Space");
          this.growBody();
          break;
      }
    }
  }

  // Check position of snake "head", at element [0] in body
  // If snake head position coordinates (X, Y) matches the food
  // To Do: Move food eaten algorithm check over into snake class
  // Pass in foodSet array into parameter and check
  // If food not eaten return -1
  // Else return element index of eaten food
  // Snake will take this value and update the food position at index i that was eaten
  // We want to do this to ensure that snake eat food
  eatFoodCheck(foodEatenFlag) {
    console.log(foodEatenFlag);
    if (foodEatenFlag) {
      this.updateScore();
      this.updateScoreBoard();
      this.growBody();
    }
  }

  // Checks if snake dies
  deathCheck() {}

  // Checks if snake "head" collided w/ wall
  collisionWithWall() {}

  // Checks if snake "head" collided w/ enemy "head"
  // Both player loses
  collisionWithEnemyBodyCheck() {}

  // Checks if snake "head" collided w/ enemy "body"
  // This player's snake loses
  collisionWithEnemyHeadCheck() {}

  // Snake dies
  die() {}
}
