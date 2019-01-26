import Phaser from 'phaser';

/**
* Defines a JAEText primitive for drawing on screen
*/
export default class JAEText extends Phaser.GameObjects.Text {
  constructor(x, y, text, textStyle, scene) {
    super(scene, x, y, text, textStyle);
    this.x = x;
    this.y = y;
    this.text = text;
    this.textStyle = textStyle;
    this.text = text;
    this.scene = scene;
    this.textObject = this.scene.add.text(this.x, this.y, this.text, this.textStyle);
  }

  /**
  * Draws the rectnalge on screen
  * with the supplied graphics or the default graphics
  */
  draw() {
    this.textObject.destroy();
    this.textObject = this.scene.add.text(this.x, this.y, this.text, this.textStyle);
  }
}
