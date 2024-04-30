// Iteration 1: Declare variables required for this game
const gameBody = document.getElementById("game-body");
const timer = document.getElementById("timer");
const live = document.getElementById("lives");
const scoreDisplay = document.getElementById("score");
var seconds = parseInt(timer.textContent);
const zombieImages = [
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png"
];
var zombieId = 0;
const maximumLives = 4;
var lives = 4;
let score = 0;

// Iteration 1.2: Add shotgun sound
const shotgunSound = new Audio('shotgun.wav');
gameBody.onclick = () => {
    shotgunSound.pause();
    shotgunSound.currentTime = 0;
    shotgunSound.play();
}

// Iteration 1.3: Add background sound
const backgroundSound = new Audio('bgm.mp3');
backgroundSound.loop = true;
backgroundSound.play();

// Iteration 2: Write a function to make a zombie
function makeZombie() {
    const randomImage = zombieImages[getRandomNum(0, zombieImages.length)];
    const zombie = document.createElement('img');
    zombie.src = randomImage;
    zombie.className = "zombie-image";
    zombie.style.transform = `translateX(${getRandomNum(10, 90)}vw)`;
    zombie.onclick = () => {
        destroyZombie(zombie);
    };
    gameBody.appendChild(zombie);
    moveZombie(zombie);
}

// Iteration 3: Write a function to check if the player missed a zombie
function checkMissedZombie(zombie) {
    if (zombie.getBoundingClientRect().right <= 0) {
        return true; // Zombie passed the player
    }
    return false;
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombie(zombie) {
    if (checkMissedZombie(zombie)) {
        lives--; // Decrease lives if zombie passes the player
        updateLivesDisplay();
    } else {
        score++; // Increase score if zombie is shot
        updateScoreDisplay();
    }
    zombie.remove();
}

// Iteration 5: Creating timer
let gameTimer;

function startTimer() {
    gameTimer = setInterval(() => {
        seconds--;
        timer.textContent = seconds;
        if (seconds <= 0) {
            endGame();
        }
    }, 1000);
}

// Iteration 6: Write a code to start the game by calling the first zombie
function startGame() {
    startTimer();
    setInterval(makeZombie, 3000); // Zombie creation interval
}

// Iteration 7: Write the helper function to get random integer
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Function to update lives display
function updateLivesDisplay() {
    live.textContent = `Lives: ${lives}`;
    if (lives <= 0) {
        endGame();
    }
}

// Function to update score display
function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Function to move the zombie
function moveZombie(zombie) {
    const zombieMoveInterval = setInterval(() => {
        const speed = getRandomNum(2, 10);
        const newPosition = zombie.getBoundingClientRect().left - speed;
        if (newPosition > 0) {
            zombie.style.transform = `translateX(${newPosition}px)`;
        } else {
            clearInterval(zombieMoveInterval);
            destroyZombie(zombie);
        }
    }, 100);
}

// Function to end the game
function endGame() {
    clearInterval(gameTimer);
    //gameBody.innerHTML = "<h1>Game Over</h1>";
    // Redirect to another HTML file
    window.location.href = "game-over.html";
}


// Starting the game
startGame();
