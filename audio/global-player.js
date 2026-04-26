(function () {

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {

    if (document.getElementById("musicPlayer")) return;

    var storageTime = "musicTime";
    var storagePlaying = "musicPlaying";

    var startedByInteraction = false;
    var playing = false;

    var audio = document.createElement("audio");
    audio.src = "audio/bloxburg-menu.mp3";
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = "auto";
    document.body.appendChild(audio);

    // =========================
    // UI
    // =========================
    var player = document.createElement("div");
    player.id = "musicPlayer";

    player.innerHTML =
      '<button id="playBtn">Play</button>' +
      '<span id="label">Music</span>';

    document.body.appendChild(player);

    var style = document.createElement("style");
    style.textContent =
      "#musicPlayer{" +
      "position:fixed;top:10px;left:10px;z-index:999999;" +
      "display:flex;gap:10px;align-items:center;" +
      "padding:8px 12px;border-radius:12px;" +
      "background:rgba(0,0,0,0.65);color:#fff;" +
      "font-family:Arial;font-size:14px;}" +
      "#playBtn{cursor:pointer;border:0;padding:6px 12px;" +
      "border-radius:8px;background:#4CAF50;color:#fff;}" +
      "#playBtn:hover{background:#45a049;}";

    document.head.appendChild(style);

    var btn = document.getElementById("playBtn");
    var label = document.getElementById("label");

    function updateUI() {
      if (playing) {
        btn.innerHTML = "Pause";
        label.innerHTML = "Music On";
      } else {
        btn.innerHTML = "Play";
        label.innerHTML = "Music";
      }
    }

    function safePlay(fromStart) {
      try {
        if (fromStart) audio.currentTime = 0;
        var p = audio.play();
        if (p && p.catch) p.catch(function () {});
        playing = true;
        updateUI();
      } catch (e) {}
    }

    function safePause() {
      try {
        audio.pause();
      } catch (e) {}
      playing = false;
      updateUI();
    }

    // =========================
    // CLICK ANYWHERE START
    // =========================
    function startMusicOnce() {
      if (startedByInteraction) return;
      startedByInteraction = true;

      safePlay(true);
      removeStartListeners();
    }

    function removeStartListeners() {
      document.removeEventListener("click", startMusicOnce);
      document.removeEventListener("touchstart", startMusicOnce);
      document.removeEventListener("keydown", startMusicOnce);
    }

    document.addEventListener("click", startMusicOnce, false);
    document.addEventListener("touchstart", startMusicOnce, false);
    document.addEventListener("keydown", startMusicOnce, false);

    // =========================
    // BUTTON CONTROL
    // =========================
    btn.onclick = function () {
      if (playing) safePause();
      else safePlay(true);
    };

    // =========================
    // SAVE STATE
    // =========================
    window.onbeforeunload = function () {
      try {
        localStorage.setItem(storageTime, audio.currentTime);
        localStorage.setItem(storagePlaying, playing);
      } catch (e) {}
    };

    function loadState() {
      try {
        var t = localStorage.getItem(storageTime);
        var p = localStorage.getItem(storagePlaying);

        if (t) audio.currentTime = parseFloat(t);

        if (p === "true") {
          playing = true;
          safePlay(false);
        }

        updateUI();
      } catch (e) {
        updateUI();
      }
    }

    audio.onerror = function () {
      label.innerHTML = "Audio error";
    };

    loadState();

  });

})();
