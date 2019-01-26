import Phaser from 'phaser';
import BaseState from './BaseState';
import Map from '../utils/Map';
// import GameKeyboard from '../Inputs/GameKeyboard';

export default class MainScene extends BaseState {
  constructor() {
    super();
    this.setStateName('MainScene');
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
