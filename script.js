const enterScreen = document.getElementById("enterScreen");
const enterBtn = document.getElementById("enterBtn");

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");

const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

let isPlaying = false;

enterBtn.onclick = () => {
  enterScreen.classList.add("hide");

  setTimeout(() => {
    audio.play().then(() => {
      playBtn.innerText = "⏸";
      isPlaying = true;
    }).catch(() => {
      playBtn.innerText = "▶";
      isPlaying = false;
    });
  }, 300);
};

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

audio.onloadedmetadata = () => {
  progress.max = Math.floor(audio.duration);
  durationEl.textContent = formatTime(audio.duration);
};

audio.ontimeupdate = () => {
  progress.value = Math.floor(audio.currentTime);
  currentTimeEl.textContent = formatTime(audio.currentTime);
};

progress.oninput = () => {
  audio.currentTime = progress.value;
};

audio.onended = () => {
  playBtn.innerText = "▶";
  isPlaying = false;
};

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const amount = Math.min(80, window.innerWidth / 18);

  for (let i = 0; i < amount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2,
      s: Math.random() * 0.4 + 0.08,
      o: Math.random() * 0.8
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.o})`;
    ctx.fill();

    p.y += p.s;

    if (p.y > canvas.height) {
      p.y = -5;
      p.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  resize();
  createParticles();
});

resize();
createParticles();
animate();
