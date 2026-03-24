const enterScreen = document.getElementById("enterScreen");
const enterBtn = document.getElementById("enterBtn");

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");

const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

let isPlaying = false;

// ENTRAR + AUTOPLAY
enterBtn.onclick = () => {
  enterScreen.classList.add("hide");

  setTimeout(() => {
    audio.play();
    playBtn.innerText = "⏸";
    isPlaying = true;
  }, 300);
};

// PLAY / PAUSE
playBtn.onclick = () => {
  if (isPlaying) {
    audio.pause();
    playBtn.innerText = "▶";
  } else {
    audio.play();
    playBtn.innerText = "⏸";
  }
  isPlaying = !isPlaying;
};

// DURAÇÃO
audio.onloadedmetadata = () => {
  progress.max = audio.duration;
  durationEl.textContent = formatTime(audio.duration);
};

// PROGRESSO
audio.ontimeupdate = () => {
  progress.value = audio.currentTime;
  currentTimeEl.textContent = formatTime(audio.currentTime);
};

// MUDAR TEMPO
progress.oninput = () => {
  audio.currentTime = progress.value;
};

// FORMATAR TEMPO
function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}
