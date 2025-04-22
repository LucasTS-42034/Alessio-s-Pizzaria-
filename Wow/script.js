let currentLevel = 1;
const totalLevels = 4;
let playerHealth = 100;
let playerAttack = 10;
let playerLevel = 1;
let score = 0;
let isBlocking = false;
let isDodging = false;
let comboCount = 0;

// Player Stats
function updatePlayerStats() {
    document.getElementById('level').textContent = playerLevel;
    document.getElementById('health').textContent = playerHealth;
    document.getElementById('attack').textContent = playerAttack;
}

// Start Game
function startGame() {
    document.querySelector("#level1").classList.add('show');
    document.querySelector("button").style.display = "none"; // Hide start button
    updateProgressBar();
    updatePlayerStats();
}

// Next Level
function nextLevel(level) {
    document.querySelector(`#level${currentLevel}`).classList.remove('show');
    currentLevel = level;
    
    if (document.querySelector(`#level${currentLevel}`)) {
        document.querySelector(`#level${currentLevel}`).classList.add('show');
        updateProgressBar();
        playSound('level-up');
    } else {
        alert("You've reached the final level!");
        playSound('win');
    }
}

// Enemy Fight Mechanism
function fightEnemy(enemyId) {
    let damage = Math.floor(Math.random() * 20) + 10;
    playerHealth -= damage;
    score += 50;
    updatePlayerStats();
    checkGameOver();
    
    document.getElementById(`enemy${enemyId}`).style.backgroundColor = "#ffcc00"; // Change enemy color
    playSound('hit');
}

// Check Game Over
function checkGameOver() {
    if (playerHealth <= 0) {
        alert("Game Over! You died.");
        resetGame();
    }
}

// Reset Game
function resetGame() {
    currentLevel = 1;
    playerHealth = 100;
    score = 0;
    document.querySelector("#level4").classList.remove('show');
    document.querySelector(`#level${currentLevel}`).classList.add('show');
    document.querySelector("button").style.display = "inline-block";
    updateProgressBar();
}

// Progress Bar Update
function updateProgressBar() {
    const progress = (currentLevel - 1) / (totalLevels - 1) * 100;
    document.querySelector("#progress").style.width = progress + "%";
}

// Sound Effects
function playSound(type) {
    const sound = new Audio(`sounds/${type}.mp3`);
    sound.play();
}

// Save Game
function saveGame() {
    const playerData = { playerHealth, playerAttack, playerLevel, score };
    localStorage.setItem('playerData', JSON.stringify(playerData));
    console.log("Game saved!");
}

// Load Game
function loadGame() {
    let savedData = JSON.parse(localStorage.getItem('playerData'));
    if (savedData) {
        playerHealth = savedData.playerHealth;
        playerAttack = savedData.playerAttack;
        playerLevel = savedData.playerLevel;
        score = savedData.score;
        updatePlayerStats();
        alert("Game loaded!");
    } else {
        alert("No saved game found.");
    }
}

// Add Player Abilities (Block, Dodge)
function block() {
    isBlocking = true;
    console.log("Blocking attack!");
}

function dodge() {
    isDodging = true;
    setTimeout(() => {
        isDodging = false;
        console.log("You dodged the attack!");
    }, 500);
}
