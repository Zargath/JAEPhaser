import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
<<<<<<< HEAD
=======
    scene.physics.add.existing(this);
    
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);

>>>>>>> 217215082fa804060f3f686dacc2b9a01834703e
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update() {
<<<<<<< HEAD
    if (this.cursors.left.isDown && this.x > 0) {
      this.setAngle(-90);
      this.x -= 2.5;
    } else if (this.cursors.right.isDown && this.x < 3392) {
      this.setAngle(90);
      this.x += 2.5;
    }

    if (this.cursors.up.isDown && this.y > 0) {
      this.y -= 2.5;
    } else if (this.cursors.down.isDown && this.y < 240) {
      this.y += 2.5;
    }
  }
}
=======
    if (this.cursors.left.isDown)
    {
        this.setVelocityX(-160);
    }
    else if (this.cursors.right.isDown)
    {
        this.setVelocityX(160);
    }
    else
    {
        this.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.body.touching.down)
    {
        this.setVelocityY(-330);
    }
  }
}
>>>>>>> 217215082fa804060f3f686dacc2b9a01834703e
