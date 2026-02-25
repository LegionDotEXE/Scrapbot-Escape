// GameOver.js Prefab

class GameOver extends Phaser.Scene {
  constructor() {
    super('gameover'); // FIXED (removed accidental space)
  }

  init(data) {
    this.finalScore = data.score || 0;
  }

  create() {
    this.width = this.scale.width;
    this.height = this.scale.height;

    this.add.tileSprite(0, 0, this.width, this.height, 'bg_junkyard')
      .setOrigin(0, 0);

    this.add.text(this.width / 2, 200, 'GAME OVER', {
      fontSize: '64px',
      fill: '#ff0000',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    this.add.text(this.width / 2, 300, 'Final Score: ' + this.finalScore, {
      fontSize: '32px',
      fill: '#fff',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    this.add.text(this.width / 2, 400, 'Press SPACE to Restart', {
      fontSize: '24px',
      fill: '#ff9900',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('game');
    });
  }
}