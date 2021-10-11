var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1)
})



function checkAnswer(lastClicked) {
  if (gamePattern[lastClicked] === userClickedPattern[lastClicked]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
    console.log("wrong");
    startOver();

  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  $("#level-title").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass("pressed");
  setTimeout(function() {
    $('#' + currentColor).removeClass("pressed");
  }, 100);
}

function gameOver() {
  var gameOverSound = new Audio("sounds/wrong.mp3");
  gameOverSound.play();
  $("body").addClass("game-over");
  setTimeout ( function() {
    $("body").removeClass ("game-over");
  }, 200);
$("#level-title").text("Game Over, Press Any Key to Restart");
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
