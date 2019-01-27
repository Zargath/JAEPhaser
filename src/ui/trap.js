import Phaser from 'phaser';

export default class Trap extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(
      config.scene,
      config.x + (config.scene.map.tileWidth / 2),
      config.y + (config.scene.map.tileWidth / 2),
      config.texture
    );

    this.prey = config.player;
    this.scene.physics.add.overlap(this.prey, this, this.killPrey);
  }

  addToScene() {
    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
    this.setImmovable(true);
  }

  reset() {

  }

  killPrey(prey) {
    prey.die();
  }
}
