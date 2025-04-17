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
  });
});

const confirmLink = document.querySelector('.piskvorky__restart');

confirmLink.addEventListener('click', (event) => {
  const clickRestart = confirm('Skutečně chceš hru restartovat?');

  if (clickRestart === true) {
    
  } else {
    event.preventDefault();
  }
});
