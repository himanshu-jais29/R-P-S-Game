const choices = document.querySelectorAll(".choice");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const playerChoiceDisplay = document.getElementById("player-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const resultDisplay = document.getElementById("result");
const overlayMessage = document.getElementById("overlay-message");
const overlayText = document.getElementById("overlay-text");
const actionButton = document.getElementById("action-button");
const resetButton = document.getElementById("reset");
const rulesModal = document.getElementById("rules-modal");
const rulesButton = document.getElementById("rules-button");
const closeModal = document.querySelector(".close");

// Initialize or retrieve scores from localStorage
let playerScore = parseInt(localStorage.getItem("playerScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

// Update score displays with initial values
playerScoreDisplay.textContent = playerScore;
computerScoreDisplay.textContent = computerScore;

// Disable or enable choice buttons
function disableChoices(disabled) {
  choices.forEach(choice => {
    choice.disabled = disabled;
    choice.style.opacity = disabled ? "0.5" : "1";  // Visual feedback for disabled state
  });
}

// Add event listeners to choice buttons
choices.forEach(choice => {
  choice.addEventListener("click", () => {
    const playerChoice = choice.dataset.choice;
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);

    playerChoiceDisplay.textContent = `Player Choice: ${playerChoice}`;
    computerChoiceDisplay.textContent = `Computer Choice: ${computerChoice}`;
    resultDisplay.textContent = `Result: ${result}`;

    updateScore(result);
    showOverlayMessage(result);
  });
});

// Generate random computer choice
function getComputerChoice() {
  const options = ["Rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)];
}

// Determine winner based on player and computer choices
function determineWinner(player, computer) {
  if (player === computer) return "Draw";
  if (
    (player === "Rock" && computer === "scissors") ||
    (player === "paper" && computer === "Rock") ||
    (player === "scissors" && computer === "paper")
  ) return "You Win!";
  return "You Lose!";
}

// Update the scores and save to localStorage
function updateScore(result) {
  if (result === "You Win!") {
    playerScore++;
  } else if (result === "You Lose!") {
    computerScore++;
  }

  // Update score display
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;

  // Save updated scores to localStorage
  localStorage.setItem("playerScore", playerScore);
  localStorage.setItem("computerScore", computerScore);
}

// Show overlay message and handle game state
function showOverlayMessage(result) {
  disableChoices(true);
  overlayMessage.style.display = "flex";

  if (result === "You Win!") {
    overlayText.textContent = "Hurray! You Won!";
    actionButton.textContent = "Play Again";
  } else if (result === "Draw") {
    overlayText.textContent = "It's a Draw! Replay?";
    actionButton.textContent = "Replay";
  } else {
    overlayText.textContent = "You Lost! Play Again?";
    actionButton.textContent = "Play Again";
  }

  actionButton.onclick = () => {
    overlayMessage.style.display = "none";
    disableChoices(false);
  };
}

// Reset scores and clear from localStorage
resetButton.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  localStorage.setItem("playerScore", playerScore);
  localStorage.setItem("computerScore", computerScore);

  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
});

// Toggle rules modal
rulesButton.addEventListener("click", () => {
  rulesModal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  rulesModal.style.display = "none";
});

// Close rules modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target === rulesModal) {
    rulesModal.style.display = "none";
  }
});
