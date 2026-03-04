// TitleScene.js Prefab 

class TitleScene extends Phaser.Scene {
  constructor() {
    super('title');
  }

  create() {
    this.width = this.scale.width;
    this.height = this.scale.height;


    const gradient = this.add.graphics();
    gradient.fillGradientStyle(0x000000, 0x000000, 0x000000, 0x000000, 0.8);
    gradient.fillRect(0, 0, this.width, this.height);

    this.add.tileSprite(this.width/2, this.height/2, this.width, this.height, 'bg_junkyard').setAlpha(0.6);

    const titleBox = this.add.rectangle(this.width / 2, 180, 500, 140, 0x000000, 0.8);
    titleBox.setStrokeStyle(4, 0xff9900); 
    
    // Animate the border pulse
    this.tweens.add({
      targets: titleBox,
      strokeColor: 0xffcc00, 
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Title Text
    this.add.text(this.width / 2, 180, 'SCRAPBOT\nESCAPE', {
      fontSize: '56px',
      fill: '#ffffff',
      fontFamily: 'monospace',
      align: 'center',
      stroke: '#ff9900',
      strokeThickness: 4
    }).setOrigin(0.5).setShadow(2, 2, '#000000', 4);

    // Instructions Box
    const instrBox = this.add.rectangle(this.width / 2, 340, 400, 100, 0x222222, 0.9);
    instrBox.setStrokeStyle(2, 0x555555);

    this.add.text(this.width / 2, 310, 'INSTRUCTIONS', {
      fontSize: '20px',
      fill: '#ff9900',
      fontFamily: 'monospace',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(this.width / 2, 340, 'SPACE or UP Arrow to Jump\nCollect Batteries. Avoid Junk.', {
      fontSize: '16px',
      fill: '#cccccc',
      fontFamily: 'monospace',
      align: 'center',
      lineHeight: 24
    }).setOrigin(0.5);

    // Start Button with Glow
    const startText = this.add.text(this.width / 2, 500, '[ PRESS SPACE TO START ]', {
      fontSize: '28px',
      fill: '#00ff00',
      fontFamily: 'monospace',
      backgroundColor: '#003300',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5);

    // Blink effect
    this.tweens.add({
      targets: startText,
      alpha: 0.6,
      scale: 1.05,
      duration: 1000,
      yoyo: true,
      repeat: -1
    });

    // Input
    this.input.keyboard.once('keydown-SPACE', () => {
      this.sound.play('ui_click');
      this.scene.start('game');
    });
    
    this.input.keyboard.once('keydown-ENTER', () => {
      this.sound.play('ui_click');
      this.scene.start('game');
    });
  }
}