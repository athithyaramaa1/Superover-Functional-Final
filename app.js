const sButton = document.getElementById("strike");
const rButton = document.getElementById("reset");
const team1ScoreElem = document.getElementById("score-team1");
const team1WicketsElem = document.getElementById("wickets-team1");
const team2ScoreElem = document.getElementById("score-team2");
const team2WicketsElem = document.getElementById("wickets-team2");

const strikeAudio = new Audio("http://bit.ly/so-ball-hit");
const gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer");

var team1Score = 0;
var team1Wickets = 0;
var team2Score = 0;
var team2Wickets = 0;
var team1BallsFaced = 0;
var team2BallsFaced = 0;
var turn = 1;

const possibleOutcomes = [0, 1, 2, 3, 4, 6, "W"];

function endGame() {
  gameOverAudio.play();
  if (team1Score > team2Score) alert("IND wins");
  if (team2Score > team1Score) alert("PAK wins");
  if (team2Score === team1Score) alert("It is another superover!");
}

function updateScore() {
  team1ScoreElem.textContent = team1Score;
  team1WicketsElem.textContent = team1Wickets;
  team2ScoreElem.textContent = team2Score;
  team2WicketsElem.textContent = team2Wickets;
}

rButton.onclick = () => {
  window.location.reload();
};

sButton.onclick = () => {
  strikeAudio.pause();
  strikeAudio.currentTime = 0;
  strikeAudio.play();

  const randomElement =
    possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)];

  if (turn === 2) {
    team2BallsFaced++;
    document.querySelector(
      `#team2-superover div:nth-child(${team2BallsFaced})`
    ).textContent = randomElement;

    if (randomElement === "W") {
      team2Wickets++;
    } else {
      team2Score += randomElement;
    }

    if (
      team2BallsFaced === 6 ||
      team2Wickets === 2 ||
      team2Score > team1Score
    ) {
      turn = 3;
      endGame();
    }
  }

  if (turn === 1) {
    team1BallsFaced++;
    document.querySelector(
      `#team1-superover div:nth-child(${team1BallsFaced})`
    ).textContent = randomElement;

    if (randomElement === "W") {
      team1Wickets++;
    } else {
      team1Score += randomElement;
    }

    if (team1BallsFaced === 6 || team1Wickets === 2) turn = 2;
  }
  updateScore();
};

