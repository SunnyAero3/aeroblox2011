const API = "https://shiny-flower-e05f.sunnyaero3.workers.dev";


// =========================
// AUTO LOGIN CHECK (/me)
// =========================
function checkLogin() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", API + "/me", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            if (xhr.responseText.indexOf("LOGGED_IN:") === 0) {

                var username = xhr.responseText.replace("LOGGED_IN:", "");

                var box = document.getElementById("userBox");
                if (box) {
                    box.innerHTML = "Welcome, " + username;
                }

                window.currentUser = username;
            }
        }
    };

    xhr.send();
}


// =========================
// SIGNUP
// =========================
function signupSubmit() {

    var usernameEl = document.getElementById("username");
    var passwordEl = document.getElementById("password");
    var monthEl = document.getElementById("month");
    var yearEl = document.getElementById("year");
    var status = document.getElementById("status");

    if (!usernameEl || !passwordEl || !monthEl || !yearEl) {
        alert("Missing signup form elements");
        return false;
    }

    var gender = "";
    var radios = document.getElementsByName("gender");

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            gender = radios[i].value;
            break;
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", API + "/signup", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {

            if (xhr.status === 200) {

                if (status) status.innerHTML = "Account created!";
                window.location = "/aeroblox2011/Login.html";

            } else {

                if (status) status.innerHTML = xhr.responseText;
            }
        }
    };

    xhr.send(
        "username=" + encodeURIComponent(usernameEl.value) +
        "&password=" + encodeURIComponent(passwordEl.value) +
        "&month=" + encodeURIComponent(monthEl.value) +
        "&year=" + encodeURIComponent(yearEl.value) +
        "&gender=" + encodeURIComponent(gender)
    );

    return false;
}


// =========================
// LOGIN
// =========================
function loginSubmit() {

    var usernameEl = document.getElementById("username");
    var passwordEl = document.getElementById("password");
    var status = document.getElementById("status");

    if (!usernameEl || !passwordEl) {
        if (status) status.innerHTML = "Missing fields";
        return false;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", API + "/login", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {

            if (xhr.status === 200) {
                window.location = "/aeroblox2011/Games.html";
            } else {
                if (status) status.innerHTML = "Invalid login";
            }
        }
    };

    xhr.send(
        "username=" + encodeURIComponent(usernameEl.value) +
        "&password=" + encodeURIComponent(passwordEl.value)
    );

    return false;
}


// =========================
// INIT (RUN ON EVERY PAGE)
// =========================
window.onload = function () {
    checkLogin();
};
