export default class GameObjectManager {
  constructor(scene) {
    this.scene = scene;
    this.gameObjects = {};
  }

  add(key, gameObject) {
    if (key in this.gameObjects) {
      return;
    }
    this.gameObjects[key] = gameObject;
  }

  remove(key) {
    if (key in this.gameObjects) {
      // this.gameObjects[key].dispose(); for later implentation for the API
      delete this.gameObjects[key];
    }
  }

  get(key) {
    if (key in this.gameObjects) {
      return this.gameObjects[key];
    }
  }

  resetObjects() {
    Object.keys(this.gameObjects).forEach((key) => {
      this.gameObjects[key].reset();
    });
  }

  update() {
    Object.keys(this.gameObjects).forEach((key) => {
      this.gameObjects[key].update();
    });
  }
}
