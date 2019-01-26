import BaseState from './BaseState';
// import GameKeyboard from '../Inputs/GameKeyboard';

export default class FogOfWarScene extends BaseState {
  constructor() {
    super({ key: 'FogOfWarScene', active: true });
  }

  create() {
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.6)');
  }
}
