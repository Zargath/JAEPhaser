import Phaser from 'phaser';

export default class MovableObject extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, mover){
    super(scene, x, y, texture);

    // player settings
    this.gravity = 500;
    this.drag = 0.96; // 1 == less drag, change this value is low increments.

    this.scene = scene;
    this.mover = mover;

    this.startLocX = x;
    this.startLocY = y;

    this.scene.physics.add.collider(this.mover, this);
  }

  addToScene(){
    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);

    this.setGravityY(this.gravity);
    this.body.useDamping = true;
    this.body.setDragX(this.drag);
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
  }

  reset(){
    this.reset(this.startLocX, this.startLocY);
  }
}