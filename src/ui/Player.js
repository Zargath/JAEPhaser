import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setBounce(0.2);
    this.setCollideWorldBounds(true);

    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(160);
    } else {
      this.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-330);
    }
  }
}
