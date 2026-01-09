// Variables for the DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const settingsBtn = document.getElementById("settings-btn");
const difficultySelect = document.getElementById("difficulty");

// Array
const words = [
  "dependent",
  "dog",
  "superficial",
  "admit",
  "juice",
  "javascript",
  "developer",
  "airplane",
  "great",
  "fun",
  "manipulate",
  "cat",
  "transition",
  "school",
  "computer",
  "programming",
  "drag",
  "loving",
  "north",
];

//Initializing word
let randomWord;

//Initializing score
let score = 0;

//Initializing time
let time = 10;

// Difficulty
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

difficultySelect.value = difficulty;

// Focus the input on start
text.focus();

/* -------------------------------------------------
    PART 1
--------------------------------------------------*/

// Add random word to DOM
function addWordToDOM() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// When user types
text.addEventListener("input", (e) => {
  const typed = e.target.value;

  if (typed === randomWord) {
    updateScore();
    addWordToDOM();

    // Add time based on difficulty
    if (difficulty === "hard") time += 2;
    else if (difficulty === "medium") time += 3;
    else time += 5; // easy

    updateTimeDisplay();
    text.value = "";
  }
});

/* -------------------------------------------------
    PART 2
--------------------------------------------------*/

// Time interval
const timeInterval = setInterval(updateTime, 1000);

// Update time every second
function updateTime() {
  time--;
  updateTimeDisplay();

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function updateTimeDisplay() {
  timeEl.innerHTML = `${time}s`;
}

// Game over
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time Ran Out!</h1>
    <p>Your final score: ${score}</p>
    <button onclick="location.reload()">Restart</button>
  `;

  // Show container
  endgameEl.style.display = "flex";
}

/* -------------------------------------------------
    SETTINGS TOGGLE
--------------------------------------------------*/

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// Save difficulty to localStorage
difficultySelect.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

/* -------------------------------------------------
    START GAME
--------------------------------------------------*/
addWordToDOM();
