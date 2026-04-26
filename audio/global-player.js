(function () {
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function initMusicPlayer() {
    if (document.getElementById("musicPlayer")) return;

    var storageKeyTime = "musicTime";
    var storageKeyPlaying = "musicPlaying";

    var isIE = !!document.documentMode;

    var player = document.createElement("div");
    player.id = "musicPlayer";
    player.innerHTML = [
      '<button id="playBtn" type="button">Play</button>',
      '<span id="musicLabel">Music</span>'
    ].join("");

    var style = document.createElement("style");
    style.type = "text/css";
    style.textContent = [
      "#musicPlayer{",
      "position:fixed;",
      "top:10px;",
      "left:10px;",
      "z-index:999999;",
      "display:flex;",
      "align-items:center;",
      "gap:10px;",
      "padding:8px 12px;",
      "border-radius:12px;",
      "background:rgba(0,0,0,0.65);",
      "color:#fff;",
      "font-family:Arial, sans-serif;",
      "font-size:14px;",
      "box-shadow:0 4px 16px rgba(0,0,0,0.35);",
      "}",
      "#playBtn{",
      "cursor:pointer;",
      "border:0;",
      "padding:6px 12px;",
      "border-radius:8px;",
      "background:#4CAF50;",
      "color:#fff;",
      "font-family:inherit;",
      "font-size:13px;",
      "}",
      "#playBtn:hover{background:#45a049;}",
      "#playBtn:active{transform:scale(0.98);}",
      "#musicLabel{",
      "user-select:none;",
      "white-space:nowrap;",
      "}"
    ].join("");

    document.head.appendChild(style);
    document.body.appendChild(player);

    var audio = document.createElement("audio");
    audio.src = "audio/bloxburg-menu.mp3";
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = "auto";
    document.body.appendChild(audio);

    var btn = document.getElementById("playBtn");
    var label = document.getElementById("musicLabel");

    var startedByInteraction = false;
    var playing = false;

    function setButtonState() {
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
        if (fromStart) {
          audio.currentTime = 0;
        }
        var result = audio.play();
        if (result && typeof result.catch === "function") {
          result.catch(function () {});
        }
        playing = true;
        setButtonState();
      } catch (e) {}
    }

    function safePause() {
      try {
        audio.pause();
      } catch (e) {}
      playing = false;
      setButtonState();
    }

    function toggleMusic() {
      if (playing) {
        safePause();
      } else {
        safePlay(true);
      }
    }

    function startOnce() {
      if (startedByInteraction) return;
      startedByInteraction = true;
      safePlay(true);
      detachStartListeners();
    }

    function detachStartListeners() {
      if (document.removeEventListener) {
        document.removeEventListener("click", startOnce, false);
        document.removeEventListener("touchstart", startOnce, false);
        document.removeEventListener("keydown", startOnce, false);
        document.removeEventListener("mousedown", startOnce, false);
      } else if (document.detachEvent) {
        document.detachEvent("onclick", startOnce);
        document.detachEvent("ontouchstart", startOnce);
        document.detachEvent("onkeydown", startOnce);
        document.detachEvent("onmousedown", startOnce);
      }
    }

    function addStartListeners() {
      if (document.addEventListener) {
        document.addEventListener("click", startOnce, false);
        document.addEventListener("touchstart", startOnce, false);
        document.addEventListener("keydown", startOnce, false);
        document.addEventListener("mousedown", startOnce, false);
      } else if (document.attachEvent) {
        document.attachEvent("onclick", startOnce);
        document.attachEvent("ontouchstart", startOnce);
        document.attachEvent("onkeydown", startOnce);
        document.attachEvent("onmousedown", startOnce);
      }
    }

    function loadSavedState() {
      try {
        var savedTime = localStorage.getItem(storageKeyTime);
        var savedPlaying = localStorage.getItem(storageKeyPlaying);

        if (savedTime !== null && savedTime !== "") {
          audio.currentTime = parseFloat(savedTime) || 0;
        }

        if (savedPlaying === "true") {
          playing = true;
          setButtonState();
          safePlay(false);
        } else {
          playing = false;
          setButtonState();
        }
      } catch (e) {
        setButtonState();
      }
    }

    function saveState() {
      try {
        localStorage.setItem(storageKeyTime, String(audio.currentTime || 0));
        localStorage.setItem(storageKeyPlaying, String(playing));
      } catch (e) {}
    }

    btn.onclick = function () {
      toggleMusic();
    };

    window.onbeforeunload = function () {
      saveState();
    };

    audio.onended = function () {
      playing = false;
      setButtonState();
    };

    audio.onerror = function () {
      playing = false;
      label.innerHTML = isIE ? "Audio blocked" : "Audio error";
      btn.innerHTML = "Play";
    };

    addStartListeners();
    loadSavedState();
  }

  ready(initMusicPlayer);
})();
