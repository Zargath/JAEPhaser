import Phaser from 'phaser';
import BaseState from './BaseState';
import Square from '../ui/primitives/Square';
import Tile from '../world/Tile';
import JAEText from '../ui/JAEText';
// import GameKeyboard from '../Inputs/GameKeyboard';

export default class Sandbox extends BaseState {
  constructor() {
    super();
    this.setStateName('Sandbox');
  }

  preload() {
    this.load.image('mario-tiles', 'assets/sample_tileset.png');
    this.load.tilemapTiledJSON('map', 'assets/map.json');
  }

  create() {
    this.objectsToDraw = [];
    this.square = new Square(10, 10, 100, this);
    this.text = new JAEText(50, 50, 'My Text', { font: '96px Courier', fill: '#fff' }, this);
    this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    const level = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 2, 3, 0, 0, 0, 1, 2, 3, 0],
      [0, 5, 6, 7, 0, 0, 0, 5, 6, 7, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 14, 13, 14, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 14, 14, 14, 14, 14, 0, 0, 0, 15],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15],
      [35, 36, 37, 0, 0, 0, 0, 0, 15, 15, 15],
      [39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39]
    ];

    // this.objectsToDraw.push(this.square);
    // this.objectsToDraw.push(this.text);

    const map = this.make.tilemap({ data: 'map', tileWidth: 16, tileHeight: 16 });
    const tiles = map.addTilesetImage('mario-tiles');
    const layer = map.createStaticLayer(0, tiles, 0, 0);
  }

  draw() {
    for (let i = 0; i < this.objectsToDraw.length; i++) {
      this.objectsToDraw[i].draw();
    }
  }


  update() {
    super.update();
    if (this.rightKey.isDown) {
      this.square.update();
    }
    this.draw();
  }
}
