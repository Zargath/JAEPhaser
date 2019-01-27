import TiledMapHelper from './TiledMapHelper';

export default class MapLoaderHelper {
  constructor(config) {
    this.scene = config.scene;
    this.key = config.key;
    this.tileWidth = config.tileWidth;
    this.tileHeight = config.tileHeight;
    this.tileset = config.tileSet;
  }

  loadMap() {
    const map = this.scene.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });

    this.tileset = map.addTilesetImage('basic', 'basic-tiles');

    // const worldLayer = this.map.createStaticLayer('Walkable', tileset, 0, 0);
    // worldLayer.setCollisionByProperty({ collides: true });

    /*
    this.objects = TiledMapHelper.createFromObjects(this, 'Objects', 'Ball', MovableObject, {
      scene: this,
      texture: 'ball',
      player: this.player,
    });
    */

    const tileLayers = map.layers;
    const objectLayers = map.objects;

    const tileMapLayers = [];

    for (let i = 0; i < tileLayers.length; i++) {
      const layer = tileLayers[i];
      const mapLayer = map.createStaticLayer(layer.name, this.tileset, 0, 0);
      mapLayer.setCollisionByProperty({ collides: true });
      tileMapLayers.push(mapLayer);
    }

    const objectDictionary = {};

    for (let i = 0; i < objectLayers.length; i++) {
      const objectLayer = objectLayers[i];
      for (let k = 0; k < objectLayer.objects.length; k++) {
        const object = objectLayer.objects[k];

        if (!(object.name in objectDictionary)) {
          objectDictionary[object.name] = {
            Layer: objectLayer.name,
            Type: object.type,
            Name: object.name,
            Constructor: object.properties[1].value,
            Texture: object.properties[2].value,
            CollidesWithTerrain: object.properties[0].value,
          };
        }
      }
    }

    /*
    * MAJOR HACK MUST BE REWRITTEN
    */
    const playerObject = objectDictionary.Player;
    const player = TiledMapHelper.createFromObjects(
      this.scene,
      map,
      playerObject.Layer,
      playerObject.Name,
      playerObject.Constructor,
      {
        scene: this.scene,
        map,
        texture: playerObject.Texture,
      }
    )[0];

    for (let i = 0; i < tileMapLayers.length; i++) {
      this.scene.physics.add.collider(player, tileMapLayers[i]);
    }

    player.addToScene();
    this.scene.gameObjectManager.add('player', player);

    Object.keys(objectDictionary).forEach((key) => {
      const objectFromTiled = objectDictionary[key];

      if (key !== 'Player') {
        const objects = TiledMapHelper.createFromObjects(
          this.scene,
          map,
          objectFromTiled.Layer,
          objectFromTiled.Name,
          objectFromTiled.Constructor,
          {
            scene: this.scene,
            map,
            texture: objectFromTiled.Texture,
            player,
            collidesWithTerrain: objectFromTiled.CollidesWithTerrain,
          }
        );

        for (let i = 0; i < objects.length; i++) {
          const object = objects[i];
          if (object.collidesWithTerrain) {
            for (let k = 0; k < tileMapLayers.length; k++) {
              this.scene.physics.add.collider(object, tileMapLayers[k]);
            }
          }
          object.addToScene();
          this.scene.gameObjectManager.add(`${object.name}-${i}`, object);
        }
      }
    });
  }
}
