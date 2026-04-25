(() => {
  // prevent double injection
  if (document.getElementById("musicPlayer")) return;

  // =========================
  // CREATE UI
  // =========================
  const player = document.createElement("div");
  player.id = "musicPlayer";

  player.innerHTML = `
    <button id="playBtn">Play</button>
    🎵 Music
  `;

  document.body.appendChild(player);

  // =========================
  // STYLE INJECTION
  // =========================
  const style = document.createElement("style");
  style.textContent = `
    #musicPlayer {
      position: fixed;
      top: 10px;
      left: 10px;
      z-index: 999999;

      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(8px);

      padding: 8px 12px;
      border-radius: 10px;

      color: white;
      font-family: Arial, sans-serif;
      font-size: 14px;

      display: flex;
      align-items: center;
      gap: 10px;
    }

    #playBtn {
      cursor: pointer;
      background: #4CAF50;
      border: none;
      padding: 5px 10px;
      border-radius: 6px;
      color: white;
      transition: 0.2s;
    }

    #playBtn:hover {
      transform: scale(1.05);
    }

    #playBtn:active {
      transform: scale(0.95);
    }
  `;
  document.head.appendChild(style);

  // =========================
  // AUDIO SETUP
  // =========================
  const audio = document.createElement("audio");
  audio.src = "audio/bloxburg-menu.mp3";
  audio.loop = true;
  audio.volume = 0.5;
  audio.preload = "auto";

  document.body.appendChild(audio);

  let playing = false;
  const btn = player.querySelector("#playBtn");

  // =========================
  // PLAY / PAUSE BUTTON
  // =========================
  btn.onclick = async () => {
    try {
      if (!playing) {
        audio.currentTime = 0;
        await audio.play();
        btn.textContent = "Pause";
      } else {
        audio.pause();
        btn.textContent = "Play";
      }
      playing = !playing;
    } catch (e) {
      console.log("Play blocked:", e);
    }
  };

  // =========================
  // “FAKE AUTOPLAY” (works everywhere)
  // starts on FIRST user interaction anywhere
  // =========================
  function startMusicOnce() {
    audio.currentTime = 0;
    audio.play().catch(() => {});
    playing = true;
    btn.textContent = "Pause";

    window.removeEventListener("click", startMusicOnce);
    window.removeEventListener("touchstart", startMusicOnce);
  }

  window.addEventListener("click", startMusicOnce);
  window.addEventListener("touchstart", startMusicOnce);

  // =========================
  // RESTORE STATE (page navigation)
  // =========================
  window.addEventListener("load", () => {
    const time = localStorage.getItem("musicTime");
    const wasPlaying = localStorage.getItem("musicPlaying");

    if (time) audio.currentTime = parseFloat(time);

    if (wasPlaying === "true") {
      audio.play().then(() => {
        playing = true;
        btn.textContent = "Pause";
      }).catch(() => {});
    }
  });

  window.addEventListener("beforeunload", () => {
    localStorage.setItem("musicTime", audio.currentTime);
    localStorage.setItem("musicPlaying", playing);
  });
})();
