import Phaser from 'phaser';
import BaseScene from './BaseScene';
import Player from '../ui/Player';
import { demoMapBig } from '../maps';
import MovableObject from '../ui/movableObject';
import Mediator from '../mediator';
import TiledMapHelper from '../Helpers/TiledMapHelper';
import MapLoaderHelper from '../Helpers/MapLoaderHelper';
import GameObjectManager from '../Managers/GameObjectManager';
import Trap from '../ui/trap';

export default class MainScene extends BaseScene {
  constructor() {
    super({ key: 'MainScene', active: true });
  }

  preload() {
    const progress = this.add.graphics();
    const width = 400;
    const height = 20;
    const x = (this.game.canvas.width / 2) - width / 2;
    const y = (this.game.canvas.height / 2) - height / 2;

    this.load.on('progress', (value) => {
      progress.clear();
      progress.lineStyle(3, 0xFFFFFF, 1.0);
      progress.fillStyle(0xffffff, 1);
      progress.fillRect(x, y, width * value, height);
      progress.strokeRect(x, y, width, height);
    });

    this.load.on('complete', () => {
      progress.destroy();
    });

    this.load.tilemapTiledJSON('map', demoMapBig);
    this.load.image('snow-tiles', 'assets/snow_tileset.jpg');
    this.load.image('basic-tiles', 'assets/basic.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('ball', 'assets/box.png');
    this.load.image('poison', 'assets/poison.png');

    this.load.spritesheet(
      'player_spritsheet',
      'assets/player_real.png',
      { frameWidth: 32, frameHeight: 32 }
    );

    this.classDictionary = { Player, MovableObject, Trap, };
    this.gameObjectManager = new GameObjectManager();
  }

  create() {
    this.createMap();
    // this.createAnimations();

    const player = this.gameObjectManager.get('player');
    Mediator.instance.eventEmitter.on('onPlayerDied', p => this.onPlayerDied(player, this));
  }

  onPlayerDied(player, scene) {
    scene.cameras.main.once('camerafadeoutcomplete', (camera) => {
      this.gameObjectManager.resetObjects();
      scene.cameras.main.fadeIn();
    }, scene);

    scene.cameras.main.fadeOut(500);
  }

  update() {
    this.gameObjectManager.update();
  }

  createAnimations() {
    this.anims.create({
      key: 'walk_up',
      frames: this.anims.generateFrameNumbers('player_spritsheet', { start: 0, end: 2 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_right',
      frames: this.anims.generateFrameNumbers('player_spritsheet', { start: 3, end: 5 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_down',
      frames: this.anims.generateFrameNumbers('player_spritsheet', { start: 6, end: 8 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_left',
      frames: this.anims.generateFrameNumbers('player_spritsheet', { start: 9, end: 11 }),
      frameRate: 6,
      repeat: -1
    });
  }

  createMap() {
    const mapLoaderHelper = new MapLoaderHelper({
      scene: this,
      key: 'map',
      tileWidth: 32,
      tileHeight: 32,
      tileset: 'basic',
    });

    mapLoaderHelper.loadMap();
  }
}
