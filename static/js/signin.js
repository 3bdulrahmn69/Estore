const lesIp = '34.224.17.42'

function signIn(email, password) {
  const obj = {
    email: email,
    password: password,
  };

  fetch(`http://${lesIp}:3000/api/signin/`, {
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
      } else if (response.status === 401) {
        console.log("Unauthorized");
        throw new Error("Unauthorized");
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((resp) => {
      localStorage.setItem("userFirstName", resp.data.user.first_name);
      localStorage.setItem("userRole", resp.data.user.role);
      if (resp.data.user.role === "admin") {
        window.location.href = "../../dashboard.html";
      } else {
        window.location.href = "../../index.html";
      }
    })
    .catch((err) => {
      console.error("Request failed", err);
    });
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
    signIn(email, password);
  }
});

document.getElementById("password").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (filedCheck()) {
      signIn(email, password);
    }
  }
});

document.getElementById("email").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (filedCheck()) {
      signIn(email, password);
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