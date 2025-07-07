const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');

const audioStart = new Audio('./src/audio/audio_theme.mp3');
const audioGameOver = new Audio('./src/audio/audio_gameover.mp3');

let gameLoop = null;

const startGame = () => {
  clearInterval(gameLoop); // Limpa loop anterior
  pipe.classList.add('pipe-animation');
  start.style.display = 'none';
  audioStart.play();
  loop(); // Inicia o loop
};

const restartGame = () => {
  gameOver.style.display = 'none';
  pipe.style.left = '';
  pipe.style.right = '0';
  mario.src = 'img/mario.gif';
  mario.style.width = '150px';
  mario.style.bottom = '0';
  start.style.display = 'none';
  audioGameOver.pause();
  audioGameOver.currentTime = 0;
  audioStart.play();
  audioStart.currentTime = 0;
  startGame(); // Reinicia o jogo
};

const jump = () => {
  mario.classList.add('jump');
  setTimeout(() => {
    mario.classList.remove('jump');
  }, 800);
};

const loop = () => {
  clearInterval(gameLoop); // Garante que só um loop roda
  gameLoop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.classList.remove('pipe-animation');
      pipe.style.left = `${pipePosition}px`;
      mario.classList.remove('jump');
      mario.style.bottom = `${marioPosition}px`;
      mario.src = 'img/game-over.gif';
      mario.style.width = '80px';
      mario.style.marginLeft = '50px';

      audioStart.pause();
      audioGameOver.play();
      setTimeout(() => audioGameOver.pause(), 7000);

      gameOver.style.display = 'flex';
      clearInterval(gameLoop);
    }
  }, 10);
};

// Remova o loop() daqui, pois agora ele é chamado em startGame/restartGame

document.addEventListener('keypress', e => {
  if (e.key === ' ') jump();
});

document.addEventListener('touchstart', e => {
  if (e.touches.length) jump();
});

document.addEventListener('keypress', e => {
  if (e.key === 'Enter') startGame();
});

// Permite que os botões HTML chamem as funções
window.startGame = startGame;
window.restartGame = restartGame;