// Define isPlaying variable in the global scope
let isPlaying = false;

// Define updateProgressBar function
function updateProgressBar() {
  const currentTime = bgMusic.currentTime;
  const duration = bgMusic.duration;
  const progress = (currentTime / duration) * 100;
  progressBar.style.width = progress + '%';
}

// Define playMusic function
function playMusic() {
  bgMusic.play();
  isPlaying = true;
  playButton.src = "playing.png";
  pauseButton.src = "pause.png";
  updateProgressBar(); // Update progress bar when music starts playing
}

// Define pauseMusic function
function pauseMusic() {
  bgMusic.pause();
  isPlaying = false;
  playButton.src = "play.png";
  pauseButton.src = "paused.png";
}

// Define togglePlayback function
window.togglePlayback = function() {
  if (!isPlaying) {
    playMusic();
  } else {
    pauseMusic();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const cells = document.querySelectorAll('.cell');
  const status = document.getElementById('status');
  const scoreValue = document.getElementById('scoreValue');
  const resetButton = document.getElementById('resetButton');
  const playButton = document.getElementById('playButton');
  const pauseButton = document.getElementById('pauseButton');
  const progressBar = document.getElementById('progressBar'); // Get the progress bar element
  const progressBarContainer = document.querySelector('.progress-bar-container');
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



  function togglePlayback() {
    if (!isPlaying) {
      playMusic();
    } else {
      pauseMusic();
    }
  }
  playButton.addEventListener('click', togglePlayback);
  pauseButton.addEventListener('click', togglePlayback);

  function playMusic() {
    bgMusic.play();
    isPlaying = true;
    playButton.src = "playing.png";
    pauseButton.src = "pause.png";
    updateProgressBar(); // Update progress bar when music starts playing
  }

  function pauseMusic() {
    bgMusic.pause();
    isPlaying = false;
    playButton.src = "play.png";
    pauseButton.src = "paused.png";
  }

  bgMusic.addEventListener('timeupdate', updateProgressBar); // Update progress bar as the song plays

  function updateProgressBar() {
    const currentTime = bgMusic.currentTime;
    const duration = bgMusic.duration;
    const progress = (currentTime / duration) * 100;
    progressBar.style.width = progress + '%';
  }

  // Add click event listener to the progress bar to skip to a specific time
  // Add click event listener to the progress bar container to skip to a specific time
  progressBarContainer.addEventListener('click', (event) => {
    const clickX = event.clientX - progressBarContainer.getBoundingClientRect().left; // Get click position relative to the progress bar container
    const progressBarWidth = progressBarContainer.clientWidth;
    const skipTime = (clickX / progressBarWidth) * bgMusic.duration;
    bgMusic.currentTime = skipTime;
    updateProgressBar(); // Update progress bar after skipping
  });




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

  // Update progress text elements with elapsed time and total duration
function updateProgressText() {
  const currentTime = bgMusic.currentTime;
  const duration = bgMusic.duration;
  const currentTimeFormatted = formatTime(currentTime);
  const durationFormatted = formatTime(duration);
  document.querySelector('.progress-text-left').textContent = currentTimeFormatted;
  document.querySelector('.progress-text-right').textContent = durationFormatted;
}

// Helper function to format time in MM:SS format
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Call updateProgressText() in the timeupdate event listener
bgMusic.addEventListener('timeupdate', () => {
  updateProgressBar();
  updateProgressText(); // Update progress text along with the progress bar
});
// Define a function to update the volume percentage text
function updateVolumePercentage() {
  const volumePercentage = Math.round(bgMusic.volume * 100); // Calculate volume percentage
  document.querySelector('.volume-percentage').textContent = `${volumePercentage}%`; // Update text content
}

// Call updateVolumePercentage() whenever the volume changes
bgMusic.addEventListener('volumechange', updateVolumePercentage);

// Get the plus and minus buttons
const volumeMinus = document.getElementById('volumeMinus');
const volumePlus = document.getElementById('volumePlus');

// Add click event listeners to the plus and minus buttons
volumeMinus.addEventListener('click', () => {
  // Scroll to the Tic Tac Toe board container with smooth behavior
  document.getElementById('gameContainer').scrollIntoView({ behavior: 'smooth' });
});

volumePlus.addEventListener('click', () => {
  // Scroll to the Tic Tac Toe board container with smooth behavior
  document.getElementById('gameContainer').scrollIntoView({ behavior: 'smooth' });
});


});

