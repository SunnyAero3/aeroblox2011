(function () {

  // =========================
  // DETECT IE
  // =========================
  var isIE = !!document.documentMode || !!window.ActiveXObject;

  if (isIE) {
    loadIEPlayer();
  } else {
    loadModernPlayer();
  }

  // =========================
  // MODERN VERSION
  // =========================
  function loadModernPlayer() {

    if (document.getElementById("musicPlayer")) return;

    var player = document.createElement("div");
    player.id = "musicPlayer";
    player.innerHTML = '<button id="playBtn">Play</button> 🎵 Music';
    document.body.appendChild(player);

    var style = document.createElement("style");
    style.textContent =
      "#musicPlayer{position:fixed;top:10px;left:10px;z-index:999999;background:rgba(0,0,0,0.6);padding:8px 12px;border-radius:10px;color:white;font-family:Arial;display:flex;align-items:center;gap:10px;}#playBtn{cursor:pointer;background:#4CAF50;border:none;padding:5px 10px;border-radius:6px;color:white;}";
    document.head.appendChild(style);

    var audio = document.createElement("audio");
    audio.src = "audio/bloxburg-menu.mp3";
    audio.loop = true;
    audio.volume = 0.5;
    document.body.appendChild(audio);

    var playing = false;
    var btn = document.getElementById("playBtn");

    btn.onclick = function () {
      if (!playing) {
        audio.currentTime = 0;
        audio.play();
        btn.innerHTML = "Pause";
      } else {
        audio.pause();
        btn.innerHTML = "Play";
      }
      playing = !playing;
    };

    window.addEventListener("click", function startOnce() {
      audio.currentTime = 0;
      audio.play().catch(function(){});
      playing = true;
      btn.innerHTML = "Pause";
      window.removeEventListener("click", startOnce);
    });
  }

  // =========================
  // IE VERSION (simplified, no modern syntax)
  // =========================
  function loadIEPlayer() {

    if (document.getElementById("musicPlayer")) return;

    var player = document.createElement("div");
    player.id = "musicPlayer";
    player.innerHTML = '<button id="playBtn">Play</button> MUSIC';
    document.body.appendChild(player);

    var style = document.createElement("style");
    style.type = "text/css";
    style.cssText =
      "#musicPlayer{position:fixed;top:10px;left:10px;z-index:999999;background:#000000;padding:8px 12px;color:#fff;font-family:Arial;display:block;}#playBtn{margin-right:10px;}";

    document.getElementsByTagName("head")[0].appendChild(style);

    var audio = document.createElement("audio");
    audio.src = "audio/bloxburg-menu.mp3";
    audio.loop = true;
    audio.volume = 0.5;
    document.body.appendChild(audio);

    var playing = false;
    var btn = document.getElementById("playBtn");

    btn.onclick = function () {
      try {
        if (!playing) {
          audio.currentTime = 0;
          audio.play();
          btn.innerHTML = "Pause";
        } else {
          audio.pause();
          btn.innerHTML = "Play";
        }
        playing = !playing;
      } catch (e) {}
    };

    // IE click-to-start fallback
    document.attachEvent
      ? document.attachEvent("onclick", start)
      : document.addEventListener("click", start);

    function start() {
      try {
        audio.currentTime = 0;
        audio.play();
        playing = true;
        btn.innerHTML = "Pause";
      } catch (e) {}
    }
  }

})();
