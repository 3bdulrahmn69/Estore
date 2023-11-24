function createCategoryBox(catName, catImage, catId) {
    const id = catId;
    const category_container = document.querySelector('.category-container');
    const categoryBox = document.createElement('div');
    categoryBox.className = 'category-box';

    const categoryImageBox = document.createElement('div');
    categoryImageBox.className = 'catImage';

    const categoryImageCircle = document.createElement('div');
    categoryImageCircle.className = 'image-circle';
    categoryImageBox.appendChild(categoryImageCircle);

    const categoryImage = document.createElement('img');
    categoryImage.src = catImage;
    categoryImageBox.appendChild(categoryImage);
    categoryBox.appendChild(categoryImageBox);

    const categoryTitle = document.createElement('div');
    categoryTitle.className = 'catName';
    const name = document.createElement('h4')
    name.textContent = catName;
    categoryTitle.appendChild(name)
    categoryBox.appendChild(categoryTitle);

    const categoryLink = document.createElement('a');
    categoryLink.href = '#'+catName;
    categoryLink.title = catName;
    categoryLink.appendChild(categoryBox);

    category_container.appendChild(categoryLink);
};

function createProductSection(catName) {
    const sectionContainerToAddIn = document.querySelector('.shop .container')
    const section = document.createElement('section');
    sectionContainerToAddIn.appendChild(section);

    section.className = 'products';
    section.id = catName;
    
    const arrows = document.createElement('div');
    arrows.className = 'arrows';
    section.appendChild(arrows);

    const title = document.createElement('div');
    title.className = 'title';
    const h4 = document.createElement('h4');
    h4.className = 'Product-Category-Name';
    h4.textContent = catName;
    title.appendChild(h4);
    arrows.appendChild(title);

    const leftArrow = document.createElement('button');
    leftArrow.className = 'icon-left';
    leftArrow.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    arrows.appendChild(leftArrow);
    leftArrow.onclick = function () {
        scrollLeftBy(`.${catName}`);
    };

    const rightArrow = document.createElement('button');
    rightArrow.className = 'icon-right';
    rightArrow.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    arrows.appendChild(rightArrow);
    rightArrow.onclick = function () {
        scrollRightBy(`.${catName}`);
    };

    const products_container = document.createElement('div');
    products_container.className = 'products-container';
    products_container.classList.add(catName);
    arrows.appendChild(products_container);

    getProductsInCategory(catName,  section.id);
};

function createProductBox(prodName, prodImage, prodPrice, prodDecs, sectionName) {
    const productBoxContainer = document.querySelector(`.${sectionName}`);
    const productBox = document.createElement('div');
    productBox.className = 'product-box';
    productBoxContainer.appendChild(productBox);

    const productImageBox = document.createElement('div');
    productImageBox.className = 'product-image';
    productBox.appendChild(productImageBox);
    const productImage = document.createElement('img');
    productImage.src = prodImage;
    productImageBox.appendChild(productImage);

    const productTitle = document.createElement('div');
    productTitle.className = 'product-name';
    const name = document.createElement('h4');
    name.textContent = prodName;
    productTitle.appendChild(name);
    const price = document.createElement('p');
    price.textContent = prodPrice + ' EGP';
    productTitle.appendChild(price);
    productBox.appendChild(productTitle);

    const show_details = document.createElement('div');
    show_details.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
    show_details.className = 'show-details';
    productBox.appendChild(show_details);

    const details = document.createElement('div');
    details.className = 'product-details';
    const detailsText = document.createElement('p');
    detailsText.textContent = prodDecs;
    details.appendChild(detailsText);
    productBox.appendChild(details);

    const product_btn = document.createElement('div');
    product_btn.className = 'product-btn';
    productBox.appendChild(product_btn);

    const addToCart = document.createElement('button');
    addToCart.title = 'Add to Cart';
    addToCart.innerHTML = 'Cart <i class="fa-solid fa-cart-shopping"></i>'
    product_btn.appendChild(addToCart);

    const addToWishlist = document.createElement('button');
    addToWishlist.title = 'Add to Wishlist';
    addToWishlist.innerHTML = 'Wishlist <i class="fa-solid fa-heart"></i>'
    product_btn.appendChild(addToWishlist);
};

function getCategories() {
    $.get("http://127.0.0.1:3000/api/categories", function (data) {
        data.forEach(category => {
            createCategoryBox(category.category_name, "assets/images/mon.png", category.id);
            createProductSection(category.category_name);
        });
    });
};

function getProductsInCategory(catName, sectionName) {
    $.get("http://127.0.0.1:3000/api/category/"+catName, function (data) {
        data.forEach(product => {
            createProductBox(product.product_name, "assets/images/card.png", product.product_price, product.product_desc, sectionName)
        });
    });
};


window.onload = function () {
    getCategories();
    hideAccountName();
};


function scrollLeftBy(selector) {
    var scrollContainer = document.querySelector(selector);
    if (scrollContainer.scrollLeft <= 0) {
        scrollContainer.scrollTo({
            left: scrollContainer.scrollWidth,
            behavior: 'smooth'
        });
    } else {
        scrollContainer.scrollBy({
            left: -150,
            behavior: 'smooth'
        });
    }
};
function scrollRightBy(selector) {
    var scrollContainer = document.querySelector(selector);    
    if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 20) {
        scrollContainer.scrollTo({
            left: 0,
            behavior: 'smooth'
        });
    } else {
        scrollContainer.scrollBy({
            left: 200,
            behavior: 'smooth'
        });
    }
};


const userEmail =  sessionStorage.getItem('userEmail');

function hideAccountName() {
    if (userEmail == null) {
        document.querySelector('.account-name').style.display = 'none';
        document.querySelector('.account').style.display = 'flex';
        document.querySelector('header .icons').style.display = 'none';
    }else {
        document.querySelector('.accountPassedName').textContent = decodeURIComponent(userEmail.slice(0, 8));
        document.querySelector('.accountPassedName').title = decodeURIComponent(userEmail);
        if (window.innerWidth <= 768) {
            document.querySelector('.account-name').style.display = 'none';
        }else{
            document.querySelector('.account-name').style.display = 'flex';
            document.querySelector('.account').style.display = 'none';
        }
    };
};

function logout() {
    sessionStorage.removeItem('userEmail');
    $.get("http://127.0.0.1:3000/api/logout");
    hideAccountName();
    window.location.reload();
};

document.querySelector('#accountLogout').addEventListener('click', function () {
    logout();
});

document.querySelector('.account-name').addEventListener('click', function () {
    if (document.querySelector('.dropMenu').style.display == 'flex') {
        document.querySelector('.dropMenu').style.display = 'none';
    }else{
        document.querySelector('.dropMenu').style.display = 'flex';
    }
});

document.querySelector('.dropMenu').addEventListener('mouseleave', function () {
    setTimeout(() => {
        document.querySelector('.dropMenu').style.display = 'none';
    }, 500);
});

document.querySelector('.icon-bars').addEventListener('click', function () {
    document.querySelector('.nav-items ul').style.display = 'flex';
    hideAccountName();
});

function widthChecker() {
    if (window.innerWidth <= 768) {
        document.querySelector('.nav-items ul').style.display = 'none';
        document.querySelector('.account-name').style.display = 'none';
        document.querySelector('.account').style.display = 'none';
        document.querySelector('header .icons').style.display = 'none';
    };
};

widthChecker();