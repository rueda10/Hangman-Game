// WORDS ARRAY
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
  "million",
  "twist",
  "outcast",
  "exile"
]

// VARIABLES
var wins = 0;
var guessesRemaining = 15;
var lettersGuessed = [];
var isGameInProgress = false;
var currentWord = "";
var audio = new Audio("./assets/sounds/readygo.mp3");
var wonMessage = "Congratulations! You guessed the word ";
var lostMessage = "Game over, the tribe has spoken. The word was ";
// Buttons
var newGameButton = document.getElementById("new-game-button");
var keepPlayingButton = document.getElementById("keep-playing-button");
var stopPlayingButton = document.getElementById("stop-playing-button");

/**
 * Start Game button handler. Removes initial div
 * and displays game div. Starts countdown with a
 * delay to match audio clip
 */
newGameButton.onclick = function() {
    toggleDiv("new-game", "hidden");
    toggleDiv("ready", "hidden");
    wins = 0;
    audio.play();
    setTimeout(startCountdown, 750);
};

/**
 * Start Game button handler. Removes initial div
 * and displays game div
 */
keepPlayingButton.onclick = function() {
    toggleDiv("game-over", "hidden");
    toggleDiv("game-on", "hidden");
    startGame();
};

/**
 * Start Game button handler. Removes initial div
 * and displays game div
 */
stopPlayingButton.onclick = function() {
    toggleDiv("game-over", "hidden");
    toggleDiv("new-game", "hidden");
};

/**
 * Initalizes game settings. Gets new random word,
 * resets guessesRemaining, and displays data in DOM
 */
function startGame() {
  isGameInProgress = true;
  var wordIndex = pickRandomWord();
  currentWord = words[wordIndex];
  guessesRemaining = 15;
  lettersGuessed = [];

  guessWord();
  setNumberOfWins();
  setNumberOfGuessesRemaining();
  setLettersAlreadyGuessed();
}

/**
 * Populates game over div with passed in message
 */
function gameOver(message) {
  isGameInProgress = false;
  toggleDiv("game-on", "hidden");
  toggleDiv("game-over", "hidden");

  var messageSpan = document.getElementById("game-over-message");
  var wordSpan = document.getElementById("guessed-word");

  messageSpan.innerHTML = message;
  wordSpan.innerHTML = "'" + currentWord + "'";
}

/**
 * onkeyup event that adds letter pressed to
 * lettersGuessed array and determines whether
 * the character is part of the current word
 * being guessed or not. If so, it displays it
 * in the DOM. If not, guessesRemaining is
 * decreased by one. Game will be over when
 * guessesRemaining reaches 0.
 */
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
        if (guessesRemaining === 0) {
          gameOver(lostMessage);
        }
      }
    }

    setNumberOfGuessesRemaining();
    setLettersAlreadyGuessed();
  }
}

/**
 * Audio event listener that starts the game 4
 * seconds into the audio clip. Countdown is done
 * in a weird way because of the way audio's
 * timeupdate works.
 */
// audio.addEventListener("timeupdate", function(){
//   var currentTime = parseInt(audio.currentTime);
//   var countdownSpan = document.getElementById("countdown-number");
//
//   if (!isGameInProgress && currentTime === 4) {
//     toggleDiv("ready", "hidden");
//     toggleDiv("game-on", "hidden");
//     startGame();
//   } else {
//     if (countdownSpan.innerHTML != currentTime) {
//       if (currentTime === 1) {
//         countdownSpan.innerHTML = "3";
//       } else if (currentTime === 2) {
//         countdownSpan.innerHTML = "2";
//       } else if (currentTime === 3) {
//         countdownSpan.innerHTML = "1";
//       }
//     }
//   }
// });

/**
 * Displays countdown and starts game
 */
function startCountdown() {
  var counter = 4;
  var countdownSpan = document.getElementById("countdown-number");

  countdownSpan.innerHTML = "4";

  var countdownInterval = setInterval(function() {
    counter--;
    if(counter === 0) {
      clearInterval(countdownInterval);
      toggleDiv("ready", "hidden");
      toggleDiv("game-on", "hidden");
      countdownSpan.innerHTML = "5";
      startGame();
    } else {
      countdownSpan.innerHTML = counter;
    }
  }, 1000);
}

// HELPER FUNCTIONS
/**
 * Sets the word being guessed in the DOM using the
 * currentWord string and lettersGuessed array. While
 * traversing the currentWord string, if the current
 * character is in the lettersGuessed array, display
 * character, if it isn't, display the underscore
 * placeholder. Game is over when all letters in the
 * currentWord are guessed.
 */
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
    wins++;
    gameOver(wonMessage);
  }
}

/**
 * Sets the number of wins in the DOM using the
 * wins integer
 */
function setNumberOfWins() {
  var winsSpan = document.getElementById("num-wins");
  winsSpan.innerHTML = wins;
}

/**
 * Sets the guesses remaning in the DOM using the
 * guessesRemaining integer
 */
function setNumberOfGuessesRemaining() {
  var guessesSpan = document.getElementById("guesses");
  guessesSpan.innerHTML = guessesRemaining;
}

/**
 * Populates the letters guessed in the DOM using the
 * lettersGuessed array
 */
function setLettersAlreadyGuessed() {
  var lettersGuessedSpan = document.getElementById("letters-guessed");
  lettersGuessedSpan.innerHTML = "";
  for (var i = 0; i < lettersGuessed.length; i++) {
    lettersGuessedSpan.innerHTML += lettersGuessed[i] + " ";
  }
}

/**
 * Picks a random word index from the words array
 */
function pickRandomWord() {
  return Math.floor(Math.random() * words.length);
}

/**
 * Toggles the given class on and off the element
 * corresponding to the given id
 */
function toggleDiv(id, myClass) {
  var div = document.getElementById(id);
  div.classList.toggle(myClass);
}
