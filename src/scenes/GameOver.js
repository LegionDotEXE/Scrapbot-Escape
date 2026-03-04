// GameOver.js Prefab
class GameOver extends Phaser.Scene {
  constructor() {
    super('gameover');
  }

  init(data) {
    this.finalScore = data.score || 0;
  }

  create() {
    this.width = this.scale.width;
    this.height = this.scale.height;

    this.add.tileSprite(this.width/2, this.height/2, this.width, this.height, 'bg_junkyard');
    
    const darkOverlay = this.add.graphics();
    darkOverlay.fillStyle(0x000000, 0.6);
    darkOverlay.fillRect(0, 0, this.width, this.height);

  // Game over box setup with animation
    const boxWidth = 500;
    const boxHeight = 280;
    const boxX = this.width / 2;
    const boxY = this.height / 2;

    const overBox = this.add.rectangle(boxX, boxY, boxWidth, boxHeight, 0x1a0505, 0.9);
    // Red Border
    overBox.setStrokeStyle(6, 0xff0000);
    
    this.add.rectangle(boxX, boxY, boxWidth - 20, boxHeight - 20, 0x000000, 0.5).setStrokeStyle(2, 0x550000);

    // "GAME OVER" Text with Glitch Effect setup
    const gameOverText = this.add.text(boxX, boxY - 60, 'GAME OVER', {
      fontSize: '48px',
      fill: '#ff0000',
      fontFamily: 'monospace',
      fontStyle: 'bold',
      stroke: '#ffffff',
      strokeThickness: 2
    }).setOrigin(0.5);

    // Glitch animation -- added recently after tweens implementation
    this.tweens.add({
      targets: [overBox, gameOverText],
      x: '+=4', 
      y: '+=4',
      duration: 60, 
      yoyo: true,
      repeat: -1,   
      ease: 'Linear' 
    });

    // Score Display inside the box
    this.add.text(boxX, boxY + 20, 'FINAL SCORE', {
      fontSize: '20px',
      fill: '#aaaaaa',
      fontFamily: 'monospace'
    }).setOrigin(0.5); 

    this.add.text(boxX, boxY + 60, this.finalScore.toString(), {
      fontSize: '64px',
      fill: '#ffffff',
      fontFamily: 'monospace',
      stroke: '#ff9900',
      strokeThickness: 4
    }).setOrigin(0.5);

    // Restart Button
    const restartText = this.add.text(boxX, boxY + 140, '> PRESS SPACE TO REBOOT <', {
      fontSize: '24px',
      fill: '#00ff00',
      fontFamily: 'monospace',
      backgroundColor: '#003300',
      padding: { x: 15, y: 8 }
    }).setOrigin(0.5);

    this.tweens.add({
      targets: restartText,
      alpha: 0.7,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    // Input
    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('game');
    });
  }
}