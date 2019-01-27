import Phaser from 'phaser';

export default class Trap extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(
      config.scene,
      config.x + (config.map.tileWidth / 2),
      config.y + (config.map.tileWidth / 2),
      config.texture
    );

    this.prey = config.player;
    this.scene.physics.add.overlap(this.prey, this, this.killPrey);
    this.collidesWithTerrain = config.collidesWithTerrain;
  }

  addToScene() {
    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
  }

  update() {

  }

  reset() {

  }

  killPrey(prey) {
    prey.die();
  }
}
