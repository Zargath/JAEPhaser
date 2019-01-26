import BaseScene from './BaseScene';
import JAEText from '../ui/JAEText';

export default class HudScene extends BaseScene {
  constructor() {
    super({ key: 'HudScene', active: true });
  }

  create() {
    const text = new JAEText(20, 20, 'hello world', { fontSize: '24px', fontFamily: 'Arial', color: '#fff' }, this);
    this.elapsedTime = new JAEText(20, 40, 'Option 2', { fontSize: '24px', fontFamily: 'Arial', color: '#fff' }, this);
    this.elapsedTime = new JAEText(20, 60, 'Option 3', { fontSize: '24px', fontFamily: 'Arial', color: '#fff' }, this);
    this.elapsedTime = new JAEText(20, 80, 'Option 4', { fontSize: '24px', fontFamily: 'Arial', color: '#fff' }, this);
    this.elapsedTime = new JAEText(20, 100, 'Option 5', { fontSize: '24px', fontFamily: 'Arial', color: '#fff' }, this);
    this.elapsedTime = new JAEText(20, 120, 'Option 6', { fontSize: '24px', fontFamily: 'Arial', color: '#fff' }, this);
  }
}
