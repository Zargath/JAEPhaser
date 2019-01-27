import Phaser from 'phaser';

export default class MovableObject extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(
      config.scene,
      config.x + (config.scene.map.tileWidth / 2),
      config.y + (config.scene.map.tileHeight / 2),
      config.texture
    );

    // player settings
    this.gravity = 500;
    this.drag = 0.96; // 1 == less drag, change this value is low increments.

    this.scene = config.scene;
    this.mover = config.player;

    this.startLocX = this.x;
    this.startLocY = this.y;
  }

  addToScene() {
    this.scene.physics.add.collider(this.mover, this);
    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);

    this.setGravityY(this.gravity);
    this.body.useDamping = true;
    this.body.setDragX(this.drag);
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
  }

  reset() {
    this.x = this.startLocX;
    this.y = this.startLocY;
  }
}
