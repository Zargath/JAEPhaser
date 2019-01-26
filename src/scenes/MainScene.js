import BaseScene from './BaseScene';
import Map from '../utils/Map';
// import GameKeyboard from '../Inputs/GameKeyboard';

export default class MainScene extends BaseScene {
  constructor() {
    super({ key: 'MainScene', active: true });
  }

  preload() {
    this.load.image('mario-tiles', 'assets/sample_tileset.png');
  }

  create() {
    const myMap = new Map();
    const level = myMap.getMap();

    this.cameras.main.setViewport(120, 100, 800, 400);
    this.cameras.main.setBackgroundColor('rgba(255, 0, 0, 0.5)');

    const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 });
    const tiles = map.addTilesetImage('mario-tiles');
    const layer = map.createStaticLayer(0, tiles, 0, 0);
  }
}
