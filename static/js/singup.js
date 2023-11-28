/* */
function createUser(firstName, lastName, email, password) {
  const obj = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
  };

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://127.0.0.1:3000/api/signup/", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.withCredentials = true;

  xhr.onload = function () {
    if (xhr.status === 200) {
      const resp = JSON.parse(xhr.responseText);
      console.log(resp);
      window.location.href = "SingIn.html";
    } else if (xhr.status === 409) {
      console.log("Duplicate email error");
      // Handle duplicate email error here
    }
  };

  xhr.onerror = function (err) {
    console.error("Request failed", err);
  };

  xhr.send(JSON.stringify(obj));
}

document.getElementById("createUserBtn").addEventListener("click", function () {
  const firstName = document.getElementById("Fname").value;
  const lastName = document.getElementById("Lname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("Password").value;
  const confirmPassword = document.getElementById("cPassword").value;

  if (firstName === "" || lastName === "" || email === "" || password === "" || confirmPassword === "") {
    alert("Please fill all the fields.");

    document.getElementById("Fname").style.border = firstName === "" ? "1px solid red" : "1px solid #ced4da";
    document.getElementById("Lname").style.border = lastName === "" ? "1px solid red" : "1px solid #ced4da";
    document.getElementById("email").style.border = email === "" ? "1px solid red" : "1px solid #ced4da";
    document.getElementById("Password").style.border = password === "" ? "1px solid red" : "1px solid #ced4da";
    document.getElementById("cPassword").style.border = confirmPassword === "" ? "1px solid red" : "1px solid #ced4da";

    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  createUser(firstName, lastName, email, password);
});
