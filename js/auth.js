function signupSubmit() {

    var usernameEl = document.getElementById("username");
    var passwordEl = document.getElementById("password");
    var monthEl = document.getElementById("month");
    var yearEl = document.getElementById("year");
    var status = document.getElementById("status");

    // safety check (IMPORTANT)
    if (!usernameEl || !passwordEl || !monthEl || !yearEl) {
        alert("Signup form missing elements (check IDs)");
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
                window.location = "../Login.html";

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
