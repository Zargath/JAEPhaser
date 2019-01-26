import Phaser from 'phaser';
import MainScene from './scenes/MainScene';
import BackgroundScene from './scenes/BackgroundScene';
import FogOfWarScene from './scenes/FogOfWarScene';

export default class Game extends Phaser.Game {
  constructor() {
    super({
      scene: [BackgroundScene, FogOfWarScene, MainScene],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      }
    });
  }
}

window.game = new Game();
