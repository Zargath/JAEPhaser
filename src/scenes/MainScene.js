import BaseScene from './BaseScene';
import Map from '../utils/Map';
import Player from '../ui/Player';
// import GameKeyboard from '../Inputs/GameKeyboard';

export default class MainScene extends BaseScene {
  constructor() {
    super({ key: 'MainScene', active: true });
  }

  preload() {
    this.load.image('mario-tiles', 'assets/sample_tileset.png');
    this.load.image('player', 'assets/player.png');
  }

  create() {
    const myMap = new Map();
    const level = myMap.getMap();

    this.cameras.main.setViewport(120, 100, 400, 400);

    const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 });
    const tiles = map.addTilesetImage('mario-tiles');
    const layer = map.createStaticLayer(0, tiles, 0, 0);

    this.player = new Player(this, 100, 100);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
  }

  update() {
    super.update();
    this.player.update();
  }
}
