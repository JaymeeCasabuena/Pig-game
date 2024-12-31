'use strict';
// SELECTING ELEMENTS
const dice = document.querySelector('.dice');
// const player1 = document.querySelector('#score--0');
const score1 = document.getElementById('score--0');
const score2 = document.getElementById('score--1');
const allScores = document.querySelectorAll('.score');
const current1 = document.getElementById('current--0');
const current2 = document.getElementById('current--1');
const allCurrent = document.querySelectorAll('.current');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

//STARTING CONDITIONS
let playing, currentScore, activePlayer, scores;

const init = () => {
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  dice.classList.add('hidden');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  current1.textContent = 0;
  current2.textContent = 0;
  score1.textContent = 0;
  score2.textContent = 0;
};

init();

const switchPlayer = () => {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

// SWITCH PLAYERS
btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `images/dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayer();
      currentScore = 0;
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
    }
  }
});

btnNew.addEventListener('click', init);
