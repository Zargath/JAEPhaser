import Phaser from 'phaser';
import Trigger from './trigger';
import Mediator from '../mediator';

export default class GameEndTrigger extends Trigger {
  constructor(config) {
    // config: Scene, x, and y
    super({
      ...config,
      triggerer: config.player,
      triggerCallback: () => {
        Mediator.instance.eventEmitter.emitSync('onPlayerEndGameTriggered', config.player);
      }
    });
  }
}
