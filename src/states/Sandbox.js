import BaseState from './BaseState';
import Square from '../ui/primitives/Square';
import Text from '../ui/Text';
import GameKeyboard from '../Inputs/GameKeyboard';

export default class Sandbox extends BaseState {
  constructor() {
    super();
    this.setStateName('Sandbox');
  }

  create() {
    const square = new Square(10, 10, 200, this);
    const text = new Text(120, 110, 'My Text', { font: '96px Courier', fill: '#fff' }, this);
    this.gameKeyboard = new GameKeyboard(this.game);
    console.debug('create scene');
    square.draw();
    text.draw();
  }

  update() {
    super.update();
  }
}
