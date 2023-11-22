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
    categoryLink.appendChild(categoryBox);

    category_container.appendChild(categoryLink);
};

function createProductSection(catName) {
    const sectionContainerToAddIn = document.querySelector('.shop .container')
    const section = document.createElement('section');
    sectionContainerToAddIn.appendChild(section);

    section.className = 'products';
    section.id = catName;

    getProductsInCategory(catName,  section.id);
    
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

    const rightArrow = document.createElement('button');
    rightArrow.className = 'icon-right';
    rightArrow.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    arrows.appendChild(leftArrow);
    arrows.appendChild(rightArrow);

    const products_container = document.createElement('div');
    products_container.className = 'products-container';
    products_container.classList.add(catName);
    arrows.appendChild(products_container);
};

function createProductBox(prodName, prodImage, prodPrice, prodDecs, sectionName) {
    console.log("Section Name:", sectionName);
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
        data.forEach(category => {
            createProductBox(category.product_name, "assets/images/card.png", category.product_price, category.product_desc, sectionName)
        });
    });
};


window.onload = function () {
    getCategories();
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