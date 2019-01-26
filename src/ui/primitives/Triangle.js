import Phaser from 'phaser';

export default class Triangle extends Phaser.GameObjects.Triangle {
  constructor(scene, x, y, x1, y1, x2, y2, x3, y3) {
    super(scene, x, y, x1, y1, x2, y2, x3, y3);

    this.setStrokeStyle(2, 0xffffff, 1);
    scene.add.existing(this);
  }
}
