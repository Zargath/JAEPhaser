import Phaser from 'phaser';
import BaseState from './BaseState';
import Map from '../utils/Map';
// import GameKeyboard from '../Inputs/GameKeyboard';

export default class FogOfWarScene extends BaseState {
  constructor() {
    super();
    this.setStateName('BackgroundScene');
  }

  create() {
    const myMap = new Map();
    const level = myMap.getMap();

    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.6)');
  }
}
