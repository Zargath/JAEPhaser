import Rectangle from './Rectangle';

/**
* Defines the Square primitive for drawing on screen
*/
export default class Square extends Rectangle {
  constructor(x, y, length, scene, graphics = scene.add.graphics()) {
    super(x, y, length, length, scene, graphics);
    this.graphics = graphics;
  }

  // Draws the square to the supplier graphics
  draw() {
    this.clear();
    super.draw();
  }

  // Clear the graphics on screen
  clear() {
    super.clear();
  }
}
