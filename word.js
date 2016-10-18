// require letter objects
var Letter = require('./letter.js');

function Word(wrd) {
  var that = this;
  //store the string wrd
  this.word = wrd;
  //collection of letter objects
  this.letters = [];
  this.wordFound = false;

  this.getLets = function() {
    //populate the collection above with new Letter objects
    for(var i = 0; i<that.word.length; i++){
      var newLetter = new Letter(that.word[i]);
      this.letters.push(newLetter);
    }
  };

  //found the current word
  this.didWeFindTheWord = function() {
    var stillBlank = false;
    //checks to see if there are any blanks
    for(var i=0; i<that.letters.length; i++) {
      if(that.letters[i] == ' _ '){
        var stillBlank = true;
      }
    }
    //if there are no blanks, word has been found!
    if(stillBlank!=true){
      this.wordFound = true;
    }

    return this.wordFound;
  };

  this.checkIfLetterFound = function(guessedLetter) {
    var whatToReturn = 0;
      //iterates through the collection of letter Objects.
      for(var i = 0; i<that.letters.length; i++){
        if(that.letters[i] === that.guessedLetter) {
          that.letters[i].appear = true;
          whatToReturn = 1;
        }
      }
    //if guessLetter matches Letter property, the letter object should be shown
    return whatToReturn;
  };

  this.wordRender = function() {
    var display = '';
    //render the word based on if letters are found or not
    that.letters.forEach(function(lttr){
      var currentLetter = lttr.letterRender();
      display+= currentLetter;
    });

    return display;
  };
}

module.exports = Word;
