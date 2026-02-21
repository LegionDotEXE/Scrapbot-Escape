// TitleScene.js Prefab 

class TitleScene extends Phaser.Scene {
  constructor() {
    super('title');
  }

  create() {
    this.width = this.scale.width;
    this.height = this.scale.height;

    // Background effect
    this.add.tileSprite(this.width/2, this.height/2, this.width, this.height, 'bg_junkyard');

    // Title Text
    this.add.text(this.width / 2, 150, 'SCRAPBOT ESCAPE', {
      fontSize: '64px',
      fill: '#ff9900',
      fontFamily: 'monospace',
      stroke: '#000',
      strokeThickness: 6
    }).setOrigin(0.5);

    // Instructions
    this.add.text(this.width / 2, 300, 'Instructions:', {
      fontSize: '24px',
      fill: '#fff',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    this.add.text(this.width / 2, 340, 'SPACE or UP Arrow to Jump', {
      fontSize: '18px',
      fill: '#ccc',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    this.add.text(this.width / 2, 370, 'Collect Batteries. Avoid Junk.', {
      fontSize: '18px',
      fill: '#ccc',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    // Start Button 
    const startText = this.add.text(this.width / 2, 500, 'PRESS SPACE TO START', {
      fontSize: '32px',
      fill: '#fff',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    // Blink effect
    this.tweens.add({
      targets: startText,
      alpha: 0.5,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    // Input
    this.input.keyboard.once('keydown-SPACE', () => {
      this.sound.play('ui_click');
      this.scene.start('game');
    });
    
    // Functionality for Enter key as well
    this.input.keyboard.once('keydown-ENTER', () => {
      this.sound.play('ui_click');
      this.scene.start('game');
    });
  }
}