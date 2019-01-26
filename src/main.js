import Phaser from 'phaser';
import Sandbox from './states/Sandbox';
import MainScene from './states/MainScene';
import BackgroundScene from './states/BackgroundScene';
import FogOfWarScene from './states/FogOfWarScene';

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
