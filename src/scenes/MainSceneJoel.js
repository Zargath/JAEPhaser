import Phaser from 'phaser';
import BaseScene from './BaseScene';
import Player from '../ui/Player';
import { demoMapJoel } from '../maps';
import MovableObject from '../ui/movableObject';
import Mediator from '../mediator';
import TiledMapHelper from '../Helpers/TiledMapHelper';
import GameObjectManager from '../Managers/GameObjectManager';
import Trap from '../ui/trap';

export default class MainSceneJoel extends BaseScene {
  constructor() {
    super({ key: 'MainSceneJoel', active: true });
    this.gameObjectManager = new GameObjectManager();
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

    this.load.tilemapTiledJSON('map', demoMapJoel);
    this.load.image('snow-tiles', 'assets/snow_tileset.jpg');
    this.load.image('alpha-tiles', 'assets/TextureSheet.png');
    this.load.image('basic-tiles', 'assets/basic.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.image('poison', 'assets/poison-512.png');
  }

  create() {
    const map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
    const tileset = map.addTilesetImage('basic', 'basic-tiles');
    const tilesetAlpha = map.addTilesetImage('TerrainAlpha', 'alpha-tiles');
    const backgroundLayer = map.createStaticLayer('Background', tileset, 0, 0);
    const worldLayer = map.createStaticLayer('AlphaTerrain', tilesetAlpha, 0, 0);
    const backgroundWorldLayer = map.createStaticLayer('Walkable', tileset, 0, 0);
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

    const camera = this.cameras.main;
    if (camera.scrollX - camera._bounds.x >= 96) {
      this.cameras.main.setBounds(this.cameras.main.scrollX, 60, this.map.widthInPixels - this.cameras.main.scrollX, this.game.canvas.height, false);
    }
  }
}
