import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    this.scene = scene;

    // player settings
    this.gravity = 500;
    this.walkSpeed = 200;
    this.jumpSpeed = 320;
    this.doubleJumpSpeed = 180;

    // player defaults
    this.canJump = true;
    this.canDoubleJump = false;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setGravityY(this.gravity);
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);

    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update() {
    this.updateWalk();
    this.updateJump();
  }

  updateWalk() {
    if (this.cursors.left.isDown) {
      this.setVelocityX(-this.walkSpeed);
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(this.walkSpeed);
    } else {
      this.setVelocityX(0);
    }
  }

  updateJump() {
    if (this.body.blocked.down) {
      this.canJump = true;
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      if (this.canJump) {
        this.setVelocityY(-this.jumpSpeed);
        this.canJump = false;
        this.canDoubleJump = true;
      } else if (this.canDoubleJump) {
        this.canDoubleJump = false;
        this.setVelocityY(-this.doubleJumpSpeed);
      }
    }
  }
}
