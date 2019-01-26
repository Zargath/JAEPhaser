import Phaser from 'phaser';
import Sandbox from './scenes/Sandbox';
import MainScene from './scenes/MainScene';
import BackgroundScene from './scenes/BackgroundScene';
import FogOfWarScene from './scenes/FogOfWarScene';

export default class Game extends Phaser.Game {
  constructor() {
    super(
      {
        scene: [BackgroundScene, FogOfWarScene, MainScene, Sandbox]
      },
      {
        arcade: true,
        matter: false,
        p2: false,
        ninja: false
      }
    );
  }
}

window.game = new Game();
