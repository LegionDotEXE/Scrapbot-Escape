//Boot.js Prefab

class Boot extends Phaser.Scene {
  constructor() {
    super('bootScene');
  }

  preload() {
    // load any assets needed for preloader
    this.load.image('logo', './assets/logo.png');
  }

  create() {
    this.scene.start('preloaderScene');
  }
}