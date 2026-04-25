(function () {

  if (document.getElementById("musicPlayer")) return;

  // =========================
  // AUDIO
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

    removeListeners();
  }

  function removeListeners() {
    var events = ["click", "touchstart", "keydown", "scroll", "wheel"];

    for (var i = 0; i < events.length; i++) {
      if (document.removeEventListener) {
        document.removeEventListener(events[i], startMusic, true);
      } else if (document.detachEvent) {
        document.detachEvent("on" + events[i], startMusic);
      }
    }
  }

  // =========================
  // LISTEN ON ENTIRE DOCUMENT (BUT DOES NOT BLOCK CLICKING)
  // =========================
  var events = ["click", "touchstart", "keydown"];

  for (var i = 0; i < events.length; i++) {
    if (document.addEventListener) {
      document.addEventListener(events[i], startMusic, true);
    } else if (document.attachEvent) {
      document.attachEvent("on" + events[i], startMusic);
    }
  }

})();
