var Throw = function(score) {
  this.score = score;
}

Throw.prototype = {

  isValid: function() {
  var validHighScores = [ 180, 177, 174, 171, 170, 168, 167, 165, 164 ];
    if ((validHighScores.indexOf(this.score) > -1) ||  (this.score < 163 && this.score >= 0)) {
        return true;
    } else {
      return false;
    }
  }
}

module.exports = Throw;