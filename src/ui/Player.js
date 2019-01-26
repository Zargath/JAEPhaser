import Phaser from 'phaser';
import Triangle from './primitives/Triangle';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown && this.x > 0) {
      this.setAngle(-90);
      this.x -= 2.5;
    }
    else if (this.cursors.right.isDown && this.x < 3392) {
      this.setAngle(90);
      this.x += 2.5;
    }

    if (this.cursors.up.isDown && this.y > 0) {
      this.y -= 2.5;
    }
    else if (this.cursors.down.isDown && this.y < 240) {
      this.y += 2.5;
    }
  }
}