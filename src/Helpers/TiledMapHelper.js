export default class TiledMapHelper {
  /**
    * @desc creates objects from a given TiledMap provided to the scene.
    * @param Phaser.Scene $scene - The scene to create the objects to
    * @param string $name - The layer name from Tiled
    * @param string $id - The gid from Tiled
    * @param Object $customClass - The custom class to create the objects for.
    * @param Object $spriteConfiguration - The specific configurations for the customClass.
    * @return Phaser.Sprite[] - An array with the created sprites.
  */
  static createFromObjects(scene, name, id, customClass, spriteConfiguration) {
    let spriteConfig = spriteConfiguration;
    if (spriteConfig === undefined) spriteConfig = {};

    const objectLayer = scene.map.getObjectLayer(name);
    if (!objectLayer) {
      console.warn(`Cannot create from object. Invalid objectgroup name given: ${name}`);
      return null;
    }

    const objects = objectLayer.objects;
    const sprites = [];

    for (let i = 0; i < objects.length; i++) {
      let found = false;
      const obj = objects[i];

      if ((obj.gid !== undefined && typeof id === 'number' && obj.gid === id) ||
        (obj.id !== undefined && typeof id === 'number' && obj.id === id) ||
        (obj.name !== undefined && typeof id === 'string' && obj.name === id)) {
        found = true;
      }

      if (found) {
        const config = Object.assign(spriteConfig, obj.properties);

        config.x = obj.x;
        config.y = obj.y;

        let sprite;
        if (customClass !== undefined) {
          sprite = new customClass(config);
        } else {
          sprite = scene.make.sprite(config);
        }

        sprite.name = obj.name;

        if (obj.width) { sprite.displayWidth = obj.width; }
        if (obj.height) { sprite.displayHeight = obj.height; }

        // Origin is (0, 1) in Tiled, so find the offset that matches the Sprite's origin.
        const offset = {
          x: sprite.originX * sprite.displayWidth,
          y: (sprite.originY - 1) * sprite.displayHeight
        };

        // If the object is rotated, then the origin offset also needs to be rotated.
        if (obj.rotation) {
          const angle = DegToRad(obj.rotation);
          Rotate(offset, angle);
          sprite.rotation = angle;
        }

        if (obj.flippedHorizontal !== undefined || obj.flippedVertical !== undefined) {
          sprite.setFlip(obj.flippedHorizontal, obj.flippedVertical);
        }

        if (!obj.visible) { sprite.visible = false; }

        sprites.push(sprite);
      }
    }

    return sprites;
  }
}
