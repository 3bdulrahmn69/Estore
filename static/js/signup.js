/* */
const lesIp = '34.224.17.42'

function createUser(firstName, lastName, email, password) {
  const obj = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
  };

  fetch(`http://${lesIp}:3000/api/signup/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(obj),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 409) {
        console.log("Duplicate email error");
        // Handle duplicate email error here
        throw new Error("Duplicate email error");
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((resp) => {
      console.log(resp);
      window.location.href = "SignIn.html";
    })
    .catch((err) => {
      console.error("Request failed", err);
    });
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

document.getElementById("cPassword").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
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
  }
});


document.querySelector(".icon-bars").addEventListener("click", function () {
  if (document.querySelector(".nav-items ul").style.display == "flex") {
      document.querySelector(".nav-items ul").style.display = "none"
  } else {
      document.querySelector(".nav-items ul").style.display = "flex";
  }
});

/* Start Search box */
function createSearchItem(prodId, prodName, prodImage) {
  const itemBox = document.createElement("div");
  itemBox.className = "product-search-box";
  itemBox.style.cssText = "cursor: pointer;";
    itemBox.addEventListener('click',function(){
        window.location.href = `productPage.html?productId=${prodId}`;
    });

  const itemImage = document.createElement("div");
  itemImage.className = "pic-search-box";
  itemBox.appendChild(itemImage);

  const img = document.createElement("img");
  img.src = prodImage[0].image
  itemImage.appendChild(img);

  const name = document.createElement("p");
  name.textContent = prodName;
  itemBox.appendChild(name);

  document.querySelector(".search-section").appendChild(itemBox);
};
function searchProducts(prodName) {
  fetch(`http://${lesIp}:3000/api/search-product/`+prodName, {
      method: "GET",
      credentials: "include"
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(response => {
          document.querySelector(".search-section").innerHTML = "";
          document.querySelector(".search-section").style.display = "flex";
          if (response.length > 0) {
              response.forEach(product => {
                  createSearchItem(
                    product.id,
                      product.product_name,
                      product.images,
                  );
              });
          }else {
              document.querySelector(".search-section").innerHTML = "<span>Nothing Found !</span>";
          }
  })
  .catch(error => {
      console.log(error);
  })
};
const searchInput = document.getElementById('searchInput');
var timeoutId;
searchInput.addEventListener('keyup', function () {
  clearTimeout(timeoutId);

  timeoutId = setTimeout(function () {
      // Get the input value
      var inputValue = searchInput.value;

      if(inputValue.length >= 3){
          searchProducts(inputValue);
      } else{
          document.querySelector(".search-section").style.display = "none";
      }
      
  }, 400);
});
/* End Search box */