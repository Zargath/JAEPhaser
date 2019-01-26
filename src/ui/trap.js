import Phaser from 'phaser';

export default class Trap extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, prey){
    super(scene, x, y, texture);

    this.prey = prey;
    this.scene.physics.add.overlap(this.prey, this, this.killPrey);
  }

  addToScene() {
    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
  }

  killPrey(prey){
    prey.die();
  }
}