class Menu extends Phaser.Scene {
  constructor() {
    super('menuScene');
  }

  preload() {
    // load menu-specific assets if needed
  }

  create() {
    let menuConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 0
    };

    // show menu text
    this.add.text(game.config.width / 2, game.config.height / 2 - 30, 'SCRAPEBOT ESCAPE', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width / 2, game.config.height / 2 + 30, 'Use ← → to Select', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width / 2, game.config.height / 2 + 90, 'Press (F) to Fire', menuConfig).setOrigin(0.5);

    // define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

    // sound effects
    this.soundSelect = this.sound.add('sfx-select');
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      // easy mode
      game.settings = {
        spaceshipSpeed: 2,
        gameTimer: 60000
      };
      this.soundSelect.play();
      this.scene.start('playScene');
    }
    if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
      // hard mode
      game.settings = {
        spaceshipSpeed: 4,
        gameTimer: 45000
      };
      this.soundSelect.play();
      this.scene.start('playScene');
    }
  }
}