import Phaser from 'phaser';
import BaseScene from './BaseScene';
import Player from '../ui/Player';
import { testMap } from '../maps';

export default class MainScene extends BaseScene {
  constructor() {
    super({ key: 'MainScene', active: true });
  }

  preload() {
    this.load.tilemapTiledJSON('map', testMap);
    this.load.image('snow-tiles', 'assets/snow_tileset.jpg');
    this.load.image('player', 'assets/player.png');
  }

  create() {
    const map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
    const tileset = map.addTilesetImage('test', 'snow-tiles');
    const worldLayer = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
    worldLayer.setCollisionByProperty({ collides: true });

    this.player = new Player(this, 96 + 16, 64 + 16);
    this.physics.add.collider(this.player, worldLayer);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.player.addToScene();
  }

  update() {
    this.player.update();
  }
}
