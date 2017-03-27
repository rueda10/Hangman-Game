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
  "exile",
  "hidden"
]

var game = {
  // Variables
  numWins: 0,
  numGuessesRemaining: 15,
  lettersGuessed: [],
  isGameInProgress: false,
  isVolumeOn: true,
  currentWord: "",
  // Audio Clips
  audioReadyGo: new Audio("./assets/sounds/readygo.mp3"),
  audioBlindside: new Audio("./assets/sounds/blindside.mp3"),
  audioOneSurvivor: new Audio("./assets/sounds/onesurvivor.mp3"),
  // Message strings
  messageWon: "Congratulations! You guessed the word ",
  messageWon2: "But, first thing's first. Immunity is back up for grabs...",
  messageLost: "Game over, the tribe has spoken. The word was ",

  /**
   * Initalizes game settings. Gets new random word,
   * resets guessesRemaining, and displays data in DOM
   */
  startGame: function() {
    this.isGameInProgress = true;
    var wordIndex = this.pickRandomWord();
    this.currentWord = words[wordIndex];
    this.guessesRemaining = 15;
    this.lettersGuessed = [];

    this.guessWord();
    this.setNumberOfWins();
    this.setNumberOfGuessesRemaining();
    this.setLettersAlreadyGuessed();
  },

  /**
   * Populates game over div with passed in message
   */
  gameOver: function(message, messageTwo) {
    this.isGameInProgress = false;
    this.toggleDiv("game-on", "hidden");
    this.toggleDiv("game-over", "hidden");

    var messageSpan = document.getElementById("game-over-message");
    var wordSpan = document.getElementById("guessed-word");
    var messageTwoSpan = document.getElementById("game-over-message-two");

    messageSpan.innerHTML = message;
    messageTwoSpan.innerHTML = messageTwo;
    wordSpan.innerHTML = "'" + this.currentWord + "'";
  },
  /**
   * Displays countdown and starts game
   */
  startCountdown: function() {
    var counter = 4;
    var countdownSpan = document.getElementById("countdown-number");

    countdownSpan.innerHTML = "4";

    var countdownInterval = setInterval(function() {
      counter--;
      if(counter === 0) {
        game.toggleDiv("ready", "hidden");
        game.toggleDiv("game-on", "hidden");
        countdownSpan.innerHTML = "5";
        game.startGame();
        clearInterval(countdownInterval);
      } else {
        countdownSpan.innerHTML = counter;
      }
    }, 1000);
  },

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
  guessWord: function() {
    var wordDiv = document.getElementById("word");
    wordDiv.innerHTML = "";
    for (var i = 0; i < this.currentWord.length; i++) {
      if (this.lettersGuessed.includes(this.currentWord[i])) {
        wordDiv.innerHTML += this.currentWord[i] + " ";
      } else {
        wordDiv.innerHTML += "_ ";
      }
    }

    if (wordDiv.innerHTML.indexOf("_") === -1) {
      this.numWins++;
      this.gameOver(this.messageWon, this.messageWon2);
      if (this.isVolumeOn) {
        this.audioOneSurvivor.play();
      }
    }
  },

  /**
   * Sets the number of wins in the DOM using the
   * wins integer
   */
  setNumberOfWins: function() {
    var winsSpan = document.getElementById("num-wins");
    winsSpan.innerHTML = this.numWins;
  },

  /**
   * Sets the guesses remaning in the DOM using the
   * guessesRemaining integer
   */
  setNumberOfGuessesRemaining: function() {
    var guessesSpan = document.getElementById("guesses");
    guessesSpan.innerHTML = this.guessesRemaining;
  },

  /**
   * Populates the letters guessed in the DOM using the
   * lettersGuessed array
   */
  setLettersAlreadyGuessed: function() {
    var lettersGuessedSpan = document.getElementById("letters-guessed");
    lettersGuessedSpan.innerHTML = "";
    for (var i = 0; i < this.lettersGuessed.length; i++) {
      lettersGuessedSpan.innerHTML += this.lettersGuessed[i] + " ";
    }
  },

  /**
   * Picks a random word index from the words array
   */
  pickRandomWord: function() {
    return Math.floor(Math.random() * words.length);
  },

  /**
   * Toggles the given class on and off the element
   * corresponding to the given id
   */
  toggleDiv: function(id, myClass) {
    var div = document.getElementById(id);
    div.classList.toggle(myClass);
  }

}

// BUTTON ON CLICK LISTENERS
/**
 * Start Game button handler. Removes initial div
 * and displays game div. Starts countdown with a
 * delay to match audio clip
 */
var buttonNewGame = document.getElementById("new-game-button");
buttonNewGame.onclick = function() {
    game.toggleDiv("new-game", "hidden");
    game.toggleDiv("ready", "hidden");
    game.numWins = 0;
    if (game.isVolumeOn) {
      game.audioReadyGo.play();
    }
    setTimeout(game.startCountdown, 750);
};

/**
 * Start Game button handler. Removes initial div
 * and displays game div
 */
var buttonKeepPlaying = document.getElementById("keep-playing-button");
buttonKeepPlaying.onclick = function() {
    game.toggleDiv("game-over", "hidden");
    game.toggleDiv("game-on", "hidden");
    game.startGame();
};

/**
 * Start Game button handler. Removes initial div
 * and displays game div
 */
var buttonStopPlaying = document.getElementById("stop-playing-button");
buttonStopPlaying.onclick = function() {
    game.toggleDiv("game-over", "hidden");
    game.toggleDiv("new-game", "hidden");
};

/**
 * Handles button that turns volume on and off
 */
var buttonVolume = document.getElementById("volume");
buttonVolume.onclick = function() {
  game.toggleDiv("volume", "glyphicon-volume-up");
  game.toggleDiv("volume", "glyphicon-volume-off");
  game.isVolumeOn = !game.isVolumeOn;

  if (!game.isVolumeOn) {
    game.audioReadyGo.volume = 0;
    game.audioBlindside.volume = 0;
    game.audioOneSurvivor.volume = 0;
  } else {
    game.audioReadyGo.volume = 1;
    game.audioBlindside.volume = 1;
    game.audioOneSurvivor.volume = 1;
  }
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
  if (game.isGameInProgress &&
      (event.keyCode >= 65 && event.keyCode <= 90)) {
    var letter = event.key;

    if (!game.lettersGuessed.includes(letter)) {
      game.lettersGuessed.push(letter);
      game.lettersGuessed.sort();

      if (game.currentWord.indexOf(letter) > -1) {
        game.guessWord();
      } else {
        game.guessesRemaining--;
        if (game.guessesRemaining === 0) {
          game.gameOver(game.messageLost, "");
          if (game.isVolumeOn) {
            game.audioBlindside.play();
          }
        }
      }
    }

    game.setNumberOfGuessesRemaining();
    game.setLettersAlreadyGuessed();
  }
}
