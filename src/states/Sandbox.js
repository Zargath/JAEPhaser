import Phaser from 'phaser';
import BaseState from './BaseState';
import Square from '../ui/primitives/Square';
import JAEText from '../ui/JAEText';
import Triangle from '../ui/primitives/Triangle';
// import GameKeyboard from '../Inputs/GameKeyboard';

export default class Sandbox extends BaseState {
  constructor() {
    super();
    this.setStateName('Sandbox');
  }

  create() {
    this.square = new Square(10, 10, 100, this);
    this.triangle = new Triangle(this, 100, 100, 10, 10, 15, 5, 5, 5);
    this.text = new JAEText(50, 50, 'My Text', { font: '96px Courier', fill: '#fff' }, this);
    this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.draw();
  }

  draw() {
    this.square.draw();
    //this.triangle.draw();
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
