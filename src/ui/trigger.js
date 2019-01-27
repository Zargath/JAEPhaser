import Phaser from 'phaser';

export default class Trigger extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(
      config.scene,
      config.x + (config.scene.map.tileWidth / 2),
      config.y + (config.scene.map.tileWidth / 2),
      'trigger-box'
    );

    this.triggerer = config.triggerer;
    this.triggerCallback = config.triggerCallback;

    this.scene.physics.add.overlap(this.triggerer, this, this.triggerCallback);
  }

  addToScene() {
    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
  }

  reset() {
  }
}
