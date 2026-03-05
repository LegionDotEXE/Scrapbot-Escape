// Game.js prefab

class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  init() {
    this.score = 0;
    this.isGameOver = false;

    this.baseSpeed = 250;
    this.maxSpeed = 420;
    this.gameSpeed = this.baseSpeed;
  }

  create() {
    this.width = this.scale.width;
    this.height = this.scale.height;

    // Ground placement (proportional)
    this.groundHeight = this.height * 0.10;
    this.groundY = this.height - this.groundHeight;

    // Background
    this.bg = this.add.tileSprite(0, 0, this.width, this.height, 'bg_junkyard')
      .setOrigin(0, 0);

    // Floor
    this.floor = this.add.tileSprite(0, this.groundY, this.width, this.groundHeight, 'floor_metal')
      .setOrigin(0, 0);

    this.physics.add.existing(this.floor, true);

    this.spriteScale = this.height / 900;   // balanced scaling factor

    // Player
    this.player = this.physics.add.sprite(
      this.width * 0.15,
      this.groundY - (32 * this.spriteScale),
      'scrapbot'
    );

    this.player.setScale(this.spriteScale * 1.6);
    this.player.setCollideWorldBounds(true);
    this.player.play('run');

    // // Clean hitbox (prevents flicker)
    this.player.body.setSize(22, 28);
    this.player.body.setOffset(6, 4);

    this.physics.add.collider(this.player, this.floor);

    // Groups
    this.obstacles = this.physics.add.group();
    this.batteries = this.physics.add.group();

    this.physics.add.collider(this.player, this.obstacles, this.hitObstacle, null, this);
    this.physics.add.overlap(this.player, this.batteries, this.collectBattery, null, this);

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Added the box around the score counter
    const padding = 20;
    const boxWidth = 120;
    const boxHeight = 40;  
    const fontSize = Math.floor(this.height * 0.045);

    this.scoreBox = this.add.rectangle(padding + boxWidth / 2, padding + boxHeight / 2, boxWidth, boxHeight, 0x1a1a1a, 0.9);
    this.scoreBox.setStrokeStyle(3, 0xff9900); 
    this.scoreBox.setScrollFactor(0); 
    this.scoreBox.setDepth(10);

    // "Score" Label 
    this.add.text(padding + boxWidth / 2, padding - 10, 'SCORE', {
      fontSize: '14px',
      fill: '#ff9900',
      fontFamily: 'monospace',
      letterSpacing: 2
    }).setOrigin(0.5).setScrollFactor(0).setDepth(11);

    this.scoreText = this.add.text(padding + boxWidth / 2, padding + boxHeight / 2, '0', {
      fontSize: `${fontSize}px`,
      fill: '#ffffff',
      fontFamily: 'monospace',
      fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(11);


    // Spawn
    this.time.addEvent({
      delay: 1700,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });

    // Music
    this.bgm = this.sound.add('bgm_loop', { loop: true, volume: 0.4 });
    this.bgm.play();
  }

  update() {
    if (this.isGameOver) return;

    const onGround = this.player.body.blocked.down;

    // Responsive jump
    if ((Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
         Phaser.Input.Keyboard.JustDown(this.spaceKey)) && onGround) {

      this.player.setVelocityY(-this.height * 1.2);
      this.sound.play('jump_sfx', { volume: 0.3 });
    }

    // Better gravity feel
    if (this.player.body.velocity.y > 0) {
      this.player.setGravityY(this.height * 2.2);
    } else {
      this.player.setGravityY(this.height * 1.4);
    }

    // Background movement
    this.bg.tilePositionX += 1.2;
    this.floor.tilePositionX += 4;

    // Controlled speed increase
    if (this.gameSpeed < this.maxSpeed) {
      this.gameSpeed += 0.07;
    }

    // Move obstacles
    this.obstacles.getChildren().forEach(obs => {
      obs.setVelocityX(-this.gameSpeed);
      if (obs.x < -100) obs.destroy();
    });

    this.batteries.getChildren().forEach(bat => {
      bat.setVelocityX(-this.gameSpeed);
      if (bat.x < -100) bat.destroy();
    });

    this.scoreText.setText(this.score);
  }

  spawnObstacle() {
    if (this.isGameOver) return;

    // Proportional lanes
    const lanes = [
      this.groundY - 30,
      this.groundY - this.height * 0.18,
      this.groundY - this.height * 0.35
    ];

    const laneY = Phaser.Utils.Array.GetRandom(lanes);
    const rand = Math.random();

    if (rand > 0.35) {
      const obs = this.obstacles.create(this.width + 100, laneY, 'junk_block');
      obs.setScale(this.spriteScale * 1.5);
      obs.setVelocityX(-this.gameSpeed);
      obs.body.allowGravity = false;
    } else {
      const bat = this.batteries.create(this.width + 100, laneY - 40, 'battery');
      bat.setScale(this.spriteScale * 1.4);
      bat.setVelocityX(-this.gameSpeed);
      bat.body.allowGravity = false;

      this.tweens.add({
        targets: bat,
        y: bat.y - 20,
        duration: 600,
        yoyo: true,
        repeat: -1
      });
    }
  }

  collectBattery(player, battery) {
    battery.disableBody(true, true);
    this.score += 10;
    this.sound.play('collect_sfx', { volume: 0.4 });
    
    // Added this recently 
    this.tweens.add({
      targets: this.scoreBox,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 100,
      yoyo: true
    });
  }

  hitObstacle(player, obstacle) {
    if (this.isGameOver) return;

    this.isGameOver = true;
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.stop();

    this.sound.play('crash_sfx', { volume: 0.6 });
    this.bgm.stop();

    this.time.delayedCall(1000, () => {
      this.scene.start('gameover', { score: this.score });
    });
  }
}