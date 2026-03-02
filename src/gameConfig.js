// GameConfig.js   

// Gameplay constants — Initially just a placeholder

// Gameplay constants — Initially just a placeholder

// Attaching to window so other files can see it without imports
window.gameConfig = {
  playerSpeed: 200,
  jumpForce: -950,      
  gravity: 150,
  enemySpawnRate: 1200, // Milliseconds between spawns
  obstacleSpeed: 300,   
  scoreIncrement: 10,
  groundY: 620          // Where the floor is (height 600 - floor height)
};

console.log("Game config loaded!", window.gameConfig);

