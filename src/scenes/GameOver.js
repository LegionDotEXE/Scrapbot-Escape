// GameOver.js Prefab

class GameOver extends Phaser.Scene {
  constructor() {
    super('gameover ');
  }

  init() {
    this.score = 0;
    this.isGameOver = false;
    this.gameSpeed = window.gameConfig.obstacleSpeed;
    this.spawnTimer = null;
  }

  create() {
    this.width = this.scale.width;
    this.height = this.scale.height;

    // Background moves slow
    this.bg = this.add.tileSprite(0, 0, this.width, this.height, 'bg_junkyard').setOrigin(0, 0);
    
    // Floor moves faster
    this.floor = this.add.tileSprite(0, window.gameConfig.groundY, this.width, 100, 'floor_metal').setOrigin(0, 0);
    this.physics.add.existing(this.floor, true); // Static physics body

    // Player setuo
    this.player = this.physics.add.sprite(100, 400, 'scrapbot');
    this.player.setCollideWorldBounds(true);
    this.player.play('run');

    // Collide player with floor
    this.physics.add.collider(this.player, this.floor);
    
    this.obstacles = this.physics.add.group();
    this.batteries = this.physics.add.group();

    //  COLLISIONS 
    this.physics.add.collider(this.player, this.obstacles, this.hitObstacle, null, this);
    
    // Collect battery = Score
    this.physics.add.overlap(this.player, this.batteries, this.collectBattery, null, this);

    // Input 
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // UI
    this.scoreText = this.add.text(20, 20, 'Score: 0', {
      fontSize: '24px',
      fill: '#fff',
      fontFamily: 'monospace'
    });

    // Spawn obstacles
    this.spawnTimer = this.time.addEvent({
      delay: window.gameConfig.enemySpawnRate,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });

    // Music
    this.bgm = this.sound.add('bgm_loop', { loop: true, volume: 0.5 });
    this.bgm.play();
  }

  update() {
    if (this.isGameOver) return;

    // Jump Logic
    if ((this.cursors.up.isDown || this.spaceKey.isDown) && this.player.body.touching.down) {
      this.player.setVelocityY(window.gameConfig.jumpForce);
      this.sound.play('jump_sfx', { volume: 0.3 });
    }

    // Scroll Backgrounds based on gameSpeed
    this.bg.tilePositionX += this.gameSpeed * 0.2; 
    this.floor.tilePositionX += this.gameSpeed;

    // Difficulty Scale Up
    this.gameSpeed += 0.05; 
    
    // Move obstacles manually to match speed increase
    this.obstacles.getChildren().forEach(obs => {
      obs.setVelocityX(-this.gameSpeed);
      if (obs.x < -50) obs.destroy();
    });

    // Move batteries
    this.batteries.getChildren().forEach(bat => {
      bat.setVelocityX(-this.gameSpeed);
      if (bat.x < -50) bat.destroy();
    });

    // Update Score Text
    this.scoreText.setText('Score: ' + this.score);
  }

  spawnObstacle() {
    if (this.isGameOver) return;

    // Randomly decide if we spawn an obstacle or a battery
    const rand = Math.random();

    if (rand > 0.3) {
      // Spawn Obstacle
      const obs = this.obstacles.create(this.width + 50, window.gameConfig.groundY - 30, 'junk_block');
      obs.setImmovable(true);
      obs.setVelocityX(-this.gameSpeed);
      obs.body.allowGravity = false; 
    } else {
      // Spawn Battery
      const batY = window.gameConfig.groundY - 30 - (Math.random() * 100); // Sometimes high, sometimes low
      const bat = this.batteries.create(this.width + 50, batY, 'battery');
      bat.setVelocityX(-this.gameSpeed);
      bat.body.allowGravity = false;
      
      // Simple bobbing animation
      this.tweens.add({
        targets: bat,
        y: bat.y - 20,
        duration: 500,
        yoyo: true,
        repeat: -1
      });
    }

    // Make spawn rate faster as game speeds up
    this.spawnTimer.delay = Math.max(800, window.gameConfig.enemySpawnRate - (this.gameSpeed * 2));
  }

  collectBattery(player, battery) {
    battery.disableBody(true, true);
    this.score += 10;
    this.sound.play('collect_sfx', { volume: 0.4 });
    
    // Little particle effect could go here, but keeping it simple
  }

  hitObstacle(player, obstacle) {
    if (this.isGameOver) return;
    
    this.isGameOver = true;
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.stop();
    
    this.sound.play('crash_sfx', { volume: 0.6 });
    this.bgm.stop();

    // Wait a second then go to Game Over
    this.time.delayedCall(1000, () => {
      this.scene.start('gameover', { score: this.score });
    });
  }
}