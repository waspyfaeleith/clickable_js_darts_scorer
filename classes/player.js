var Throw = require('./throw');

var Player = function(name, startScore) {
  this.name = name;
  this.currentScore = startScore;
  this.scores = [this.currentScore];
  //console.log(startScore);
  //this.scores.push(startScore);
};

Player.prototype = {
  throwDarts: function(playerThrow) {
    if (playerThrow.isValid() && !this.isBust(playerThrow)) {
      this.currentScore -= playerThrow.score;
      this.scores.push(this.currentScore);
    }
  },

  isBust: function(playerThrow) {
    if ((playerThrow.score > this.currentScore) || 
          ((this.currentScore - playerThrow.score) == 1) ) {
      console.log('BUST!!');
      alert('Bust!!!');
      return true;
    }
    return false;
  },
  
  isOnAFinish: function() {  
    var highFinishes  = [ 170, 167, 164, 161, 160 ];
    if ( (highFinishes.indexOf(this.currentScore) > -1 ) 
      || (this.currentScore < 159)) {
        return true;
    } else {
      return false;
    }
  },
  
  isWinningScore: function(playerThrow) {
    if (playerThrow.score == this.currentScore) {
      return true;
    }
    return false;
  }
}

module.exports = Player;