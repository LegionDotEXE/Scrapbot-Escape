// GameConfig.js   

// Gameplay constants — Initially just a placeholder

// Attaching to window so other files can see it without imports
window.gameConfig = {
  playerSpeed: 200,
  jumpForce: -550,      // Negative because Y goes up in Phaser
  gravity: 800,
  enemySpawnRate: 2000, // Milliseconds between spawns
  obstacleSpeed: 300,   
  scoreIncrement: 10,
  groundY: 500          // Where the floor is (height 600 - floor height)
};

console.log("Game config loaded!", window.gameConfig);