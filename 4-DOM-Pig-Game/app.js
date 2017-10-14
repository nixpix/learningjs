/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, activePlayer, roundScore;

var playing;

function init() {
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;

  document.querySelector('#score-0').textContent = '0';
  document.querySelector('#score-1').textContent = '0';
  document.querySelector('#current-0').textContent = '0';
  document.querySelector('#current-1').textContent = '0';
  document.querySelector('.dice').style.display = 'none';




}

init();

function nextPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  roundScore = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-roll').addEventListener('click', function() {
  var diceValue = Math.floor(Math.random() * 6) + 1;
  console.log(diceValue);


  document.querySelector('.dice').src = `dice-${diceValue}.png`;
  document.querySelector('.dice').style.display = 'block';

  if (diceValue !== 1) {
    roundScore += diceValue;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;

  } else {
    nextPlayer();
  }

});
