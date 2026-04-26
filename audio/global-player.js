(function () {

  function init() {

    var audio = new Audio();
    audio.src = "audio/bloxburg-menu.mp3";
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = "auto";

    var started = false;

    function startMusic() {
      if (started) return;
      started = true;

      console.log("Click detected → trying audio");

      var playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(function () {
            console.log("Audio playing (Chrome OK)");
          })
          .catch(function (err) {
            console.log("Chrome blocked audio:", err);
          });
      }

      document.removeEventListener("click", startMusic);
      document.removeEventListener("touchstart", startMusic);
    }

    document.addEventListener("click", startMusic, { once: true });
    document.addEventListener("touchstart", startMusic, { once: true });

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
