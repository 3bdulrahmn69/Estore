/* Start nav buttons */
const categories = document.getElementById("categories");
const products = document.getElementById("products");
const orders = document.getElementById("orders");
const users = document.getElementById("user");
/* End nav buttons */
/* Start sections */
const categories_section = document.querySelector(".category-section");
const products_section = document.querySelector(".product-section");
const orders_section = document.querySelector(".order-section");
const users_section = document.querySelector(".user-section");
const head_title = document.querySelector(".head-title");
/* End sections */

function showSection(section, button) {
    // Hide all sections
    categories_section.style.cssText = "display: none;";
    products_section.style.cssText = "display: none;";
    orders_section.style.cssText = "display: none;";
    users_section.style.cssText = "display: none;";
    $('.allProducts-section').css('display', 'none');
    $('.back_arrow').addClass('hideThings');

    // Display the selected section
    if (section) {
        section.style.cssText = "display: flex;";
        head_title.textContent = section.dataset.title || "";
    }

    // Remove "active" class from all buttons
    categories.classList.remove("active");
    products.classList.remove("active");
    orders.classList.remove("active");
    users.classList.remove("active");

    // Add "active" class to the clicked button
    button.classList.add("active");
}
categories.addEventListener("click", function () {
    showSection(categories_section, categories);
});
products.addEventListener("click", function () {
    showSection(products_section, products);
});
orders.addEventListener("click", function () {
    showSection(orders_section, orders);
});
users.addEventListener("click", function () {
    showSection(users_section, users);
});

$('#All_products').click(function(){
  head_title.textContent = "All Products"
  $('.back_arrow').removeClass('hideThings');
  $('.product-section').css('display','none');
  $('.allProducts-section').css('display','flex');
  document.getElementById('allProducts-sce').innerHTML = '';
  getProducts();
});

$('.back_arrow').click(function(){
  head_title.textContent = "Products"
  $('.back_arrow').addClass('hideThings');
  $('.product-section').css('display','flex');
  $('.allProducts-section').css('display','none');
});

/* Start Create categories items */
function createCategoryItem(passedName, passedID) {
  const categorySection = document.querySelector(".category-section");
  
  const boxItem = document.createElement("div");
  boxItem.classList.add("item");

  const boxItemImg = document.createElement("div");
  boxItemImg.classList.add("pic");

  const img = document.createElement("img");
  img.src = "assets/icons/pc-case-svgrepo-com.svg";
  boxItemImg.appendChild(img);

  const details = document.createElement("div");
  details.classList.add("details");

  const catName = document.createElement("p");
  catName.classList.add("catName");
  catName.textContent = passedName;
  details.appendChild(catName);

  const catID = document.createElement("p");
  catID.classList.add("catID");
  catID.textContent = passedID;

  const iconsInItems = document.createElement("div");
  iconsInItems.classList.add("iconsInItems");

  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-solid", "fa-pen-to-square");
  editIcon.title = "Edit Category";
  editIcon.addEventListener("click", function () {
    $('#editModal').css('display', 'flex');
    document.querySelector('.edCatName').textContent = passedName;
    $('#UpdateCatName').click(function() {
      if($('#newCatName').val() == "") {
        $('#newCatName').css('border', '1px solid red');
        alert('Please enter a category name');
      }else{
        updateCategory(categoryID, $('#newCatName').val());
      $('#confirmModal').css('display', 'none');
      };
    });
  });

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash");
  deleteIcon.title = "Delete Category";
  deleteIcon.addEventListener("click", function () {
    $('#confirmModal').css('display', 'flex');
    document.querySelector('.delCatName').textContent = passedName;
    $('#deleteCat').click(function() {
      delCategory(passedID);
      $('#confirmModal').css('display', 'none');
    });
  });

  iconsInItems.appendChild(editIcon);
  iconsInItems.appendChild(deleteIcon);
  details.appendChild(iconsInItems);
  details.appendChild(catID);
  boxItem.appendChild(boxItemImg);
  boxItem.appendChild(details);
  categorySection.appendChild(boxItem);
}
/* End Create categories items */
/* start get Category In Selector */
function getCatInSelect() {
  $.get("http://127.0.0.1:3000/api/categories", function (data) {
      // Assuming data is an array of objects with a 'category_name' property
      const $productCategorySelect = $("#product_category");

      // Clear existing options
      $productCategorySelect.empty();

      // Add a default option
      $productCategorySelect.append('<option value="Choose Category">Choose</option>');

      // Loop through the data and append each category_name as an option
      data.forEach(function (category) {
          $productCategorySelect.append(`<option value="${category.category_name}">${category.category_name}</option>`);
      });
    });
}
/* End get Category In Selector */
/* Start get Category function */
function getCategories() {
  $.get("http://127.0.0.1:3000/api/categories", function (data) {
    data.forEach(category => {
      createCategoryItem(category.category_name, category.id);
    });
  });
}
/* End get Category function */
/* Start delete Category function */
function delCategory(CategoryID) {
  $.ajax({
    type: "DELETE",
    url: 'http://127.0.0.1:3000/api/categories/' + CategoryID,
    success: function(resp) {
      $('#confirmModal').css('display', 'none');
      $('#success').css('display', 'flex');
      $(".success-content").append(`<p>Category Deleted Successfully</p>`);
    },
  });
};
/* End delete Category function */
/* Start Update Category function */
function updateCategory(CategoryID, CategoryName) {
  const obj = {
    "category_name": CategoryName
  };
  $.ajax({
    type: "PUT",
    url: 'http://127.0.0.1:3000/api/categories/' + CategoryID,
    contentType: "application/json",
    Connection: "keep-alive",
    data: JSON.stringify(obj),
    success: function(resp) {
      $('#editModal').css('display', 'none');
      $('#success').css('display', 'flex');
      $(".success-content").append(`<p>Category Name Updated Successfully</p>`);
    },
  });
};
/* End Update Category function */
/* Start Create Product item */
function createProductItem(productId, productName,productDescription ,productPrice, productAmount) {
  const allProducts_section = document.getElementById('allProducts-sce')
  const boxItem = document.createElement("tr");

  const boxItemImg = document.createElement("td");
  boxItemImg.classList.add("pImage");

  const img = document.createElement("img");
  img.src = "assets/images/card.png";
  boxItemImg.appendChild(img);

  const pId = document.createElement("td");
  pId.classList.add("pId");
  pId.textContent = productId

  const pName = document.createElement("td");
  pName.classList.add("pName");
  pName.textContent = productName;

  const pDescription = document.createElement("td");
  pDescription.classList.add("pDescription");
  if(productDescription.length > 10) {
    pDescription.textContent = `${productDescription.substring(0,15)}... `;
    pDescription.title = productDescription;
  }else {
    pDescription.textContent = productDescription;
  }
  

  const pPrice = document.createElement("td");
  pPrice.classList.add("pPrice");
  pPrice.textContent = productPrice;
  
  const pQuantity = document.createElement("td");
  pQuantity.classList.add("pQuantity");
  pQuantity.textContent = productAmount;

  const iconsInItems = document.createElement("td");
  iconsInItems.classList.add("ProductIcons");
  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-solid", "fa-pen-to-square");
  editIcon.addEventListener("click", function () {
      getCatInSelect()
      $('#modalProduct').css('display', 'flex');
      $('#modalProduct .modal-title-head').text('Edit Product');
      $('#product_name').val(productName);
      $('#product_description').val(productDescription);
      $('#product_price').val(productPrice);
      $('#Product_quantity').val(productAmount);
      $('#createProduct').css('display', 'none');
      const updateProductBtn = $('#modalProduct .buttons input[value="Update"]#updateProduct')
      updateProductBtn.css('display', 'block');
      updateProductBtn.click(function() {
        updateProduct(productId, $('#product_name').val(),$('#product_description').val, $('#product_price').val(), $('#Product_quantity').val());
      });
  });
  editIcon.title = "Edit Product";
  iconsInItems.appendChild(editIcon)
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash");
  deleteIcon.addEventListener("click", function () {
    $('#confirmModal').css('display', 'flex');
    document.querySelector('.delCatName').textContent = productName;
    $('#deleteCat').click(function() {
      deleteProduct(productId)
      $('#confirmModal').css('display', 'none');
    });
  });
  deleteIcon.title = "Delete Product";
  iconsInItems.appendChild(deleteIcon)

  boxItem.appendChild(boxItemImg);
  boxItem.appendChild(pId);
  boxItem.appendChild(pName);
  boxItem.appendChild(pDescription);
  boxItem.appendChild(pPrice);
  boxItem.appendChild(pQuantity);
  boxItem.appendChild(iconsInItems);
  allProducts_section.appendChild(boxItem);
};
/* End  Create Product item */
/* Start  get Products function*/
function getProducts() {
  $.get("http://127.0.0.1:3000/api/products", function (data) {
    data.forEach(product => {
      createProductItem(product.id, product.product_name, product.product_desc, product.product_price, product.product_amount);
    });
  });
};
/* End get Products function */
/* Start delete Product function */
function deleteProduct(productId){
  $.ajax({
    type: "DELETE",
    url: 'http://127.0.0.1:3000/api/products/' + productId  ,
    success: function(resp) {
      $('#confirmModal').css('display', 'none');
      $('#success').css('display', 'flex');
      $(".success-content").append(`<p>Product Deleted Successfully</p>`);
    },
  });
};
/* End delete Product function */
/* Start Update Product function */
function updateProduct(productId, productName, productDescription, productPrice, productAmount) {
  const obj = {
    "product_name": productName,
    "product_desc": productDescription,
    "product_amount": productAmount,
    "product_price": productPrice
  };
  $.ajax({
    type: "PUT",
    url: 'http://127.0.0.1:3000/api/products/' + productId,
    contentType: "application/json",
    Connection: "keep-alive",
    data: JSON.stringify(obj),
    success: function(resp) {
      $('#editModal').css('display', 'none');
      $('#success').css('display', 'flex');
      $(".success-content").append(`<p>Product Updated Successfully</p>`);
      console.log(resp)
    },
  });
};
/* End Update Product function */

$(document).ready(function() {
    getCategories();
    /* start get option */
    $('#New_product').click(getCatInSelect());
    /* End get option */
    $("#createCategory").click(function() {
      if ($("#category_name").val() == "") {
        $("#category_name").css("border", "1px solid red");
        alert("Please enter a category name");
      }else {
        const obj = {
          "category_name": $("#category_name").val()
        };
  
        $.ajax({
          type: "POST",
          url: "http://127.0.0.1:3000/api/categories",
          contentType: "application/json",
          Connection: "keep-alive",
          data: JSON.stringify(obj),
          success: function(resp) {
            $('#modalCategory').css('display', 'none');
            $('#success').css('display', 'flex');
            const $successContent = $(".success-content");
            for (const key in resp) {
                if (resp.hasOwnProperty(key)) {
                    const $para = $("<p>").text(`${key}:`);
                    const $spa = $("<span>").text(resp[key]);

                    $para.append($spa);
                    $successContent.append($para);
                }
            }
          },
        });
        $("#category_name").val("");
      }
    });
    $("#createProduct").click(function() {
      if ($("#product_name").val() == "") {
        $("#product_name").css("border", "1px solid red");
        alert("Please enter a product name");
      } 
      if ($("#product_description").val() == "") {
        $("#product_description").css("border", "1px solid red");
        alert("Please enter a product description");
      }
      if ($("#product_price").val() == "") {
        $("#product_price").css("border", "1px solid red");
        alert("Please enter a product price");
      }
      if ($("#Product_quantity").val() == "") {
        $("#Product_quantity").css("border", "1px solid red");
        alert("Please enter a product quantity");
      }
      if ($("#product_category").val() == "Choose Category") {
        $("#product_category").css("border", "1px solid red");
        alert("Please Choose a product category");
      }
      const obj = {
        "product_name": $("#product_name").val(),
        "product_desc": $("#product_description").val(),
        "product_price": $("#product_price").val(),
        "product_amount": $("#Product_quantity").val(),
        "category_name": $("#product_category").val(),
    };

    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:3000/api/products",
      contentType: "application/json",
      data: JSON.stringify(obj),
      success: function(resp) {
          $('#modalCategory').css('display', 'none');
          $('#success').css('display', 'flex');
          const $successContent = $(".success-content");
          for (const key in resp) {
            let $spa;
              if (resp.hasOwnProperty(key)) {
                  if (key === "category") {
                    $spa = $("<span>").text(resp[key].category_name);
                  }else{
                    $spa = $("<span>").text(resp[key]);
                  }
                  const $para = $("<p>").text(`${key}:`);
  
                  $para.append($spa);
                  $successContent.append($para);
              }
          }
          console.log(resp);
      },
      error: function(xhr, status, error) {
        console.error("AJAX request failed:", status, error);
        // Handle the error, maybe show an error message to the user
      }
      });
      $("#product_name").val("");
      $("#product_description").val("");
      $("#product_price").val("");
      $("#product_category").val("Choose Category");
    });
    /* Start NavBar Hider*/
    $('#ic-show').click(function () {
      $('#nav').animate({width: 'toggle'}, 350);
      if ($('#nav').css('display') === 'block') {
        $('#nav').css('display', 'flex');
      }
    });
    function hideNav() {
      if ($('#ic-show').css('display') === 'flex') {
        $("#nav").animate({width: 'hide'}, 500);;
      }
    }
    $("#categories").click(hideNav);
    $("#products").click(hideNav);
    $("#orders").click(hideNav);
    $("#user").click(hideNav);
    $(".content").click(hideNav);
    /* End NavBar Hider */

    /* Start Modal */
    $('#New_category').click(function () {
      $('#modalCategory').css('display', 'flex');
    });
    $('#New_product').click(function () {
      $('#modalProduct').css('display', 'flex');
    });
    window.addEventListener('click', function(event) {
      if (event.target === modalCategory) {
        modalCategory.style.display = "none";
      }
      if (event.target === modalProduct) {
        modalProduct.style.display = "none";
      }
      if (event.target === success) {
        success.style.display = "none";
        document.querySelector(".success-content").innerHTML = "";
      }
      if (event.target === confirmModal) {
        confirmModal.style.display = "none";
        document.querySelector(".confirm-content").innerHTML = "";
      }
    });
    $('.cancel').click(function () {
      $('#modalCategory').css('display', 'none');
      $('#modalProduct').css('display', 'none');
      $('#confirmModal').css('display', 'none');
      $('#editModal').css('display', 'none');
    });
    $('.close').click(function () {
      $('#success').css('display', 'none');
      document.querySelector(".success-content").innerHTML = "";
      window.location.reload();
    });
    /* End modal */
});