/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, activePlayer, roundScore, previousRoll, winningScore;

var playing;

const selections = {
  scoreZero: document.querySelector('#score-0'),
  scoreOne: document.querySelector('#score-1'),
  currentZero: document.querySelector('#current-0'),
  currentOne: document.querySelector('#current-1'),
  playerOnePanel: document.querySelector('.player-0-panel'),
  playerTwoPanel: document.querySelector('.player-1-panel'),
  diceImage: document.querySelector('.dice')
};

init();



function init() {
  selections.scoreZero.textContent = '-';
  selections.scoreOne.textContent = '-';
  selections.currentZero.textContent = '-';
  selections.currentOne.textContent = '-';
  selections.playerOnePanel.classList.remove('active');
  selections.playerTwoPanel.classList.remove('active');
  selections.diceImage.style.display = 'none';
  playing = 0;
}

function newGame() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  playing = 1;
  selections.playerOnePanel.classList.add('active');
  selections.playerTwoPanel.classList.remove('active');
  document.querySelector('#score-0').textContent = '0';
  document.querySelector('#score-1').textContent = '0';
  document.querySelector('#current-0').textContent = '0';
  document.querySelector('#current-1').textContent = '0';
  document.querySelector('.dice').style.display = 'none';
  winningScore = prompt('Enter the winning score');
}

function nextPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  roundScore = 0;
  document.querySelector('.dice').style.display = 'none';
  
  selections.playerOnePanel.classList.toggle('active');
  selections.playerTwoPanel.classList.toggle('active');

  document.querySelector('#current-0').textContent = '0';
  document.querySelector('#current-1').textContent = '0';
  
}

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (playing !== 0) {
    var diceValue = Math.floor(Math.random() * 6) + 1;
    previousRoll = diceValue;
    document.querySelector('.dice').src = `dice-${diceValue}.png`;
    document.querySelector('.dice').style.display = 'block';
  
    if (diceValue === 6 && previousRoll === 6) {
      roundScore = 0;
      scores[activePlayer] = 0;
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
      document.querySelector(`#score-${activePlayer}`).textContent = 0;
      nextPlayer();
    } else if (diceValue !== 1) {
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
    if (scores[activePlayer] >= winningScore) {
      selections.playerOnePanel.classList.remove('active');
      selections.playerTwoPanel.classList.remove('active');
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
