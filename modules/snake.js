// This is just an initial stub of code, will need to think a little harder about how we want to represent basic snake
// Snake Class -> Extends to other snakes, P1Snake, P2Snake, and PCSnake - each with their own set of controls and movment
// Javascript is a bit confusing since its Prototype Type Based OOP, using classes below because I'm more familiar with it.

class Snake {
  constructor() {
    // Constructor properties and public fields both represent the same thing in JS.
    // https://stackoverflow.com/questions/54851200/what-is-the-difference-between-class-fields-and-properties-in-javascript

    // This is the initial properties that I think a snake object should have

    //This array field represents the snake, each unit of body is represented an element inside the array
    //Each element contains an X, Y coordinate. Possibly color? Think about it.
    this.snakeBody = [];
    this.bodyLength = 0;
    this.cellUnitSize = 0;
    this.xDir = 0;
    this.yDir = 0;
    this.color = color;
    this.score = 0;

    // https://stackoverflow.com/questions/816071/prototype-based-vs-class-based-inheritanceja
    // https://stackoverflow.com/questions/38122497/javascript-event-listener-called-with-class-method
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
    // https://stackoverflow.com/questions/67729799/canvas-in-a-javascript-class
    // https://stackoverflow.com/questions/54851200/what-is-the-difference-between-class-fields-and-properties-in-javascript
  }

  // Initial setter, getter, and methods that defines behaviors anc actions of the snake objects.

  updateDirection(newX, newY) {
    this.xDir = newX;
    this.yDir = newY;
  }

  updateScore() {
    this.score = 0;
  }

  movePosition() {}

  growBody() {}

  eatFood() {}

  draw() {}

  movementControls() {}

  updateScoreboard() {}
}
