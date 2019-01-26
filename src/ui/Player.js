import Phaser from 'phaser';
import Triangle from './primitives/Triangle';

<<<<<<< HEAD
export default class Player extends Triangle {
  constructor(scene, x, y) {
    super(scene, x, y, 100, 100, 150, 50, 50, 50);
=======
export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
>>>>>>> 00d6fd4d86675e2044265bee1864b0f97ac61dab
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown && this.x > 0) {
      this.setAngle(-90);
      this.x -= 2.5;
<<<<<<< HEAD
    } else if (this.cursors.right.isDown && this.x < 3392) {
=======
    }
    else if (this.cursors.right.isDown && this.x < 3392) {
>>>>>>> 00d6fd4d86675e2044265bee1864b0f97ac61dab
      this.setAngle(90);
      this.x += 2.5;
    }

    if (this.cursors.up.isDown && this.y > 0) {
      this.y -= 2.5;
<<<<<<< HEAD
    } else if (this.cursors.down.isDown && this.y < 240) {
      this.y += 2.5;
    }
  }
}
=======
    }
    else if (this.cursors.down.isDown && this.y < 240) {
      this.y += 2.5;
    }
  }
}
>>>>>>> 00d6fd4d86675e2044265bee1864b0f97ac61dab
