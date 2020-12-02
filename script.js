'use strict';

//SELECTING ELEMENT
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePLayer, playing;

///SWITCHING PLAYER
function switchPLayer() {
  currentScore = 0;
  document.getElementById(
    `current--${activePLayer}`
  ).textContent = currentScore;
  activePLayer = activePLayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//STARTING CONDITIONS
function init() {
  scores = [0, 0];
  currentScore = 0;
  activePLayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
}
init();

///DISPLAYIN THE DICE NUMBER
btnRoll.addEventListener('click', function () {
  if (playing) {
    //random dice roll
    const number = Math.trunc(Math.random() * 6) + 1;
    //removing the hidden class
    diceEl.classList.remove('hidden');
    //determining what dice image to display based on the number roll
    diceEl.src = `dice-${number}.png`;
    //CHECKING TO SEE IF ROLLED #1. IF NOT THEN ADD THE DICE TO CURRENT SCORE. IF TRUE THEN SWITCH PLAYERS.
    if (number !== 1) {
      //add dice to current score of active player
      currentScore += number;
      document.getElementById(
        `current--${activePLayer}`
      ).textContent = currentScore;
    } else {
      //switch player
      switchPLayer();
    }
  }
});

///IF PLAYER HOLDS THIER CURRENT SCORE
btnHold.addEventListener('click', function () {
  if (playing) {
    //ADD CURRENT SCORE TO SCORE OF ACTIVE PLAYER
    scores[activePLayer] += currentScore;
    document.getElementById(`score--${activePLayer}`).textContent =
      scores[activePLayer];
    //CHECK IF SCORE IS 100. IF SO FINISH GAME
    if (scores[activePLayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePLayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePLayer}`)
        .classList.remove('player--active');
    } else {
      //SWITCH TO NEXT PLAYER
      switchPLayer();
    }
  }
});

///RESTING THE GAME

btnNew.addEventListener('click', init);
