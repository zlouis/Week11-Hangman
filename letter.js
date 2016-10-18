var Letter = function(ltr) {
// property to store the actual letter
  this.letter = ltr;
// property/boolean if the letter can be shown
  this.appear = false;

  this.letterRender = function() {
    if(this.letter == ' '){ //renders a blank as it is//
      return '   ';
    }if(this.appear === false){ //if it doesn't appear, it returns a ' _ '//
      return ' _ ';
    } else{ //otherwise it just appears as itself//
      return this.letter;
    }

  };
};

// export to use in word.js
module.exports = Letter;
