import BaseScene from './BaseScene';
// import GameKeyboard from '../Inputs/GameKeyboard';

export default class FogOfWarScene extends BaseScene {
  constructor() {
    super({ key: 'FogOfWarScene', active: true });
  }

  create() {
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.6)');
  }
}
