function singIn(email, password) {
  const obj = {
    email: email,
    password: password,
  };

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://127.0.0.1:3000/api/signin/", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.withCredentials = true;

  xhr.onload = function () {
    if (xhr.status === 200) {
      const resp = JSON.parse(xhr.responseText);
      localStorage.setItem("userFirstName", resp.data.user.first_name);
      localStorage.setItem("userRole", resp.data.user.role);
      if (resp.data.user.role === "admin") {
        window.location.href = "../../dashboard.html";
      }else {
        window.location.href = "../../index.html";
      }
    } else if (xhr.status === 401) {
      console.log("Unauthorized");
    }
  };

  xhr.onerror = function (err) {
    console.error("Request failed", err);
  };

  xhr.send(JSON.stringify(obj));
}

function filedCheck() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (email === "" || password === "") {
    alert("Please fill all the fields");
    return false;
  }
  return true;
}

document.getElementById("singInBtn").addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (filedCheck()) {
    singIn(email, password);
  }
});

document.getElementById("password").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (filedCheck()) {
      singIn(email, password);
    }
  }
});

document.getElementById("email").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (filedCheck()) {
      singIn(email, password);
    }
  }
});

window.onload = function () {
  if (localStorage.getItem("userFirstName") !== null) {
    if (localStorage.getItem("userRole") === "admin") {
      window.location.href = "../../dashboard.html";
    }else {
      window.location.href = "../../index.html";
    }
  }
};