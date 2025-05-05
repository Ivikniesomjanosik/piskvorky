import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';
const gameButtons = document.querySelectorAll('.field button');

gameButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.target.disabled = true;

    if (currentPlayer === 'circle') {
      event.target.classList.add('board__field--circle');
      currentPlayer = 'cross';
    } else {
      event.target.classList.add('board__field--cross');
      currentPlayer = 'circle';
    }

    const playerIcon = document.querySelector('.piskvorky__circle img');
    if (currentPlayer === 'circle') {
      playerIcon.src = 'images/circle.svg';
    } else {
      playerIcon.src = 'images/cross.svg';
    }

    let board = [];
    gameButtons.forEach((btn) => {
      if (btn.classList.contains('board__field--cross')) {
        board.push('x');
      } else if (btn.classList.contains('board__field--circle')) {
        board.push('o');
      } else {
        board.push('_');
      }
    });

    const winner = findWinner(board);
    if (winner === 'x' || winner === 'o') {
      alert('Vyhrál hráč se symbolem ' + winner + '.');
      location.reload();
    }
  });
});

const confirmLink = document.querySelector('.piskvorky__restart');
confirmLink.addEventListener('click', (event) => {
  const clickRestart = confirm('Skutečně chceš hru restartovat?');
  if (!clickRestart) {
    event.preventDefault();
  }
});
