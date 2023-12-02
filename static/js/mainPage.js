const userFirstName = localStorage.getItem("userFirstName");

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

    const showAllProduct = document.createElement("a");
    showAllProduct.id = "showAllProduct";
    const encodedCatName = encodeURIComponent(catName);
    showAllProduct.href = `../Templates/CategoryProducts.html?categoryName=${encodedCatName}`;
    showAllProduct.title = `Show All ${catName} Products`;
    showAllProduct.textContent = "Show All";
    arrows.appendChild(showAllProduct);

    const products_container = document.createElement("div");
    products_container.className = "products-container";
    products_container.classList.add(catName);
    arrows.appendChild(products_container);

    getProductsInCategory(catName, section.id, 10);
};

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
    productImage.style.cssText = "cursor: pointer;";
    productImage.addEventListener('click',function(){
        window.location.href = `../Templates/productPage.html?productId=${prodId}`;
    });
    productImage.src = prodImage[0].image;
    productImageBox.appendChild(productImage);

    const productTitle = document.createElement("div");
    productTitle.className = "product-name";
    const name = document.createElement("h4");
    if (prodName.length > 10) {
        name.textContent = prodName.slice(0, 7) + "...";
        name.title = prodName;
    } else {
        name.textContent = prodName;
    }
    name.style.cssText = "cursor: pointer;";
    name.addEventListener('click',function(){
        window.location.href = `../Templates/productPage.html?productId=${prodId}`;
    });
    productTitle.appendChild(name);
    const price = document.createElement("p");
    price.style.cssText = "cursor: pointer;";
    price.addEventListener('click',function(){
        window.location.href = `../Templates/productPage.html?productId=${prodId}`;
    });
    price.textContent = prodPrice + " EGP";
    productTitle.appendChild(price);
    productBox.appendChild(productTitle);

    const show_details = document.createElement("div");
    show_details.style.cssText = "cursor: pointer;";
    show_details.addEventListener('click',function(){
        window.location.href = `../Templates/productPage.html?productId=${prodId}`;
    });
    show_details.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
    show_details.className = "show-details";
    productBox.appendChild(show_details);

    const details = document.createElement("div");
    details.className = "product-details";
    const detailsText = document.createElement("p");
    if (prodDecs.length > 10) {
        detailsText.textContent = prodDecs.slice(0, 20) + "...";
        detailsText.title = prodDecs;
    } else {
        detailsText.textContent = prodDecs;
    }
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
};

function scrollLeftBy(selector) {
    var scrollContainer = document.querySelector(selector);
    if (scrollContainer.scrollLeft <= 0) {
        scrollContainer.scrollTo({
            left: scrollContainer.scrollWidth,
            behavior: "smooth",
        });
    } else {
        scrollContainer.scrollBy({
            left: -240,
            behavior: "smooth",
        });
    }
};
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
            left: 240,
            behavior: "smooth",
        });
    }
};

function hideAccountName() {
    if (userFirstName == null) {
        document.querySelector(".account-name").style.display = "none";
        document.querySelector(".account").style.display = "flex";
        document.querySelector("header .icons").style.display = "none";
    } else {
        document.querySelector(".account").style.display = "none";
        document.querySelector(".accountPassedName").textContent =
            decodeURIComponent(userFirstName.slice(0, 8));
        document.querySelector(".accountPassedName").title =
            decodeURIComponent(userFirstName);
        if (window.innerWidth <= 768) {
            document.querySelector(".account-name").style.display = "none";
        } else {
            document.querySelector(".account-name").style.display = "flex";
            document.querySelector(".account").style.display = "none";
        }
    }
};

function widthChecker() {
    if (window.innerWidth <= 768) {
        document.querySelector(".nav-items ul").style.display = "none";
        document.querySelector(".account-name").style.display = "none";
        document.querySelector(".account").style.display = "none";
        document.querySelector("header .icons").style.display = "none";
    }
};

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
    console.log(prodImage);
    img.src = prodImage[0].image;
    imgBox.appendChild(img);

    const right = document.createElement("div");
    right.className = "right";
    cartProduct.appendChild(right);

    const productName = document.createElement("p");
    if (prodName.length > 10) {
        productName.textContent = prodName.slice(0, 7) + "...";
        productName.title = prodName;
    } else {
        productName.textContent = prodName;
    }
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
        fetch("http://127.0.0.1:3000/api/cart/" + prodIdInCart, {
            method: "DELETE",
            credentials: "include"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(response => {
            console.log(response);
            getCart();
        })
        .catch(error => {
            console.log(error);
        });
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
};

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
    fetch("http://127.0.0.1:3000/api/categories")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(category => {
                createCategoryBox(
                    category.category_name,
                    category.image.image,
                    category.id
                );
                createProductSection(category.category_name);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
};

function getProductsInCategory(catName, sectionName, limit) {
    var apiUrl = "http://127.0.0.1:3000/api/category/" + catName;

    // Check if limit is specified and not 'all'
    if (limit !== 'all') {
        apiUrl += "?limit=" + limit;
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (limit !== 'all') {
                // Reverse the order of data if limit is specified
                data = data.reverse().slice(0, limit);
            }

            data.forEach(product => {
                createProductBox(
                    product.id,
                    product.product_name,
                    product.images,
                    product.product_price,
                    product.product_desc,
                    sectionName
                );
            });

            if (window.location.pathname == "/Templates/CategoryProducts.html") {
                createCategoryHeader(catName, data.length);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
};

function logout() {
    fetch("http://127.0.0.1:3000/api/logout", {
        method: "GET",
        credentials: "include"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });

    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userRole");

    hideAccountName();
    window.location.reload();
};

function getCart() {
    var cartSectionFather = document.querySelector(".cart-section-father");
    cartSectionFather.querySelector(".cart-section").innerHTML = "";

    fetch("http://127.0.0.1:3000/api/cart/", {
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
        if (response.status === "success") {
            if (response.data.length >= 0) {
                document.querySelector(".totalPrice span").textContent = response.total;
            } else {
                document.querySelector(".totalPrice span").textContent = 0;
            }
            response.data.forEach(product => {
                cartProductItem(
                    product.id,
                    product.product_name,
                    product.images,
                    product.product_price,
                    product.product_desc
                );
            });
        } else {
            console.log("Error in response status");
        }
    })
    .catch(error => {
        console.log(error);
    });
};

function postCart(prodId) {
    fetch("http://127.0.0.1:3000/api/cart/" + prodId, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        var cartSectionFather = document.querySelector(".cart-section-father");
        if (cartSectionFather.style.display === "block") {
            console.log("from btn");
            getCart();
        }
    })
    .catch(error => {
        console.log(error);
    });
};

function postOrder(total) {
    fetch("http://127.0.0.1:3000/api/order", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ total: total })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        emptyCart();
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
};

function emptyCart() {
    fetch("http://127.0.0.1:3000/api/cart/", {
        method: "DELETE",
        credentials: "include"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(response => {
        if (response.status === "success") {
            getCart();
        } else {
            console.log("Error in response status");
        }
    })
    .catch(error => {
        console.log(error);
    });
}

window.onload = function () {
    if (window.location.pathname == "/index.html"){
        getCategories();
    };
    hideAccountName();
    widthChecker();
    roleChecker(document.getElementById("CartBtn"));
    setUpCategoryProductsPage();
    setUpProductPage();
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
        document.querySelector(".nav-items ul").style.display = "none"
        document.querySelector(".icons").style.display = "none";
        document.querySelector(".account").style.display = "none";
        document.querySelector(".account-name").style.display = "none";
        document.querySelector(".dropMenu").style.display = "none";
    } else {
        document.querySelector(".nav-items ul").style.display = "flex";
        if (userFirstName == null) {
            document.querySelector(".account").style.display = "flex";
            document.querySelector(".icons").style.display = "none";
            document.querySelector(".account-name").style.display = "none";
        }else {
            document.querySelector(".account").style.display = "none";
            document.querySelector(".icons").style.display = "flex";
            document.querySelector(".account-name").style.display = "flex";
    }
    }

    if (document.querySelector(".dropMenu").style.display == "flex") {
        document.querySelector(".dropMenu").style.display = "none";
    }

    if (document.querySelector(".account").style.display == "none" && localStorage.getItem("userEmail") == null) {
        document.querySelector(".account").style.display = "flex";
    }else{
        document.querySelector(".account").style.display = "none";
        }

    if (document.querySelector(".dropMenu").style.display == "flex") {
        document.querySelector(".dropMenu").style.display = "none";
    }

    if (document.querySelector(".account").style.display == "none" && localStorage.getItem("userEmail") == null) {
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


/* Start categoryProducts.html */
function createCategoryHeader(catName, prodFound){
    const name = document.createElement("h4");
    name.textContent = catName;
    document.querySelector(".Category-details-name").appendChild(name);

    const title = document.createElement("title");
    title.textContent = `E-Store | ${catName}`;
    document.head.appendChild(title);

    const found = document.createElement("p");
    found.textContent = prodFound + " Products Found";
    document.querySelector(".Category-details-name").appendChild(found);
};

function setUpCategoryProductsPage() {
    var currentPath = window.location.pathname;
    if (currentPath.includes("/Templates/CategoryProducts.html")) {
        var url = window.location.href;
        var categoryName = url.split("=")[1];

        getProductsInCategory(categoryName, 'ProductCategory-section', 'all');
    };
}
/* End categoryProducts.html */

/* Start productPage.html */
function createProductPage(prodId, prodName, prodDecs, prodPrice, prodImage) {
    if(window.location.pathname == "/Templates/productPage.html"){

        const title = document.createElement("title");
        title.textContent = `E-Store | ${prodName}`;
        document.head.appendChild(title);

        prodImage.forEach(image => {
            const imagesBox = document.querySelector(".images-box");
            const img = document.createElement("img");
            img.src = image.image;
            img.alt = prodName;
            console.log(img);
            imagesBox.appendChild(img);
        });

        if (prodImage.length < 2) {
            document.querySelector(".image-con").style.cssText = "height: 240px;"
            document.querySelectorAll('.image-con button').forEach(btn => {
                btn.style.display = "none";
            });
        };

        const nameContainer = document.querySelector(".details-name");

        const name = document.createElement("h4");
        name.textContent = prodName;
        nameContainer.appendChild(name);
    
        const decs = document.createElement("p");
        decs.textContent = prodDecs;
        nameContainer.appendChild(decs);
    
        const price = document.createElement("p");
        price.textContent = prodPrice + " EGP";
        document.querySelector(".price-box").appendChild(price);

        const buttons = document.createElement("div");
        buttons.className = "buttons";

        const addToCart = document.createElement("button");
        addToCart.title = "Add to Cart";
        addToCart.className = 'AddToCartBtn'
        addToCart.innerHTML = 'Add to Cart <i class="fa-solid fa-cart-shopping"></i>';
        roleChecker(addToCart);
        addToCart.onclick = function () {
            postCart(prodId);
        };
        buttons.appendChild(addToCart);

        const addToWishlist = document.createElement("button");
        addToWishlist.title = "Add to Wishlist";
        addToWishlist.className = 'AddToWishlistBtn'
        addToWishlist.innerHTML = 'Add to Wishlist <i class="fa-solid fa-heart"></i>';
        buttons.appendChild(addToWishlist);

        document.querySelector(".details-box").appendChild(buttons);
    }
};
function setUpProductPage() {
    var currentPath = window.location.pathname;
    if (currentPath.includes("/Templates/productPage.html")) {
        var url = window.location.href;
        var productId = url.split("=")[1];
        if (productId == undefined) {
            window.location.href = "../index.html";
        }else{
            getProductDetails(productId);
        }
    };
};
function getProductDetails(productId) {
    fetch("http://127.0.0.1:3000/api/products/" + productId)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            createProductPage(
                data.id,
                data.product_name,
                data.product_desc,
                data.product_price,
                data.images
            );
        })
        .catch(error => {
            console.error("Error:", error);
        });
};
/* End productPage.html */
/* Start Search box */
function createSearchItem(prodId, prodName, prodImage) {
    const itemBox = document.createElement("div");
    itemBox.className = "product-search-box";
    itemBox.style.cssText = "cursor: pointer;";
    itemBox.addEventListener('click',function(){
        window.location.href = `../Templates/productPage.html?productId=${prodId}`;
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