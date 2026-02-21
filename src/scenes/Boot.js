//Boot.js Prefab

class Boot extends Phaser.Scene {
  constructor() {
    super('boot');
  }

  preload() {
    // Just a simple text for now
    this.width = this.scale.width;
    this.height = this.scale.height;
  }

  create() {
    this.add.text(this.width / 2, this.height / 2, 'LOADING...', {
      fontSize: '32px',
      fill: '#fff',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    // Go to preloader 
    this.scene.start('preloader');
  }
}