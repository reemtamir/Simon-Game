'use strict';
const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let isGameOn = false;
let level = 0;
$('body').keydown(function () {
  if (!isGameOn) {
    nextSequence();
    isGameOn = true;
  }
});
function playSound(name) {
  const audio = new Audio(`/sounds/${name}.mp3`);
  audio.play();
}
$('.btn').click(handler);

function handler(ev) {
  $('#level-title').text(`Level ${level}`);
  let userChosenColor = document.getElementById(`${ev.target.id}`);
  userClickedPattern.push(userChosenColor.id);
  playSound(ev.target.id);
  animatePress(ev.target.id);
  checkAnswer(userClickedPattern.length - 1);
}

function nextSequence() {
  userClickedPattern = [];
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

  console.log('game pattern', gamePattern);
  console.log('user click', userClickedPattern);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      level++;
      $('#level-title').text('Level ' + level);
    }
  } else {
    console.log('wrong');
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 300);
    $('#level-title').text(`Game Over, Press Any Key to Restart`);
    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  isGameOn = false;
}
function animatePress(currentColor) {
  $(`#${currentColor}`).addClass('pressed');
  setTimeout(() => {
    $(`#${currentColor}`).removeClass('pressed');
  }, 50);
}
