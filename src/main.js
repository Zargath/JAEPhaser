import Phaser from 'phaser';
import MainScene from './scenes/MainScene';
import HudScene from './scenes/HudScene';
import GameEndScene from './scenes/GameEndScene';

export default class Game extends Phaser.Game {
  constructor() {
    super({
      scene: [MainScene],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      }
    });

    this.scene.add('GameEndScene', GameEndScene, false);
  }
}

window.game = new Game();
