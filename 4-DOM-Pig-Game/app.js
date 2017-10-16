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

init();

function init() {
  document.querySelector('#score-0').textContent = '-';
  document.querySelector('#score-1').textContent = '-';
  document.querySelector('#current-0').textContent = '-';
  document.querySelector('#current-1').textContent = '-';
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.dice').style.display = 'none';
  playing = 0;
}

function newGame() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  playing = 1;
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('#score-0').textContent = '0';
  document.querySelector('#score-1').textContent = '0';
  document.querySelector('#current-0').textContent = '0';
  document.querySelector('#current-1').textContent = '0';
  document.querySelector('.dice').style.display = 'none';

}

function nextPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  roundScore = 0;
  document.querySelector('.dice').style.display = 'none';
  
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('#current-0').textContent = '0';
  document.querySelector('#current-1').textContent = '0';
  
}

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (playing !== 0) {
    var diceValue = Math.floor(Math.random() * 6) + 1;
    console.log(diceValue);
  
  
    document.querySelector('.dice').src = `dice-${diceValue}.png`;
    document.querySelector('.dice').style.display = 'block';
  
    if (diceValue !== 1) {
      roundScore += diceValue;
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (playing !== 0) {
    scores[activePlayer] += roundScore;
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      document.querySelector('.player-0-panel').classList.remove('active');
      document.querySelector('.player-1-panel').classList.remove('active');
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`#name-${activePlayer}`).textContent = 'WINNER!';
      document.querySelector('.dice').style.display = 'none';
      
      
      playing = 0;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', newGame);
