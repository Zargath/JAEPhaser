import Rectangle from './Rectangle';

/**
* Defines the Square primitive for drawing on screen
*/
export default class Square extends Rectangle {
  constructor(x, y, length, scene, graphics = scene.add.graphics()) {
    super(x, y, length, length, scene, graphics);
  }

  // Draws the square to the supplier graphics
  draw(graphics = this.graphics) {
    console.log('Drawing square');
    super.draw(graphics);
  }

  // Clear the graphics on screen
  clear() {
    super.clear();
  }
}
