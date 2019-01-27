import Phaser from 'phaser';
import BaseScene from './BaseScene';
import Player from '../ui/Player';
import { demoMapJoel, demoMapBig } from '../maps';
import MovableObject from '../ui/movableObject';
import Mediator from '../mediator';
import TiledMapHelper from '../Helpers/TiledMapHelper';
import GameObjectManager from '../Managers/GameObjectManager';
import Trap from '../ui/trap';
import JAEText from '../ui/JAEText';
import GameEndTrigger from '../ui/gameEndTrigger';
import GameEndScene from './GameEndScene';

export default class MainScene extends BaseScene {
  constructor() {
    super({ key: 'MainScene', active: true });
    this.gameObjectManager = new GameObjectManager();
  }

  preload() {
    console.log('preload: MainScene');
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
    //this.load.tilemapTiledJSON('map', demoMapBig);
    this.load.image('snow-tiles', 'assets/snow_tileset.jpg');
    this.load.image('alpha-tiles', 'assets/TextureSheet.png');
    this.load.image('basic-tiles', 'assets/basic.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.image('poison', 'assets/poison-512.png');
    this.load.image('trigger-box', 'assets/triggerBox.png');
  }

  create() {
    console.log('create: MainScene');
    this.isGameEnded = false;

    this.map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
    const tileset = this.map.addTilesetImage('basic', 'basic-tiles');
    const tilesetAlpha = this.map.addTilesetImage('TerrainAlpha', 'alpha-tiles');
    const backgroundLayer = this.map.createStaticLayer('Background', tileset, 0, 0);
    const worldLayer = this.map.createStaticLayer('AlphaTerrain', tilesetAlpha, 0, 0);
    //const worldLayer = this.map.createStaticLayer('Walkable', tileset, 0, 0);
    const backgroundWorldLayer = this.map.createStaticLayer('Walkable', tileset, 0, 0);
    worldLayer.setCollisionByProperty({ collides: true });

    this.playerObjects = TiledMapHelper.createFromObjects(this, 'Objects', 'Player', Player, {
      scene: this,
      texture: 'player',
    });

    this.player = this.playerObjects[0];
    this.physics.add.collider(this.player, worldLayer);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.game.canvas.height, false);
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

    this.gameEndTriggerObjects = TiledMapHelper.createFromObjects(this, 'Objects', 'GameEndTrigger', GameEndTrigger, {
      scene: this,
      player: this.player,
    });

    for (let i = 0; i < this.objects.length; i++) {
      this.physics.add.collider(this.objects[i], worldLayer);
    }

    for (let i = 0; i < this.objects.length; i++) {
      for (let t = 0; t < this.trapObjects.length; t++) {
        this.physics.add.collider(this.objects[i], this.trapObjects[t]);
      }
    }

    this.physics.world.bounds.width = worldLayer.width;
    this.physics.world.bounds.height = worldLayer.height;

    Mediator.instance.eventEmitter.on('onPlayerDied', player => this.onPlayerDied(player, this));
    Mediator.instance.eventEmitter.on('onPlayerEndGameTriggered', player => this.onPlayerEndGameTriggered(player, this));

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
    for (let i = 0; i < this.gameEndTriggerObjects.length; i++) {
      const object = this.gameEndTriggerObjects[i];
      this.gameObjectManager.add(`game-end-trigger-${i}`, object);
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

  onPlayerEndGameTriggered(player, scene) {
    console.log(`game end ${this.isGameEndeding}`);
    if (!this.isGameEndeding) {
      this.isGameEndeding = true;
      
      scene.cameras.main.once('camerafadeoutcomplete', (camera) => {
        //scene.scene.start('GameEndScene');
      }, scene);

      scene.cameras.main.fadeOut(500);
    }
  }

  update() {
      this.player.update();

      const camera = this.cameras.main;
      if (camera.scrollX - camera._bounds.x >= 96) {
        this.cameras.main.setBounds(this.cameras.main.scrollX, 0, this.map.widthInPixels - this.cameras.main.scrollX, this.game.canvas.height, false);
      }
  }
}
