import Phaser from 'phaser';
import BaseClassConstructedError from '../Errors/BaseClassConstructedError';

export default class BaseScene extends Phaser.Scene {
  constructor(config) {
    super(config);
    if (this.constructor === BaseScene) {
      throw new BaseClassConstructedError();
    }
  }
}
