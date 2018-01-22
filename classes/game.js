var Player = require('./player');
var Throw = require('./throw');

var Game = function(startScore) {
  var startScore = startScore;
  var player1 = new Player('Player 1', 501);
  var player2 = new Player('Player 2', 501);
};

Game.prototype = {

  gameState: function () {
    var game = new Game(this.startScore);
    game.startScore = this.startScore;
    game.player1 = this.player1;
    game.player2 = this.player2;
    game.winner = this.winner;
    game.thrower = this.thrower;
    console.log(game);
    return game;
  },

  changeThrower: function() {
    if (this.thrower == this.player1) {
      this.thrower = this.player2;
    } else {
      this.thrower = this.player1;
    }
  },

  getPlayer: function(playerNum) {
    //console.log(name);
    return name;
  },

  setPlayer: function(playerNum, playerName) {
    if (playerNum == 1) {
      this.player1 = new Player(playerName, this.startScore);
    } else if (playerNum == 2) {
      this.player2 = new Player(playerName, this.startScore);
    }
  },

  setupGame: function(player1, player2, startScore) {
    console.log(player1 + " " + startScore + " " + player2);
    this.player1 = new Player(player1, startScore);
    this.player2 = new Player(player2, startScore);
    console.log(this);
    this.startScore = startScore;
    this.thrower = this.player1;
    console.log(this);
    return this.gameState();
  },

  start: function() {
    var playerName = this.getPlayer(1);

    this.player1 = new Player(playerName, this.startScore);

    playerName = this.getPlayer(2);

    this.player2 = new Player(playerName, this.startScore);
    //console.log(this.player1.name + ' vs ' + this.player2.name);
    this.thrower = this.player1;
  },

  getScore: function() {
    return score;
  },

  playerThrow: function(score) {
    var t = new Throw(parseInt(score));

    while (!t.isValid()) {
      score = this.getScore();
      t.score = parseInt(score);
    }
      
    this.thrower.throwDarts(t);
    //console.log(this.thrower.name + ' has ' + this.thrower.currentScore);
    if (this.thrower.currentScore == 0) {
      this.winner = this.thrower;
    }
    this.changeThrower();
    //console.log(this.thrower.name + " to throw");
    return this.gameState();
  },

  play: function() {
    this.start();
    do {
      this.getPlayerScore();
    } while (this.winner == null);
    //console.log('\nGame shot, and the leg, to ' + this.winner.name);
  }
};

module.exports = Game;