// Preloader.jS Prefab

class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;

    // Loading bar graphics
    const progressBox = this.add.graphics();
    const progressBar = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(this.width / 2 - 160, this.height / 2 - 25, 320, 50);

    const loadingText = this.add.text(this.width / 2, this.height / 2 - 50, 'Loading Assets...', {
      fontSize: '20px',
      fill: '#fff',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    // Update bar
    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xff9900, 1);
      progressBar.fillRect(this.width / 2 - 150, this.height / 2 - 15, 300 * value, 30);
    });

    // --- LOAD ASSETS ---
    // Images
    this.load.image('bg_junkyard', 'assets/images/bg_junkyard.png');
    this.load.image('floor_metal', 'assets/images/floor_metal.png');
    this.load.image('junk_block', 'assets/images/junk_block.png');
    this.load.image('battery', 'assets/images/battery.png'); 
    
    // Sprite sheet for player (4 frames, 32x32 each - adjust if your image is different)
    this.load.spritesheet('scrapbot', 'assets/images/scrapbot.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    // Audio
    this.load.audio('bgm_loop', 'assets/audio/bgm_loop.ogg');
    this.load.audio('jump_sfx', 'assets/audio/jump.mp3');
    this.load.audio('collect_sfx', 'assets/audio/collect.mp3');
    this.load.audio('crash_sfx', 'assets/audio/crash.mp3');
    this.load.audio('ui_click', 'assets/audio/ui_click.ogg');
  }

  create() {
    // Create Animations
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('scrapbot', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    // Go to Title Screen
    this.scene.start('title');
  }
}