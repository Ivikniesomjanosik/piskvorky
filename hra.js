import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';
const gameButtons = document.querySelectorAll('.field button');

const playAiMove = async () =>{
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

    const response = await fetch('https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      board: board,
      player: 'x',
    }),
  });

  const data = await response.json();
  const { x, y } = data.position;
  const index = x + y * 10;
  gameButtons [index].click();
  };

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
  
    /* vytváram funkciu po ťahu, ak zahrá krížik, nasleduje AI, zároveň oddeľujem reakciu používateľa a reakciu AI*/

    if(currentPlayer === 'cross'){
      playAiMove();
    };

    
  
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
