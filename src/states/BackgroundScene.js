import Phaser from 'phaser';
import BaseState from './BaseState';
import Map from '../utils/Map';
// import GameKeyboard from '../Inputs/GameKeyboard';

export default class BackgroundScene extends BaseState {
  constructor() {
    super();
    this.setStateName('BackgroundScene');
  }

  create() {
    const myMap = new Map();
    const level = myMap.getMap();

    this.cameras.main.setBackgroundColor('rgba(100, 67, 45, 1)');
  }
}
