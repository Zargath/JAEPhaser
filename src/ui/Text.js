/**
* Defines the Rectangle primitive for drawing on screen
*/
export default class Text {
  constructor(x, y, text, textStyle, scene) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.textStyle = textStyle;
    this.scene = scene;
  }

  /**
  * Draws the rectnalge on screen
  * with the supplied graphics or the default graphics
  */
  draw() {
    console.log(`drawing text ${this.text}`);
    this.scene.add.text(this.x, this.y, this.text, this.textStyle);
  }
}
