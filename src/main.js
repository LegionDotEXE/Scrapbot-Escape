/*
 * Scrapbot Escape

 * Name: 
 * Date:
 * Hours Spent:
 * Sources: Phaser 3 examples (phaser.io), OpenGameArt.org for SFX/music
 * Creative Tilt: 
 *              ---- TBD ----
 */


// keep me honest
'use strict'

// define constraints and configure main Phaser game object
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },    // Top-down or side-scroller? TBD
      debug: false
    }
  },
  scene: [Boot, Preloader, TitleScene, Game, GameOver],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

const game = new Phaser.Game(config);