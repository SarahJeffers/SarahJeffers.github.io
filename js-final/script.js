document.addEventListener('DOMContentLoaded', function() {
  const cells = document.querySelectorAll('.cell');
  const status = document.getElementById('status');
  const scoreValue = document.getElementById('scoreValue');
  const resetButton = document.getElementById('resetButton');
  const playButton = document.getElementById('playButton');
  const pauseButton = document.getElementById('pauseButton');
  const bgMusic = document.getElementById('bgMusic');
  const difficultySelector = document.getElementById('difficulty');

  let currentPlayer = 'X';
  let score = 0;
  let resetScore = false;
  let isPlaying = false;
  let computerMoveProbability = 1 / 2; // Default probability for computer move

  resetButton.addEventListener('click', () => {
    resetScore = true;
    resetGame();
  });

  playButton.addEventListener('click', togglePlayback);
  pauseButton.addEventListener('click', pauseMusic);

  function togglePlayback() {
    if (!isPlaying) {
      playMusic();
    } else {
      pauseMusic();
    }
  }

  function playMusic() {
    bgMusic.play();
    isPlaying = true;
    playButton.src = "playing.png";
    pauseButton.src = "pause.png";
  }

  function pauseMusic() {
    bgMusic.pause();
    isPlaying = false;
    playButton.src = "play.png";
    pauseButton.src = "paused.png";
  }

  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });

  difficultySelector.addEventListener('change', function() {
    const difficulty = this.value;
    switch (difficulty) {
      case 'baby':
        computerMoveProbability = 1 / 3;
        break;
      case 'hard':
        computerMoveProbability = 2 / 3;
        break;
      case 'extra-hard':
        computerMoveProbability = 9 / 10;
        break;
      default:
        computerMoveProbability = 1 / 2;
        break;
    }
  });

  function handleCellClick(event) {
    const cell = event.target;
    if (cell.classList.contains('cell') && !cell.textContent) {
      cell.textContent = currentPlayer;
      if (checkWin(currentPlayer)) {
        status.textContent = `${currentPlayer} wins!`;
        if (!resetScore) {
          score++;
          scoreValue.textContent = score;
          updateMusicVolume();
        }
        setTimeout(resetGame, 1000);
      } else if (checkDraw()) {
        status.textContent = "It's a draw!";
        setTimeout(resetGame, 1000);
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
        if (currentPlayer === 'O') {
          if (Math.random() < computerMoveProbability) {
            setTimeout(strategicComputerMove, 500);
          } else {
            setTimeout(randomComputerMove, 500);
          }
        }
      }
    }
  }

  function checkWin(player) {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    return winConditions.some(condition => {
      return condition.every(index => cells[index].textContent === player);
    });
  }

  function checkDraw() {
    return [...cells].every(cell => cell.textContent);
  }

  function strategicComputerMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < cells.length; i++) {
      if (!cells[i].textContent) {
        cells[i].textContent = 'O';
        let score = minimax(cells, 0, false);
        cells[i].textContent = '';
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    cells[move].textContent = 'O';
    if (checkWin('O')) {
      status.textContent = 'Computer wins!';
      resetScore = true;
      setTimeout(resetGame, 1000);
    } else if (checkDraw()) {
      status.textContent = "It's a draw!";
      setTimeout(resetGame, 1000);
    } else {
      currentPlayer = 'X';
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  }

  function randomComputerMove() {
    const emptyCells = [...cells].filter(cell => !cell.textContent);
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cell = emptyCells[randomIndex];
    cell.textContent = 'O';
    if (checkWin('O')) {
      status.textContent = 'Computer wins!';
      resetScore = true;
      setTimeout(resetGame, 1000);
    } else if (checkDraw()) {
      status.textContent = "It's a draw!";
      setTimeout(resetGame, 1000);
    } else {
      currentPlayer = 'X';
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  }

  function minimax(cells, depth, isMaximizing) {
    if (checkWin('X')) {
      return -10;
    } else if (checkWin('O')) {
      return 10;
    } else if (checkDraw()) {
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < cells.length; i++) {
        if (!cells[i].textContent) {
          cells[i].textContent = 'O';
          let score = minimax(cells, depth + 1, false);
          cells[i].textContent = '';
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < cells.length; i++) {
        if (!cells[i].textContent) {
          cells[i].textContent = 'X';
          let score = minimax(cells, depth + 1, true);
          cells[i].textContent = '';
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  function updateMusicVolume() {
    bgMusic.volume = score === 0 ? 0 : score / 100;
  }

  function resetGame() {
    cells.forEach(cell => {
      cell.textContent = '';
    });
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
    if (resetScore) {
      score = 0;
      scoreValue.textContent = score;
      resetScore = false;
      updateMusicVolume();
    }
  }

  updateMusicVolume();
});
