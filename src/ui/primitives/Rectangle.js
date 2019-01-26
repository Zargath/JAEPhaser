import Phaser from 'phaser';
/**
* Defines the Rectangle primitive for drawing on screen
*/
export default class Rectangle {
  constructor(x, y, width, height, scene, graphics = scene.add.graphics()) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.graphics = graphics;
    this.offsetX = 1;
    this.rectangle = new Phaser.Geom.Rectangle(x, y, width, height);
  }

  update() {
    this.rectangle.setPosition(this.offsetX + this.rectangle.x, this.rectangle.y);
  }

  /**
  * Draws the rectnalge on screen
  * with the supplied graphics or the default graphics
  */
  draw(graphics) {
    this.clear();
    graphics.lineStyle(2, 0xFFFFFF, 1);
    graphics.strokeRectShape(this.rectangle);
  }

  // Clears the image on screen
  clear() {
    this.graphics.clear();
  }
}
