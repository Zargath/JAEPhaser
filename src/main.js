import Phaser from 'phaser';
import MainScene from './scenes/MainScene';
import BackgroundScene from './scenes/BackgroundScene';
// import FogOfWarScene from './scenes/FogOfWarScene';
import HudScene from './scenes/HudScene';

export default class Game extends Phaser.Game {
  constructor() {
    super({
      scene: [MainScene, HudScene],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      }
    });
  }
}

window.game = new Game();
