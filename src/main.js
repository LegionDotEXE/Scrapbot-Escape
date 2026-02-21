/*
 * Scrapbot Escape

 * Name: Saurav Shah    
 * Date: 02/20/2026
 * Hours Spent: 20+ (ongoing)
 * Description: A top-down action game where the player controls a scrapbot trying to 
    escape a scrapyard while avoiding hazards and collecting parts.

 * Sources: Phaser 3 examples (phaser.io), OpenGameArt.org for SFX/music
 * Creative Tilt: 
 *              ---- To be added as development progresses ----
*/


// Honestly, I don't know if this is necessary
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