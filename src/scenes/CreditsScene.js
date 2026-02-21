// CreditsScene.js Prefab 

class CreditsScene extends Phaser.Scene {
  constructor() {
    super('credits');
  }

  create() {
    this.width = this.scale.width;
    this.height = this.scale.height;

    this.add.text(this.width / 2, 50, 'CREDITS', {
      fontSize: '48px',
      fill: '#fff',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    let yPos = 150;
    const style = { fontSize: '20px', fill: '#ccc', fontFamily: 'monospace', align: 'center' };

    this.add.text(this.width / 2, yPos, 'Game Design & Code', style).setOrigin(0.5);
    this.add.text(this.width / 2, yPos + 30, '[Your Name Here]', { ...style, fill: '#fff' }).setOrigin(0.5);

    yPos += 80;
    this.add.text(this.width / 2, yPos, 'Assets Sources', style).setOrigin(0.5);
    this.add.text(this.width / 2, yPos + 30, 'Robot Sprite: Self-made in Piskel', { ...style, fontSize: '16px' }).setOrigin(0.5);
    this.add.text(this.width / 2, yPos + 55, 'Junk/Battery: Kenney.nl Prototype Pack', { ...style, fontSize: '16px' }).setOrigin(0.5);
    this.add.text(this.width / 2, yPos + 80, 'Background: Self-made Pixel Art', { ...style, fontSize: '16px' }).setOrigin(0.5);

    yPos += 80;
    this.add.text(this.width / 2, yPos, 'Audio Sources', style).setOrigin(0.5);
    this.add.text(this.width / 2, yPos + 30, 'Music: "Industrial Loop" - OpenGameArt', { ...style, fontSize: '16px' }).setOrigin(0.5);
    this.add.text(this.width / 2, yPos + 55, 'SFX: Kenney.nl Digital Audio', { ...style, fontSize: '16px' }).setOrigin(0.5);

    yPos += 80;
    this.add.text(this.width / 2, yPos, 'Press SPACE to Return to Menu', {
      fontSize: '24px',
      fill: '#ff9900',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('title');
    });
  }
}