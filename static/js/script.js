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


/* Create categories items */
function createCategoryItem(passedName, passedID) {
  const categoryID = passedID;
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

  const iconsInItems = document.createElement("div");
  iconsInItems.classList.add("iconsInItems");

  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-solid", "fa-pen-to-square");
  editIcon.title = "Edit Category";
  editIcon.addEventListener("click", function () {
    $('#editModal').css('display', 'flex');
    document.querySelector('.edCatName').textContent = passedName;
    $('#UpdateCatName').click(function() {
      updateCategory(categoryID, $('#newCatName').val());
      $('#confirmModal').css('display', 'none');
    });
  });

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash");
  deleteIcon.title = "Delete Category";
  deleteIcon.addEventListener("click", function () {
    $('#confirmModal').css('display', 'flex');
    document.querySelector('.delCatName').textContent = passedName;
    $('#deleteCat').click(function() {
      delCategory(categoryID);
      $('#confirmModal').css('display', 'none');
    });
  });

  iconsInItems.appendChild(editIcon);
  iconsInItems.appendChild(deleteIcon);
  details.appendChild(iconsInItems);

  boxItem.appendChild(boxItemImg);
  boxItem.appendChild(details);
  categorySection.appendChild(boxItem);
}
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

/* End Update Category function */
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
/* Start Update Category function */

$(document).ready(function() {

  /* start get option */
    $('#New_product').click(function() {
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
    });
    /* End get option */

    getCategories();

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