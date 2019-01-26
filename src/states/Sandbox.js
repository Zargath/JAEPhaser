import Phaser from 'phaser';
import BaseState from './BaseState';
import Square from '../ui/primitives/Square';
import JAEText from '../ui/JAEText';
import Player from '../ui/Player';
// import GameKeyboard from '../Inputs/GameKeyboard';

export default class Sandbox extends BaseState {
  constructor() {
    super();
  }

  create() {
    this.player = new Player(this, 100, 100);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
  }

  update() {
    super.update();
    this.player.update();
  }
}
