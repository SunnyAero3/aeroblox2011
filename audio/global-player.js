(function () {

  function init() {

    var audio = document.createElement("audio");
    audio.src = "audio/bloxburg-menu.mp3";
    audio.loop = true;
    audio.volume = 0.5;
    document.body.appendChild(audio);

    var started = false;

    function startMusic() {
      if (started) return;
      started = true;

      audio.play().catch(function () {});

      document.removeEventListener("click", startMusic);
      document.removeEventListener("touchstart", startMusic);
      document.removeEventListener("keydown", startMusic);
    }

    // whole page acts as trigger zone (no blocking layer)
    document.addEventListener("click", startMusic, false);
    document.addEventListener("touchstart", startMusic, false);
    document.addEventListener("keydown", startMusic, false);

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
