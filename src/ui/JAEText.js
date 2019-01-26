import Phaser from 'phaser';

/**
* Defines a JAEText primitive for drawing on screen
*/
export default class JAEText extends Phaser.GameObjects.Text {
  constructor(x, y, text, textStyle, scene) {
    super(scene, x, y, text, textStyle);
    scene.add.text(this.x, this.y, this.text, this.textStyle);
  }

  update() {

  }
}
