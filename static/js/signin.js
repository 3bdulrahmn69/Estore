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
  img.src = "../assets/images/card.png"
  itemImage.appendChild(img);

  const name = document.createElement("p");
  name.textContent = prodName;
  itemBox.appendChild(name);

  document.querySelector(".search-section").appendChild(itemBox);
};
function searchProducts(prodName) {
  fetch("http://127.0.0.1:3000/api/search-product/"+prodName, {
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