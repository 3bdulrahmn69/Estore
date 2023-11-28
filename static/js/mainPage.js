const userEmail = localStorage.getItem("userFirstName");

/* Normal functions */
function createCategoryBox(catName, catImage, catId) {
    const id = catId;
    const category_container = document.querySelector(".category-container");
    const categoryBox = document.createElement("div");
    categoryBox.className = "category-box";

    const categoryImageBox = document.createElement("div");
    categoryImageBox.className = "catImage";

    const categoryImageCircle = document.createElement("div");
    categoryImageCircle.className = "image-circle";
    categoryImageBox.appendChild(categoryImageCircle);

    const categoryImage = document.createElement("img");
    categoryImage.src = catImage;
    categoryImageBox.appendChild(categoryImage);
    categoryBox.appendChild(categoryImageBox);

    const categoryTitle = document.createElement("div");
    categoryTitle.className = "catName";
    const name = document.createElement("h4");
    name.textContent = catName;
    categoryTitle.appendChild(name);
    categoryBox.appendChild(categoryTitle);

    const categoryLink = document.createElement("a");
    categoryLink.href = "#" + catName;
    categoryLink.title = catName;
    categoryLink.appendChild(categoryBox);

    category_container.appendChild(categoryLink);
}

function createProductSection(catName) {
    const sectionContainerToAddIn = document.querySelector(".shop .container");
    const section = document.createElement("section");
    sectionContainerToAddIn.appendChild(section);

    section.className = "products";
    section.id = catName;

    const arrows = document.createElement("div");
    arrows.className = "arrows";
    section.appendChild(arrows);

    const title = document.createElement("div");
    title.className = "title";
    const h4 = document.createElement("h4");
    h4.className = "Product-Category-Name";
    h4.textContent = catName;
    title.appendChild(h4);
    arrows.appendChild(title);

    const leftArrow = document.createElement("button");
    leftArrow.className = "icon-left";
    leftArrow.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    arrows.appendChild(leftArrow);
    leftArrow.onclick = function () {
        scrollLeftBy(`.${catName}`);
    };

    const rightArrow = document.createElement("button");
    rightArrow.className = "icon-right";
    rightArrow.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    arrows.appendChild(rightArrow);
    rightArrow.onclick = function () {
        scrollRightBy(`.${catName}`);
    };

    const products_container = document.createElement("div");
    products_container.className = "products-container";
    products_container.classList.add(catName);
    arrows.appendChild(products_container);

    getProductsInCategory(catName, section.id);
}

function createProductBox(
    prodId,
    prodName,
    prodImage,
    prodPrice,
    prodDecs,
    sectionName
) {
    const productBoxContainer = document.querySelector(`.${sectionName}`);
    const productBox = document.createElement("div");
    productBox.className = "product-box";
    productBoxContainer.appendChild(productBox);

    const productImageBox = document.createElement("div");
    productImageBox.className = "product-image";
    productBox.appendChild(productImageBox);
    const productImage = document.createElement("img");
    productImage.src = prodImage[0].image;
    productImageBox.appendChild(productImage);

    const productTitle = document.createElement("div");
    productTitle.className = "product-name";
    const name = document.createElement("h4");
    name.textContent = prodName;
    productTitle.appendChild(name);
    const price = document.createElement("p");
    price.textContent = prodPrice + " EGP";
    productTitle.appendChild(price);
    productBox.appendChild(productTitle);

    const show_details = document.createElement("div");
    show_details.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
    show_details.className = "show-details";
    productBox.appendChild(show_details);

    const details = document.createElement("div");
    details.className = "product-details";
    const detailsText = document.createElement("p");
    detailsText.textContent = prodDecs;
    details.appendChild(detailsText);
    productBox.appendChild(details);

    const product_btn = document.createElement("div");
    product_btn.className = "product-btn";
    productBox.appendChild(product_btn);

    const addToCart = document.createElement("button");
    addToCart.title = "Add to Cart";
    addToCart.innerHTML = 'Cart <i class="fa-solid fa-cart-shopping"></i>';
    roleChecker(addToCart);
    addToCart.onclick = function () {
        postCart(prodId);
    };
    product_btn.appendChild(addToCart);

    const addToWishlist = document.createElement("button");
    addToWishlist.title = "Add to Wishlist";
    addToWishlist.innerHTML = 'Wishlist <i class="fa-solid fa-heart"></i>';
    product_btn.appendChild(addToWishlist);
}

function scrollLeftBy(selector) {
    var scrollContainer = document.querySelector(selector);
    if (scrollContainer.scrollLeft <= 0) {
        scrollContainer.scrollTo({
            left: scrollContainer.scrollWidth,
            behavior: "smooth",
        });
    } else {
        scrollContainer.scrollBy({
            left: -150,
            behavior: "smooth",
        });
    }
}
function scrollRightBy(selector) {
    var scrollContainer = document.querySelector(selector);
    if (
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
        scrollContainer.scrollWidth - 20
    ) {
        scrollContainer.scrollTo({
            left: 0,
            behavior: "smooth",
        });
    } else {
        scrollContainer.scrollBy({
            left: 200,
            behavior: "smooth",
        });
    }
}

function hideAccountName() {
    if (userEmail == null) {
        document.querySelector(".account-name").style.display = "none";
        document.querySelector(".account").style.display = "flex";
        document.querySelector("header .icons").style.display = "none";
    } else {
        document.querySelector(".accountPassedName").textContent =
            decodeURIComponent(userEmail.slice(0, 8));
        document.querySelector(".accountPassedName").title =
            decodeURIComponent(userEmail);
        if (window.innerWidth <= 768) {
            document.querySelector(".account-name").style.display = "none";
        } else {
            document.querySelector(".account-name").style.display = "flex";
            document.querySelector(".account").style.display = "none";
        }
    }
}

function widthChecker() {
    if (window.innerWidth <= 768) {
        document.querySelector(".nav-items ul").style.display = "none";
        document.querySelector(".account-name").style.display = "none";
        document.querySelector(".account").style.display = "none";
        document.querySelector("header .icons").style.display = "none";
    }
}

function cartProductItem(prodId, prodName, prodImage, prodPrice, prodDecs) {
    const prodIdInCart = prodId;
    const cartSection = document.querySelector(".cart-section");

    const cartProduct = document.createElement("div");
    cartProduct.className = "cart-product";
    cartSection.appendChild(cartProduct);

    const left = document.createElement("div");
    left.className = "left";
    cartProduct.appendChild(left);

    const imgBox = document.createElement("div");
    imgBox.className = "img-box";
    left.appendChild(imgBox);

    const img = document.createElement("img");
    img.src = "assets/images/card.png";
    imgBox.appendChild(img);

    const right = document.createElement("div");
    right.className = "right";
    cartProduct.appendChild(right);

    const productName = document.createElement("p");
    productName.textContent = prodName;
    const productPrice = document.createElement("p");
    productPrice.textContent = prodPrice + " EGP";
    const productDesc = document.createElement("p");
    if (prodDecs.length > 10) {
        productDesc.textContent = prodDecs.slice(0, 10) + "...";
        productDesc.title = prodDecs;
    } else {
        productDesc.textContent = prodDecs;
    }

    right.appendChild(productName);
    right.appendChild(productPrice);
    right.appendChild(productDesc);

    const DeleteProductBtn = document.createElement("button");
    DeleteProductBtn.id = "DeleteProductBtn";
    DeleteProductBtn.title = "Remove Product";
    DeleteProductBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    DeleteProductBtn.onclick = function () { 
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", "http://127.0.0.1:3000/api/cart/" + prodIdInCart, true);
        xhr.withCredentials = true;

        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                console.log(response);
                getCart();
            }
        };

        xhr.onerror = function (error) {
        console.log(error);
        };

        xhr.send();
    };
    cartProduct.appendChild(DeleteProductBtn);

    const cartProductAmount = document.createElement("input");
    cartProductAmount.id = "cartProductAmount";
    cartProductAmount.type = "number";
    cartProductAmount.min = "1";
    cartProductAmount.max = "10";
    cartProductAmount.title = "Quantity";
    cartProductAmount.value = "1";
    cartProduct.appendChild(cartProductAmount);
}

function roleChecker(item) {
    if (localStorage.getItem("userRole") != "user") {
        if(localStorage.getItem("userRole") == "admin"){
            item.style.cssText = "cursor: not-allowed;"
            item.title = "admin can't add products to Cart"
            item.disabled = true;
        }else {
            item.style.cssText = "cursor: not-allowed;"
            item.title = "Please Sing In to add A Product to your Cart"
        }
    }
};

/* API functions */
function getCategories() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:3000/api/categories", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            data.forEach((category) => {
                createCategoryBox(
                    category.category_name,
                    category.image.image,
                    category.id
                );
                createProductSection(category.category_name);
            });
        }
    };

    xhr.onerror = function (error) {
        console.error("Error:", error);
    };

    xhr.send();
};

function getProductsInCategory(catName, sectionName) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:3000/api/category/" + catName, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            data.forEach((product) => {
            createProductBox(
                product.id,
                product.product_name,
                product.images,
                product.product_price,
                product.product_desc,
                sectionName
            );
            });
        }
    };

    xhr.onerror = function (error) {
        console.error("Error:", error);
    };

    xhr.send();
}

function logout() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:3000/api/logout", true);
    xhr.withCredentials = true;

    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userRole");

    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
        }
    };

    xhr.onerror = function (error) {
        console.error("Error:", error);
    };

    xhr.send();

    hideAccountName();
    window.location.reload();
}

function getCart() {
    var cartSectionFather = document.querySelector(".cart-section-father");
    cartSectionFather.querySelector(".cart-section").innerHTML = "";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:3000/api/cart/", true);
    xhr.withCredentials = true;

    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.status === "success") {
                if (response.data.length >= 0) {
                    document.querySelector(".totalPrice span").textContent = response.total;
                }else {
                    document.querySelector(".totalPrice span").textContent = 0;
                }
                response.data.forEach((product) => {
                    cartProductItem(
                    product.id,
                    product.product_name,
                    "../../assets/images/card.png",
                    product.product_price,
                    product.product_desc
                    );
                });
            } else {
            console.log("Error in response status");
            }
        }
    };

    xhr.onerror = function (error) {
        console.log(error);
    };

    xhr.send();
}

function postCart(prodId) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:3000/api/cart/" + prodId, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {

            var cartSectionFather = document.querySelector(".cart-section-father");
            if (cartSectionFather.style.display === "block") {
                console.log("from btn");
                getCart();
            };
        };
    };

    xhr.onerror = function (error) {
        console.log(error);
    };

    xhr.send();
};

function postOrder(total){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:3000/api/order", true);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            emptyCart();
            console.log(response);
        };
    };

    xhr.onerror = function (error) {
        console.log(error);
    };

    var data = { total: total };

    var jsonString = JSON.stringify(data);

    xhr.send(jsonString); 
};

function emptyCart() {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://127.0.0.1:3000/api/cart/", true);
    xhr.withCredentials = true;

    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.status === "success") {
                getCart();
            } else {
                console.log("Error in response status");
            }
        }
    };

    xhr.onerror = function (error) {
        console.log(error);
    };

    xhr.send();
}

window.onload = function () {
    getCategories();
    hideAccountName();
    widthChecker();
    roleChecker(document.getElementById("CartBtn"));
};

document.querySelector("#accountLogout").addEventListener("click", function () {
    logout();
});

document.querySelector(".account-name").addEventListener("click", function () {
    if (document.querySelector(".dropMenu").style.display == "flex") {
        document.querySelector(".dropMenu").style.display = "none";
    } else {
        document.querySelector(".dropMenu").style.display = "flex";
    }
});

document.querySelector(".dropMenu").addEventListener("mouseleave", function () {
    setTimeout(() => {
        document.querySelector(".dropMenu").style.display = "none";
    }, 500);
});

document.querySelector(".icon-bars").addEventListener("click", function () {
    if (document.querySelector(".nav-items ul").style.display == "flex") {
        document.querySelector(".nav-items ul").style.display = "none";
        document.querySelector(".account-name").style.display = "none";
        document.querySelector(".icons").style.display = "none";
        hideAccountName();
    } else {
        document.querySelector(".nav-items ul").style.display = "flex";
        hideAccountName();
        document.querySelector(".account-name").style.display = "flex";
        document.querySelector(".icons").style.display = "flex";
    }

    if (document.querySelector(".dropMenu").style.display == "flex") {
        document.querySelector(".dropMenu").style.display = "none";
    }

    if (document.querySelector(".account").style.display == "none" && localStorage.getItem("userEmail") == null) {
        console.log("heyy");
        document.querySelector(".account").style.display = "flex";
    }else{
        document.querySelector(".account").style.display = "none";
    }
});

document.getElementById("CartBtn").addEventListener("click", function () {
    if (document.querySelector(".cart-section-father").style.display == "block") {
        document.querySelector(".cart-section-father").style.display = "none";
    } else {
        document.querySelector(".cart-section-father").style.display = "block";
        getCart();
    };
});

document.querySelector(".RemoveAllBtn").addEventListener("click", emptyCart);

document.querySelector(".hide-cart-section-father").addEventListener("click", function () {
        document.querySelector(".cart-section-father").style.display = "none";
});

document.getElementById('CheckoutBtn').addEventListener("click", function () {
    var totalPrice = document.querySelector(".totalPrice span").textContent;
    postOrder(totalPrice);
});