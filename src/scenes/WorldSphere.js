import BaseScene from './BaseScene';
import Arc from '../ui/primitives/Arc';
import RotationDecorator from '../ui/decorators/RotationDecorator';
import GameObjectManager from '../Managers/GameObjectManager';

export default class WorldSphere extends BaseScene {
  constructor() {
    super({ key: 'WorldSphere', active: true });
    this.gameObjectManager = new GameObjectManager(this);
  }

  create() {
    this.arc = new Arc(this, 500, 1200, 800, 0, 180, true, 0xff0000, 1);
    this.rotationDecorator = new RotationDecorator(this.arc, 0.01);
    this.gameObjectManager.add('arc', this.arc);
  }

  update() {
    this.rotationDecorator.update();
  }
}
