import Phaser from 'phaser';
import Sandbox from './states/Sandbox';
import MainScene from './states/MainScene';
import BackgroundScene from './states/BackgroundScene';
import FogOfWarScene from './states/FogOfWarScene';

export default class Game extends Phaser.Game {
  constructor() {
    super(800, 600, Phaser.AUTO, '', null, false, false, {
      arcade: true,
      matter: false,
      p2: false,
      ninja: false
    });


    this.scene.add('backgroundscene', BackgroundScene);
    this.scene.add('fogofwarscene', FogOfWarScene);
    this.scene.add('mainscene', MainScene);
    this.scene.add('sandbox', Sandbox);

    this.scene.start('sandbox');
    this.scene.start('mainscene');
    this.scene.start('backgroundscene');
    this.scene.start('fogofwarscene');
  }
}

window.game = new Game();
