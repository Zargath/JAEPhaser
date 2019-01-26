import Phaser from 'phaser';
import Sandbox from './scenes/Sandbox';
import MainScene from './scenes/MainScene';
import BackgroundScene from './scenes/BackgroundScene';
import FogOfWarScene from './scenes/FogOfWarScene';

export default class Game extends Phaser.Game {
  constructor() {
    super(
      {
        scene: [BackgroundScene, FogOfWarScene, MainScene, Sandbox],
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 300 },
            debug: true
          }
        }
      }
    );
  }
}

window.game = new Game();
