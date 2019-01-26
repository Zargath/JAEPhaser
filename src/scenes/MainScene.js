import Phaser from 'phaser';
import BaseScene from './BaseScene';
import Player from '../ui/Player';
import { demoMap } from '../maps';
import MovableObject from '../ui/movableObject';
import Mediator from '../mediator';

export default class MainScene extends BaseScene {
  constructor() {
    super({ key: 'MainScene', active: true });
  }

  preload() {
    this.load.tilemapTiledJSON('map', demoMap);
    this.load.image('snow-tiles', 'assets/snow_tileset.jpg');
    this.load.image('basic-tiles', 'assets/basic.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('ball', 'assets/ball.png');
  }

  create() {
    const map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
    const tileset = map.addTilesetImage('basic', 'basic-tiles');
    const backgroundLayer = map.createStaticLayer('Background', tileset, 0, 0);
    const worldLayer = map.createStaticLayer('Walkable', tileset, 0, 0);
    worldLayer.setCollisionByProperty({ collides: true });

    this.player = new Player(this, 96 + 16, 64 + 16);
    this.physics.add.collider(this.player, worldLayer);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.ball = new MovableObject(this, 160 + 16, 64 + 16, 'ball', this.player);
    this.physics.add.collider(this.ball, worldLayer);
    
    this.physics.world.bounds.width = worldLayer.width;
    this.physics.world.bounds.height = worldLayer.height;

    Mediator.instance.eventEmitter.on('onPlayerDied', (player) => this.onPlayerDied(player, this));

    this.player.addToScene();
    this.ball.addToScene();
  }

  onPlayerDied(player, scene){
    scene.scene.restart();
  }

  update() {
    this.player.update();
  }
}
