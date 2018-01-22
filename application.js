var totalScore = 0;
var dartsThrown = 0;
var player1;
var player2;
var thrower;
var throwerId;
var startScore;
var throwersScore = 0;

function callScore(score)
{    
  if ($("input:radio[name='sounds']:checked").val() == 'on') {
    var srcWav;
  
    if (score == -1)
      srcWav = "sounds/1st.wav"
    else
      srcWav = "sounds/" + score + ".wav"
    var sound = document.getElementById("gameon"); 
    sound.src = srcWav;
    sound.play();
  }
  else if (score >= 0) {
    alert (score);
  }
}

function isValidScore(score)
{
  var validBigScores = [180, 177, 174, 171, 170, 168, 167, 165, 164];
  if ((validBigScores.indexOf(score) > -1) || (score < 163))
    return true;
  else
    return false;
}

function onAFinish(score)
{
  var highFinishes  = [170, 167, 164, 161, 160];
  if ((highFinishes.indexOf(score) > -1) || (score < 159))
    return true;
  else
    return false;
}

function isBust(score, player_score)
{
  if ((parseInt(score) > parseInt(player_score)) || ((parseInt(player_score) - parseInt(score)) == 1))
  {
    callScore(0);
    alert("BUST!");
    return true;
  }
  else
  {
    return false;
  }
}

function weHaveAWinner(score, playerId)
{
  if (score == 0)
  {
    callScore(-1);
    var player = '#lblPlayer' + playerId + 'Name';
    var playerName = $(player).text();
    alert(playerName + " wins the leg!");
    return true;
  }
  return false;
}

function newGame()
{
  $('.newGame').show();
}

function score(multiple,number)
{
  var score1;
  switch (multiple) {
    case 't':
      score1 = number * 3;
      break;
    case 'd':
      score1 = number * 2;
      break;
    case 's':
      score1 = number;
      break;
  }
  return parseInt(score1);
};

$(function() {
  var bullseye = document.getElementById("gameon"); 
  bullseye.src = "sounds/bullseye.mp3"
  bullseye.play();

  var thrower;

  $('.playerInfo').show();
  $('.scoreInput').hide();
  $('.scores').hide();
  $('.newGame').hide();
  $('.mainScoreboard').hide();
  $('#player1Score').val(startScore);
  $('#player2Score').val(startScore);
  $('#tooltip').hide();

  $('.listItemInput').focus();
  var $listItems;

  $('.btnPlayer2').hide();
  $('#listItemInput2').hide();
  //bullseye.play();

  $("#dartboard #areas g").children().hover(
    function(){
      $(this).css("opacity","0.6");
      $('#selectedBed').text($(this).attr("id"));
      $("#tooltip").show();

    },
    function(){
      $(this).css("opacity","0.9");
      $("#tooltip").hide();
    }
  )

  $("#dartboard #areas g").children().click(function(){
    console.log($(this).attr("id"));
    var segment = $(this).attr("id");
    var dartScore = 0;
    dartsThrown++;
    var throwOver = false;
    var multiple;
    switch (segment) {
      case "miss":
        //alert("Missed the board!");
        dartScore = 0;
        break;
      case "Bull":
        dartScore = 50;
        if ($("input:radio[name='sounds']:checked").val() == 'on') {
          bullseye.src="sounds/bullys_moo.mp3";
          bullseye.play();
        }
        break;
      case "Outer":
        dartScore = 25;
        break;
      default:
        multiple = segment.charAt(0);
        var number = segment.substring(1);
        dartScore = score(multiple,number);
        break;
    }

    //throwersScore -= dartScore;
    console.log("throwersScore: ", throwersScore);
    console.log("dartScore: ", dartScore);
    console.log("multiple: ", multiple);
    console.log("segment: ", segment);
    
    if ((dartScore > throwersScore) || (dartScore == throwersScore - 1) ||
      (dartScore == throwersScore && (multiple != 'd' || segment != 'Bull'))) {
        throwOver = true;
    }

    if (dartScore == throwersScore && (multiple == 'd' || segment == 'Bull')) {
      throwOver = true;
      throwersScore -= dartScore;
    }

    if (throwOver == false) {
      throwersScore -= dartScore;
    }

    totalScore += dartScore;
    var dart = "#dart" + dartsThrown;

    $('#throwScore').text(totalScore);
    $(dart).text(segment);

    if (dartsThrown == 3 || throwOver == true) {
      callScore(totalScore);
      processScore(totalScore);
      //alert("You scored " +  totalScore);
      dartsThrown = 0;
      totalScore = 0;
      clearThrow();
      switchThrower();
    }
  });

  function throwerScore() {
    var playerScore = "#player" + throwerId + "Score";
    var currentScore = parseInt($(playerScore).val());
    return currentScore;
  }

  function processScore(score) {
    $listItems = $('#player'+ throwerId + 'Scores');
    var playerScore = "#player" + throwerId + "Score";
    var currentScore = parseInt($(playerScore).val());
    var newScore = parseInt(currentScore) - parseInt(score);
    if (!isBust(score,currentScore))
    {
      var newScore = currentScore - score;
      $(playerScore).val(newScore);
      var itemToAdd = newScore;
      if (weHaveAWinner(newScore,throwerId))
      {
        itemToAdd = "Game Shot!";
        newGame();
      } /*else {
        switchThrower();
      }*/
      if (itemToAdd) {
        $listItems.children('li:last-child').addClass("strikeThrough");
        $('.defaultItem').remove();
        var id = Math.random();
        $listItems.append('<li><input id="' + id + '"  class="scoreboardItem doneItem"   value="' + itemToAdd + '" /> ' + itemToAdd + '</li>');
      }
    }
  }

  function clearThrow()
  {
    for (i = 1; i <= 3; i++) {
      var dart = "#dart" + i;
      $(dart).text("");
    }
    $('#throwScore').text("");
  }

  function switchThrower()
  {
    if (thrower == player1) {
      thrower = player2;
      throwerId = 2;
    } else {
      thrower = player1;
      throwerId = 1;
    }

    var playerScore = "#player" + throwerId + "Score";
    var currentScore = parseInt($(playerScore).val());
    throwersScore = currentScore;
    if (onAFinish(currentScore)) {
      $("#thrower").text(thrower + ", you require " + currentScore);
    } else {
      $("#thrower").text(thrower + " to throw"); 
    }
    $('#throwInfo').show();    
  }

  function startNewGame()
  {
    var startScore = $("input:radio[name='startScore']:checked").val();
    throwersScore = startScore;
    bullseye.src="";
    $('.mainScoreboard').show();
    $('#lblStartScore').text(startScore);
    $('#player1Score').val(startScore);
    $('#player2Score').val(startScore);
    $('#throwInfo').show();

    var player1Name = $('#player1Name').val() != 0 ? $('#player1Name').val() : "Player 1";
    var player2Name = $('#player2Name').val() != 0 ? $('#player2Name').val() : "Player 2";
    player1 = player1Name;
    player2 = player2Name;
    thrower = player1;
    throwerId = 1;
    $("#thrower").text(thrower + " to throw");

    $('#lblPlayer1Name').text(player1Name);
    $('#lblPlayer2Name').text(player2Name);

    $('.playerInfo').hide();
    $('.scoreInput').show();
    $('.scores').show();
    alert("GAME ON!");
    var sound = document.getElementById("gameon"); 
    //sound.play();
  }

  $('.btnStartGame').click(function(e) {
    $('.playerInfo').hide();
    $('.scoreInput').show();
    $('.scores').show();
    startNewGame();
  });

  $('.btnNewGame').click(function(e) {
    $('.newGame').hide();
    if ($("input:radio[name='newGamePlayers']:checked").val() == 'same') {
      $('ul').empty();
      startNewGame();
    }
    else {
      location.reload();
    }
  })
});