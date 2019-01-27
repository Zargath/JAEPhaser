import Phaser from 'phaser';
import BaseScene from './BaseScene';
import Button from '../ui/buttons/button';

export default class GameEndScene extends BaseScene {
  constructor() {
    super({ key: 'GameEndScene', active: false });
  }

  preload(){
    this.load.image('play-again', 'assets/PlayAgain.png');
    this.load.image('play-again-active', 'assets/PlayAgainActive.png');
  }

  create() {
    const width = 192;
    const height = 64;
    const x = (this.game.canvas.width / 2);
    const y = (this.game.canvas.height / 2);

    var playAgainButton = new Button({
      scene: this,
      x,
      y,
      width,
      height,
      texture: 'play-again',
      activeTexture: 'play-again-active',
      targetSceneKey: 'MainScene'
    });

    playAgainButton.addToScene();
  }
}