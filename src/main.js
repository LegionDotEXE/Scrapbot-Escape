/*
 * Scrapbot Escape

 * Name: Saurav Shah    
 * Date: 02/20/2026
 * Hours Spent: 22+ (ongoing)
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
  backgroundColor: '#2d2d2d',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: window.gameConfig.gravity },
      debug: false 
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [
    Boot, 
    Preloader, 
    TitleScene, 
    Game, 
    GameOver, 
    CreditsScene
  ]
};

const game = new Phaser.Game(config);

// New Line - Awkwardly placed console log for testing purposes
console.log("Scrapbot Escape initialized.");