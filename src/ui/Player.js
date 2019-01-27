import Phaser from 'phaser';
import Mediator from '../mediator';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(
      config.scene,
      config.x + (config.scene.map.tileWidth / 2),
      config.y + (config.scene.map.tileHeight / 2),
      config.texture,
    );

    this.scene = config.scene;

    // player settings
    this.gravity = 500;
    this.walkSpeed = 200;
    this.jumpSpeed = 320;
    this.doubleJumpSpeed = 180;

    // player defaults
    this.isJumping = false;
    this.canJump = true;
    this.canDoubleJump = false;
    this.isDead = false;
    this.startLocX = this.x;
    this.startLocY = this.y;

    this.lastSafeLocX = this.x;
    this.lastSafeLocY = this.y;

    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  setLastSafeLocX(value) {
    this.lastSafeLocX = value;
  }

  update() {
    if (!this.isDead) {
      this.updateWalk();
      this.updateJump();
    }
  }

  updateWalk() {
    if (this.cursors.left.isDown) {
      this.setVelocityX(-this.walkSpeed);
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(this.walkSpeed);
    } else {
      this.setVelocityX(0);
    }
    if (this.body.blocked.down && !this.isJumping
      && this.y + 50 < this.scene.physics.world.bounds.height) {
      this.lastSafeLocX = this.x;
      this.lastSafeLocY = this.y;
    }
  }

  updateJump() {
    this.canJump = this.body.blocked.down || this.body.touching.down;

    if (this.canJump && this.isJumping) {
      this.isJumping = false;
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      if (this.canJump) {
        this.setVelocityY(-this.jumpSpeed);
        this.canJump = false;
        this.canDoubleJump = true;
        this.isJumping = true;
      } else if (this.canDoubleJump) {
        this.canDoubleJump = false;
        this.setVelocityY(-this.doubleJumpSpeed);
        this.isJumping = true;
      }
    }
  }

  reset() {
    this.respawn();
  }

  respawn() {
    this.isDead = false;
    console.log(`player respawn x:${this.lastSafeLocX}`);
    this.enableBody(true, this.lastSafeLocX, this.lastSafeLocY, true, true);
  }

  die() {
    this.isDead = true;
    this.disableBody(true, true);
    Mediator.instance.eventEmitter.emit('onPlayerDied', this);
  }

  addToScene() {
    this.scene.physics.add.existing(this);

    this.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);

    this.body.onWorldBounds = true;
    this.body.world.on('worldbounds', this.onWorldBounds);

    this.scene.add.existing(this);
  }

  onWorldBounds(body) {
    // this is world here
    const player = body.gameObject;
    if (body.blocked.down && !player.isDead) {
      player.die();
    }
  }
}
