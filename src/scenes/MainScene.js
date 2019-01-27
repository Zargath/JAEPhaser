import Phaser from 'phaser';
import BaseScene from './BaseScene';
import Player from '../ui/Player';
import { demoMapBig } from '../maps';
import MovableObject from '../ui/movableObject';
import Mediator from '../mediator';
import TiledMapHelper from '../Helpers/TiledMapHelper';
import GameObjectManager from '../Managers/GameObjectManager';
import Trap from '../ui/trap';

export default class MainScene extends BaseScene {
  constructor() {
    super({ key: 'MainScene', active: true });
    this.gameObjectManager = new GameObjectManager();
  }

  preload() {
    const progress = this.add.graphics();

    this.load.on('progress', (value) => {
      progress.clear();
      progress.fillStyle(0xffffff, 1);
      progress.fillRect(0, 270, 800 * value, 60);
    });

    this.load.on('complete', () => {
      progress.destroy();
    });

    this.load.tilemapTiledJSON('map', demoMapBig);
    this.load.image('snow-tiles', 'assets/snow_tileset.jpg');
    this.load.image('basic-tiles', 'assets/basic.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.image('poison', 'assets/poison-512.png');
  }

  create() {
    const map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
    const tileset = map.addTilesetImage('basic', 'basic-tiles');
    const backgroundLayer = map.createStaticLayer('Background', tileset, 0, 0);
    const worldLayer = map.createStaticLayer('Walkable', tileset, 0, 0);
    worldLayer.setCollisionByProperty({ collides: true });
    this.map = map;

    this.playerObjects = TiledMapHelper.createFromObjects(this, 'Objects', 'Player', Player, {
      scene: this,
      texture: 'player',
    });

    this.player = this.playerObjects[0];
    this.physics.add.collider(this.player, worldLayer);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.gameObjectManager.add('player', this.player);

    this.objects = TiledMapHelper.createFromObjects(this, 'Objects', 'Ball', MovableObject, {
      scene: this,
      texture: 'ball',
      player: this.player,
    });

    this.trapObjects = TiledMapHelper.createFromObjects(this, 'Objects', 'KillSwitch', Trap, {
      scene: this,
      texture: 'poison',
      player: this.player,
    });

    for (let i = 0; i < this.objects.length; i++) {
      this.physics.add.collider(this.objects[i], worldLayer);
    }

    this.physics.world.bounds.width = worldLayer.width;
    this.physics.world.bounds.height = worldLayer.height;

    Mediator.instance.eventEmitter.on('onPlayerDied', player => this.onPlayerDied(player, this));

    this.player.addToScene();
    for (let i = 0; i < this.objects.length; i++) {
      const object = this.objects[i];
      this.gameObjectManager.add(`ball-${i}`, object);
      object.addToScene();
    }
    for (let i = 0; i < this.trapObjects.length; i++) {
      const object = this.trapObjects[i];
      this.gameObjectManager.add(`trap-${i}`, object);
      object.addToScene();
    }
  }

  onPlayerDied(player, scene) {
    scene.cameras.main.once('camerafadeoutcomplete', (camera) => {
      this.gameObjectManager.resetObjects();
      scene.cameras.main.fadeIn(100);
    }, scene);

    scene.cameras.main.fadeOut(500);
  }

  update() {
    this.player.update();
  }
}
