import Phaser from 'phaser';

export default class Button extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(
      config.scene,
      config.x - (config.width / 2),
      config.y - (config.height / 2),
      config.texture
    );
    
    this.unactiveTexture = config.texture;
    this.activeTexture = config.activeTexture;
    this.targetSceneKey = config.targetSceneKey;

    this.setInteractive();

    this.on('pointerover', () => {
      this.setTexture(this.activeTexture);
    }, this);

    this.on('pointerout', () => {
      this.setTexture(this.unactiveTexture);
    }, this);

    this.on('pointerdown', () => {
      this.scene.scene.start(this.targetSceneKey);
    }), this;
  }

  addToScene() {
    this.scene.add.existing(this);
  }

  reset() {
  }
}
