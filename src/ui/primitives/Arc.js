import Phaser from 'phaser';

export default class Triangle extends Phaser.GameObjects.Arc {
  constructor(scene, x, y, radius, startAngle, endAngle, anticlockwise, fillColor, fillAlpha) {
    super(scene, x, y, radius, startAngle, endAngle, anticlockwise, fillColor, fillAlpha);

    scene.add.existing(this);
  }
}
