// words
var words = [
  "blindside",
  "tribe",
  "immunity",
  "challenge",
  "reward",
  "probst",
  "idol",
  "redemption",
  "buff",
  "puzzle",
  "strategy",
  "flint",
  "torch",
  "council",
  "outlast",
  "outwit",
  "outplay",
  "million"
]

var wins = 0;
var guessesRemaining = 15;
var lettersGuessed = [];
var isGameInProgress = false;
var currentWord = "";

var newGameButton = document.getElementById("new-game-button");

newGameButton.onclick = function() {
    toggleDiv("new-game");
    toggleDiv("game-on");
    startGame();
};

function startGame() {
  var wordIndex = pickRandomWord();
  currentWord = words[wordIndex];

  guessWord();
  setNumberOfGuessesRemaining();
  setLettersAlreadyGuessed();
  isGameInProgress = true;
}

function endGame() {
  isGameInProgress = false;
}

document.onkeyup = function(event) {
  if (isGameInProgress) {
    var letter = event.key;

    if (!lettersGuessed.includes(letter)) {
      lettersGuessed.push(letter);
      lettersGuessed.sort();

      if (currentWord.indexOf(letter) > -1) {
        guessWord();
      } else {
        guessesRemaining--;
      }
    }

    setNumberOfGuessesRemaining();
    setLettersAlreadyGuessed();
  }
}

// HELPER FUNCTIONS

function guessWord() {
  var wordDiv = document.getElementById("word");
  wordDiv.innerHTML = "";
  for (var i = 0; i < currentWord.length; i++) {
    if (lettersGuessed.includes(currentWord[i])) {
      wordDiv.innerHTML += currentWord[i] + " ";
    } else {
      wordDiv.innerHTML += "_ ";
    }
  }

  if (wordDiv.innerHTML.indexOf("_") === -1) {
    endGame();
  }
}

function setNumberOfGuessesRemaining() {
  var guessesSpan = document.getElementById("guesses");
  guessesSpan.innerHTML = guessesRemaining;
}

function setLettersAlreadyGuessed() {
  var lettersGuessedSpan = document.getElementById("letters-guessed");
  lettersGuessedSpan.innerHTML = "";
  for (var i = 0; i < lettersGuessed.length; i++) {
    lettersGuessedSpan.innerHTML += lettersGuessed[i] + " ";
  }
}

function pickRandomWord() {
  return Math.floor(Math.random() * ((words.length - 1) - 1));
}

function toggleDiv(id) {
  var div = document.getElementById(id);
  div.classList.toggle("hidden");
}
