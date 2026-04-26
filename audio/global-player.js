(function () {

  function init() {

    var audio = new Audio("audio/bloxburg-menu.mp3");
    audio.loop = true;
    audio.volume = 0.5;

    var started = false;

    function startMusic() {
      if (started) return;
      started = true;

      console.log("Trying to play audio...");

      var playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(function () {
            console.log("Audio playing successfully");
          })
          .catch(function (err) {
            console.log("Audio blocked or failed:", err);
            alert("Audio failed to play. Check file path or browser block.");
          });
      }

      document.removeEventListener("click", startMusic);
      document.removeEventListener("touchstart", startMusic);
      document.removeEventListener("keydown", startMusic);
    }

    document.addEventListener("click", startMusic);
    document.addEventListener("touchstart", startMusic);
    document.addEventListener("keydown", startMusic);

    console.log("Music system initialized");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
