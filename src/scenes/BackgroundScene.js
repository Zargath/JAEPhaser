import BaseScene from './BaseScene';
// import GameKeyboard from '../Inputs/GameKeyboard';

export default class BackgroundScene extends BaseScene {
  constructor() {
    super({ key: 'BackgroundScene', active: true });
  }

  create() {
    this.cameras.main.setBackgroundColor('rgba(100, 67, 45, 1)');
  }
}
