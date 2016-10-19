//require inquirer
var inquirer = require('inquirer');
var isLetter = require('is-letter');
//require objects/exports
var Word = require('./word.js');
var Game = require('./game.js');

require('events').EventEmitter.prototype._maxListeners = 100;


var hangman = {
  wordBank: Game.newWord.wordList,
  wordsWon: 0,
  guessesRemaining: 10,
  //empty array to hold letters guessed by user. And checks if the user guessed the letter already
  guessedLetters: [],
  currentWord: null,
  //asks user if they are ready to play
  startGame: function() {
    var that = this;
    //clears guessedLetters before a new game starts if it's not already empty.
    if(this.guessedLetters.length > 0){
      this.guessedLetters = [];
    }

    inquirer.prompt([{
      name: "play",
      type: "confirm",
      message: "Insert floppy disc?"
    }]).then(function(answer) {
      if(answer.play){
        that.newGame();
      } else{
        console.log("Ejecting Floppy disk... disconnecting from modem.. terminating power grid connection.. rolling back time to 2016");
      }
    })},
  //if they want to play starts new game.
  newGame: function() {
    if(this.guessesRemaining === 10) {
      console.log('========================');
      console.log('|    LOADING BENDER    |');
      console.log('|    SYSTEM BOOTING    |');
      console.log('|  Beep BAP BOOP Beep  |');
      console.log('|  "DOWN WITH HUMANS!" |');
      console.log('========================');
      //generates random number based on the wordBank
      var randNumber = Math.floor(Math.random()*this.wordBank.length);
      this.currentWord = new Word(this.wordBank[randNumber]);
      this.currentWord.getLets();
      //displays current word as blanks.
      console.log(this.currentWord.wordRender());
      this.keepPromptingUser();
    } else{
      this.resetGuessesRemaining();
      this.newGame();
    }
  },
  resetGuessesRemaining: function() {
    this.guessesRemaining = 10;
  },
  keepPromptingUser : function(){
    var that = this;
    //asks player for a letter
    inquirer.prompt([{
      name: "chosenLtr",
      type: "input",
      message: "Choose a letter:",
      validate: function(value) {
        if(isLetter(value)){
          return true;
        } else{
          return false;
        }
      }
    }]).then(function(ltr) {
     

      //toUpperCase because words in word bank are all caps
      var letterReturned = (ltr.chosenLtr).toUpperCase();

      //adds to the guessedLetters array if it isn't already there
      var guessedAlready = false;
      guessedLetters=[];

  ///WORKS UP TO HERE!!!!!!!!!!!!!!!!!!///
        for(var i = 0; i<that.guessedLetters.length; i++){
          if(letterReturned === that.guessedLetters[i]){
            guessedAlready = true;
          }
        }
        if(guessedAlready === false){
          guessedLetters.push(letterReturned);
          console.log('You Chose: ' + letterReturned);
          console.log('Guesses Remaining: ' + that.guessesRemaining)
          console.log('Letter Bank: ' + guessedLetters)
         


        } else{
          //otherwise it re-prompts the user to pick another letter.
          console.log("You've guessed that letter already. Try again.") 

          that.keepPromptingUser();
        }

      var found = that.currentWord.checkIfLetterFound(letterReturned);
      //if none were found tell user they were wrong
      if(found === 0){
        console.log('Nope! You guessed wrong.');
        that.guessesRemaining--;
        console.log('Guesses remaining: ' + that.guessesRemaining);
        console.log(that.currentWord.wordRender());
        that.keepPromptingUser();
      } else{
        console.log('Yes! You guessed right!');
          //checks to see if user won
          if(that.currentWord.didWeFindTheWord() === true){
            console.log('Congratulations! You defeated Bender!!!');
            //that.startGame();
          } else{
            // display the user how many guesses remaining
            console.log('Guesses remaining: ' + that.guessesRemaining);
            console.log(that.currentWord.wordRender());
          }
      }
      if(that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
        that.keepPromptingUser();
      }else if(that.guessesRemaining === 0){
        console.log('Game over! Bender wins!');
        console.log('The word you were guessing was: ' + that.currentWord.word);
      } else{
        console.log(that.currentWord.wordRender());
      }
    });
  }
}

hangman.startGame();



