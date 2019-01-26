import Phaser from 'phaser';
import BaseState from './BaseState';
import Square from '../ui/primitives/Square';
import JAEText from '../ui/JAEText';
// import GameKeyboard from '../Inputs/GameKeyboard';

export default class Sandbox extends BaseState {
  constructor() {
    super();
    this.setStateName('Sandbox');
  }

  create() {
    this.square = new Square(10, 10, 100, this);
    this.text = new JAEText(50, 50, 'My Text', { font: '96px Courier', fill: '#fff' }, this);
    this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.draw();
  }

  draw() {
    this.square.draw();
    this.text.draw();
  }


  update() {
    super.update();
    if (this.rightKey.isDown) {
      this.square.update();
    }
    this.square.draw();
  }
}
