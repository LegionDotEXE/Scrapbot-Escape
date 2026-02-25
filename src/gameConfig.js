// GameConfig.js   

// Gameplay constants — Initially just a placeholder

// Attaching to window so other files can see it without imports
window.gameConfig = {
  playerSpeed: 200,
  jumpForce: -650,      
  gravity: 900,
  enemySpawnRate: 1800, // Milliseconds between spawns
  obstacleSpeed: 200,   
  scoreIncrement: 10,
  groundY: 520          // Where the floor is (height 600 - floor height)
};

console.log("Game config loaded!", window.gameConfig);