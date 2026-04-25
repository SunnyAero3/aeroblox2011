(() => {
  // prevent double injection
  if (document.getElementById("musicPlayer")) return;

  // create player UI
  const player = document.createElement("div");
  player.id = "musicPlayer";

  player.innerHTML = `
    <button id="playBtn">Play</button>
    🎵 Music
  `;

  document.body.appendChild(player);

  // style injection (no CSS file needed)
  const style = document.createElement("style");
  style.innerHTML = `
    #musicPlayer {
      position: fixed;
      top: 10px;
      left: 10px;
      z-index: 999999;

      background: rgba(0,0,0,0.6);
      padding: 8px 12px;
      border-radius: 10px;
      color: white;

      display: flex;
      align-items: center;
      gap: 10px;
      font-family: Arial;
    }

    #playBtn {
      cursor: pointer;
      background: #4CAF50;
      border: none;
      padding: 5px 10px;
      border-radius: 6px;
      color: white;
    }
  `;
  document.head.appendChild(style);

  // audio
  const audio = new Audio("audio/bloxburg-menu.mp3");
  audio.loop = true;
  audio.volume = 0.5;

  let playing = false;
  const btn = player.querySelector("#playBtn");

  btn.onclick = async () => {
    if (!playing) {
      await audio.play();
      btn.innerText = "Pause";
    } else {
      audio.pause();
      btn.innerText = "Play";
    }
    playing = !playing;
  };

  // restore state
  window.addEventListener("load", async () => {
    const time = localStorage.getItem("musicTime");
    const wasPlaying = localStorage.getItem("musicPlaying");

    if (time) audio.currentTime = parseFloat(time);

    if (wasPlaying === "true") {
      try {
        await audio.play();
        playing = true;
        btn.innerText = "Pause";
      } catch (e) {}
    }
  });

  window.addEventListener("beforeunload", () => {
    localStorage.setItem("musicTime", audio.currentTime);
    localStorage.setItem("musicPlaying", playing);
  });
})();
