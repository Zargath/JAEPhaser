import Phaser from 'phaser';

export default class GameKeyboard {
  constructor(game) {
    this.game = game;
    this.keyDictionary = {};
    this.keyDictionary.A = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyDictionary.B = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    this.keyDictionary.C = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    this.keyDictionary.D = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyDictionary.E = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.keyDictionary.F = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    this.keyDictionary.G = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
    this.keyDictionary.H = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    this.keyDictionary.I = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    this.keyDictionary.J = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    this.keyDictionary.K = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    this.keyDictionary.L = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    this.keyDictionary.M = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    this.keyDictionary.N = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
    this.keyDictionary.O = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    this.keyDictionary.P = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.keyDictionary.Q = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.keyDictionary.R = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.keyDictionary.S = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyDictionary.T = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    this.keyDictionary.U = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
    this.keyDictionary.V = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
    this.keyDictionary.W = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyDictionary.X = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    this.keyDictionary.Y = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
    this.keyDictionary.Z = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.keyDictionary.Space = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.keyDictionary.Zero = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);
    this.keyDictionary.One = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.keyDictionary.Two = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.keyDictionary.Three = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    this.keyDictionary.Four = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
    this.keyDictionary.Five = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
    this.keyDictionary.Six = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX);
    this.keyDictionary.Seven = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN);
    this.keyDictionary.Eight = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT);
    this.keyDictionary.Nine = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE);
    this.keyDictionary.Left = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyDictionary.Right = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keyDictionary.Up = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDictionary.Down = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  }

  create() {

  }

  /*eslint-disable */
  update() {
    for (var key in this.keyDictionary) {
      // check if the property/key is defined in the object itself, not in parent
      if (this.keyDictionary.hasOwnProperty(key)) {
        if(this.keyDictionary[key].isDown)
          console.log(key);
      }
    }
  }
  /* eslint-enable */
}
