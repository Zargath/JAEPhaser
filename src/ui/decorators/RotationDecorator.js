export default class RotationDecorator {
  constructor(gameObject, rotationSpeed) {
    this.gameObject = gameObject;
    this.rotationSpeed = rotationSpeed;
  }

  update() {
    this.gameObject.update();
    this.gameObject.rotation += this.rotationSpeed;
  }
}
