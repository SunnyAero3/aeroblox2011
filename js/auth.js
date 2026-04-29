const API = "https://shiny-flower-e05f.sunnyaero3.workers.dev";

function checkLogin() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", API + "/me", true);
    xhr.withCredentials = true;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.responseText.indexOf("LOGGED_IN:") === 0) {
                var username = xhr.responseText.replace("LOGGED_IN:", "");
                var box = document.getElementById("userBox");
                if (box) box.innerHTML = "Welcome, " + username;
            }
        }
    };

    xhr.send();
}

function signupSubmit() {
    var usernameEl = document.getElementById("username");
    var passwordEl = document.getElementById("password");
    var monthEl = document.getElementById("month");
    var yearEl = document.getElementById("year");
    var status = document.getElementById("status");

    var gender = "";
    var radios = document.getElementsByName("gender");
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            gender = radios[i].value;
            break;
        }
    }

    if (!usernameEl || !passwordEl || !monthEl || !yearEl) {
        if (status) status.innerHTML = "Signup form missing fields";
        return false;
    }

    if (!usernameEl.value.trim() || !passwordEl.value.trim() || !monthEl.value || !yearEl.value || !gender) {
        if (status) {
            status.style.color = "red";
            status.innerHTML = "Please fill in all fields";
        }
        return false;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", API + "/signup", true);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (status) {
                    status.style.color = "green";
                    status.innerHTML = "Account created!";
                }
                window.location = "/aeroblox2011/Login/Default.html";
            } else {
                if (status) {
                    status.style.color = "red";
                    status.innerHTML = xhr.responseText || "Signup failed";
                }
            }
        }
    };

    xhr.send(
        "username=" + encodeURIComponent(usernameEl.value.trim()) +
        "&password=" + encodeURIComponent(passwordEl.value.trim()) +
        "&month=" + encodeURIComponent(monthEl.value) +
        "&year=" + encodeURIComponent(yearEl.value) +
        "&gender=" + encodeURIComponent(gender)
    );

    return false;
}

function loginSubmit() {
    var usernameEl = document.getElementById("ctl00_cphRoblox_lRobloxLogin_UserName");
    var passwordEl = document.getElementById("ctl00_cphRoblox_lRobloxLogin_Password");
    var status = document.getElementById("loginStatus");

    if (!usernameEl || !passwordEl) {
        if (status) status.innerHTML = "Missing login fields";
        return false;
    }

    if (!usernameEl.value.trim() || !passwordEl.value.trim()) {
        if (status) {
            status.style.color = "red";
            status.innerHTML = "Enter username and password";
        }
        return false;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", API + "/login", true);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                window.location = "/aeroblox2011/Games.html";
            } else {
                if (status) {
                    status.style.color = "red";
                    status.innerHTML = xhr.responseText || "Invalid login";
                }
            }
        }
    };

    xhr.send(
        "username=" + encodeURIComponent(usernameEl.value.trim()) +
        "&password=" + encodeURIComponent(passwordEl.value.trim())
    );

    return false;
}

window.onload = function () {
    checkLogin();
};
