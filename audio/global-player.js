(function () {

  if (document.getElementById("musicPlayer")) return;

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

    // remove handler after first use
    if (document.body.detachEvent) {
      document.body.detachEvent("onclick", startMusic);
    } else {
      document.body.removeEventListener("click", startMusic);
    }
  }

  // =========================
  // IMPORTANT FIX: bind to BODY only (IE-safe)
  // =========================
  if (document.body.attachEvent) {
    document.body.attachEvent("onclick", startMusic);
  } else {
    document.body.addEventListener("click", startMusic);
  }

})();
