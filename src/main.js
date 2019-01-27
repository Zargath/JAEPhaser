import Phaser from 'phaser';
import MainSceneJoel from './scenes/MainSceneJoel';
// import MainScene from './scenes/MainScene';
import HudScene from './scenes/HudScene';

export default class Game extends Phaser.Game {
  constructor() {
    super({
      scene: [MainSceneJoel, HudScene],
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
