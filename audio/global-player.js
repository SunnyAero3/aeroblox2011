(function () {

  function initMusicSystem() {

    // =========================
    // AUDIO SETUP
    // =========================
    var audio = document.createElement("audio");
    audio.src = "audio/bloxburg-menu.mp3";
    audio.loop = true;
    audio.volume = 0.5;

    document.body.appendChild(audio);

    var started = false;

    function startMusic() {
      if (started) return;
      started = true;

      try {
        audio.currentTime = 0;
        audio.play();
      } catch (e) {}

      // remove listeners after first trigger
      removeListeners();
    }

    function removeListeners() {
      document.removeEventListener("click", startMusic);
      document.removeEventListener("touchstart", startMusic);
      document.removeEventListener("keydown", startMusic);
      document.removeEventListener("mousedown", startMusic);
    }

    function addListeners() {
      document.addEventListener("click", startMusic, false);
      document.addEventListener("touchstart", startMusic, false);
      document.addEventListener("keydown", startMusic, false);
      document.addEventListener("mousedown", startMusic, false);
    }

    addListeners();
  }

  // =========================
  // SAFE START (IMPORTANT)
  // =========================
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMusicSystem);
  } else {
    initMusicSystem();
  }

})();
