import BaseScene from './BaseScene';
import Player from '../ui/Player';
// import GameKeyboard from '../Inputs/GameKeyboard';

export default class MainScene extends BaseScene {
  constructor() {
    super({ key: 'MainScene', active: true });
  }

  preload() {
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    this.load.image('mario-tiles', 'assets/sample_tileset.png');
    this.load.image('player', 'assets/player.png');
  }

  create() {
    this.cameras.main.setViewport(120, 100, 600, 400);

    const map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });
    const tileset = map.addTilesetImage('sample_tileset', 'mario-tiles');
    map.createStaticLayer('first', tileset, 0, 0);

    this.player = new Player(this, 100, 100);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
  }

  update() {
    super.update();
    this.player.update();
  }
}
