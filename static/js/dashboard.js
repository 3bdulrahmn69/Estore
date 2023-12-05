const lesIp = '34.224.17.42'
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
    $('.order-Ongoing-section').css('display', 'none');
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

$('#OngoingOrdersBtn').click(function(){
  head_title.textContent = "Ongoing Orders"
  $('.back_arrow').removeClass('hideThings');
  $('.order-section').css('display','none');
  $('.order-Ongoing-section').css('display','flex');
  document.getElementById('Ongoing-section').innerHTML = '';
  getOrders();
});

$('.back_arrow').click(function(){
  if(head_title.textContent == "All Products") {
    head_title.textContent = "Products"
    $('.back_arrow').addClass('hideThings');
    $('.product-section').css('display','flex');
    $('.allProducts-section').css('display','none');
  };
  if (head_title.textContent == "Ongoing Orders") {
    head_title.textContent = "Orders"
    $('.back_arrow').addClass('hideThings');
    $('.order-section').css('display','flex');
    $('.order-Ongoing-section').css('display','none');
  };
});

/* Start Create categories items */
function createCategoryItem(passedName, passedImage, passedID) {
  const categorySection = document.querySelector(".category-section");
  
  const boxItem = document.createElement("div");
  boxItem.classList.add("item");

  const boxItemImg = document.createElement("div");
  boxItemImg.classList.add("pic");

  const img = document.createElement("img");
  img.src = passedImage;
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
        updateCategory(catID.textContent, $('#newCatName').val());
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
/* Start Create Product item */
function createProductItem(productId, productName,productDescription ,productPrice, productAmount, productCategory, productImage) {
  const allProducts_section = document.getElementById('allProducts-sce')
  const boxItem = document.createElement("tr");

  const boxItemImg = document.createElement("td");
  boxItemImg.classList.add("pImage");

  const img = document.createElement("img");
  img.src = productImage[0].image;
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

  const pCategory = document.createElement("td");
  pCategory.classList.add("pCategory");
  pCategory.textContent = productCategory;

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
      $('#product_category').css('display', 'none');
      $('#createProduct').css('display', 'none');
      $('#productImages').css('display', 'none');
      const updateProductBtn = $('#modalProduct .buttons input[value="Update"]#updateProduct')
      updateProductBtn.css('display', 'block');
      updateProductBtn.click(function() {
        updateProduct(productId, $('#product_name').val(),$('#product_description').val(), $('#product_price').val(), $('#Product_quantity').val());
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
  boxItem.appendChild(pCategory);
  boxItem.appendChild(iconsInItems);
  allProducts_section.appendChild(boxItem);
};
/* End  Create Product item */
/* Start Ongoing Order */
function createOrderItem(orderId, orderItems, orderTotal, orderDate, orderStatus) {
  const OngoingOrderSection = document.querySelector(".order-Ongoing-section table tbody");

  const boxItem = document.createElement("tr");
  OngoingOrderSection.appendChild(boxItem);

  const orderIdTd = document.createElement("td");
  orderIdTd.innerText = orderId;
  boxItem.appendChild(orderIdTd);

  const orderItemsTd = document.createElement("td");
  orderItems.forEach(item => {
    orderItemsTd.innerHTML += `<span>${item.product_name}<br></span>`;
  });
  boxItem.appendChild(orderItemsTd);

  const orderTotalTd = document.createElement("td");
  orderTotalTd.innerText = orderTotal;
  boxItem.appendChild(orderTotalTd);

  const orderDateTd = document.createElement("td");
  orderDateTd.innerText = orderDate.split("T")[0];
  boxItem.appendChild(orderDateTd);

  const orderStatusTd = document.createElement("td");
  orderStatusTd.innerText = orderStatus;
  boxItem.appendChild(orderStatusTd);
};
/* End Ongoing Order */

/* Start some */
function addNewInput() {
  var newInput = document.createElement('input');
  newInput.type = 'file';
  newInput.accept = 'image/*';
  newInput.className = 'productImages';
  newInput.onchange = addNewInput;

  document.querySelector('.filesInput').appendChild(newInput);
}
/* End some */


$(document).ready(function() {
    getCategories();
    /* start get option */
    $('#New_product').click(getCatInSelect());
    /* End get option */

    $("#createCategory").click(function() {
      if ($("#category_name").val() == "") {
        $("#category_name").css("border", "1px solid red");
        alert("Please enter a category name");
      } else {
        createCategory($("#category_name").val(), $("#createCategoryFileInput")[0].files[0]);
      };
    });
    
    document.getElementById("createProduct").addEventListener("click", sendProductData);

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
    /* start check if there is user or not */
    if (localStorage.getItem("userRole") != "admin") {
      window.location.href = "../../index.html";
    }else {
      document.querySelector("header .user").innerHTML = `<span>${localStorage.getItem("userFirstName")}</span>`;
    };
    /* End check if there is user or not */

    document.getElementById('logout').addEventListener('click', logout)
});

/* API Functions */

/* start get Category In Selector */
function getCatInSelect() {
  $.get(`http://${lesIp}:3000/api/categories`, function (data) {
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
  $.get(`http://${lesIp}:3000/api/categories`, function (data) {
    data.forEach(category => {
      createCategoryItem(category.category_name, category.image.image, category.id);
    });
  });
};
/* End get Category function */
/* Start Post Category function */
function createCategory(catName, catImage) {
  const formData = new FormData();
  formData.append("category_name", catName);
  formData.append("image", catImage)

  $.ajax({
    type: "POST",
    xhrFields: {
      withCredentials: true,
    },
    url: `http://${lesIp}:3000/api/categories`,
    contentType: false, // let jQuery handle the content type
    processData: false, // prevent jQuery from transforming the data
    enctype: 'multipart/form-data',
    data: formData,
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
};
/* End Post Category function */
/* Start delete Category function */
function delCategory(CategoryID) {
  $.ajax({
    type: "DELETE",
    xhrFields: {
      withCredentials: true,
    },
    url: `http://${lesIp}:3000/api/categories/` + CategoryID,
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
    url: `http://${lesIp}:3000/api/categories/` + CategoryID,
    xhrFields: {
      withCredentials: true,
    },
    contentType: "application/json",
    Connection: "keep-alive",
    data: JSON.stringify(obj),
    success: function(resp) {
      $('#editModal').css('display', 'none');
      $('#success').css('display', 'flex');
      $(".success-content").append(`<p>Category Name Updated Successfully</p>`);
    },
    error: function(xhr, status, error) {
      console.error(xhr, status, error);
    }
  });
};
/* End Update Category function */
/* Start  get Products function*/
function getProducts() {
  fetch(`http://${lesIp}:3000/api/products`)
    .then(response => response.json())
    .then(data => {
      data.forEach(product => {
        createProductItem(product.id, product.product_name, product.product_desc, product.product_price, product.product_amount, product.category.category_name, product.images);
      });
    })
    .catch(error => {
      console.error("Fetch request failed:", error);
      // Handle the error, maybe show an error message to the user
    });
};
/* End get Products function */
/* Start send product data */
function sendProductData() {
  // Create FormData object
  const formData = new FormData();
  formData.append("product_name", document.getElementById("product_name").value);
  formData.append("product_desc", document.getElementById("product_description").value);
  formData.append("product_price", document.getElementById("product_price").value);
  formData.append("product_amount", document.getElementById("Product_quantity").value);
  formData.append("category_name", document.getElementById("product_category").value);

  // Get the image file
  const imageInputs = document.querySelectorAll('.productImages');
  imageInputs.forEach((input) => {
    const files = input.files;
    if (files.length > 0) {
      formData.append("images", files[0]);
    }
  });

  // Send fetch request with FormData
  fetch(`http://${lesIp}:3000/api/products`, {
    method: "POST",
    credentials: "include", // Equivalent to xhrFields: { withCredentials: true }
    body: formData
  })
  .then(response => response.json())
  .then(resp => {
    // Handle success response
    document.getElementById('modalCategory').style.display = 'none';
    document.getElementById('success').style.display = 'flex';
    const successContent = document.querySelector(".success-content");
    for (const key in resp) {
      if (resp.hasOwnProperty(key)) {
        const span = document.createElement("span");
        span.textContent = (key === "category") ? resp[key].category_name : resp[key];

        const para = document.createElement("p");
        para.textContent = `${key}:`;
        para.appendChild(span);

        successContent.appendChild(para);
      }
    }
    console.log(resp);
  })
  .catch(error => {
    console.error("Fetch request failed:", error);
    // Handle the error, maybe show an error message to the user
  });

  // Reset form fields
  document.getElementById("product_name").value = "";
  document.getElementById("product_description").value = "";
  document.getElementById("product_price").value = "";
  document.getElementById("Product_quantity").value = "";
  document.getElementById("product_category").value = "Choose Category";
  document.querySelectorAll('.productImages').forEach(
    value=> value = ""
  ); // Clear the input file field
};
/* End send product data */
/* Start delete Product function */
function deleteProduct(productId) {
  fetch(`http://${lesIp}:3000/api/products/${productId}`, {
    method: "DELETE",
    credentials: "include" // Equivalent to xhrFields: { withCredentials: true }
  })
  .then(response => response.json())
  .then(resp => {
    document.getElementById('confirmModal').style.display = 'none';
    document.getElementById('success').style.display = 'flex';
    const successContent = document.querySelector(".success-content");
    successContent.innerHTML = "<p>Product Deleted Successfully</p>";
    console.log(resp);
  })
  .catch(error => {
    console.error("Fetch request failed:", error);
    // Handle the error, maybe show an error message to the user
  });
}
/* End delete Product function */
/* Start Update Product function */
function updateProduct(productId, productName, productDescription, productPrice, productAmount, productCategory) {
  const obj = {
    "product_name": productName,
    "product_desc": productDescription,
    "product_amount": productAmount,
    "product_price": productPrice,
    "category_name": productCategory
  };

  fetch(`http://${lesIp}:3000/api/products/${productId}`, {
    method: "PUT",
    credentials: "include", // Equivalent to xhrFields: { withCredentials: true }
    headers: {
      "Content-Type": "application/json",
      "Connection": "keep-alive"
    },
    body: JSON.stringify(obj)
  })
  .then(response => response.json())
  .then(resp => {
    document.getElementById('editModal').style.display = 'none';
    document.getElementById('success').style.display = 'flex';
    const successContent = document.querySelector(".success-content");
    successContent.innerHTML = "<p>Product Updated Successfully</p>";
    console.log(resp);
  })
  .catch(error => {
    console.error("Fetch request failed:", error);
    // Handle the error, maybe show an error message to the user
  });
}
/* End Update Product function */
/* Start get Orders function */
function getOrders() {
  fetch(`http://${lesIp}:3000/api/order`, {
      method: "GET",
      credentials: "include",
      headers: {
          "Content-Type": "application/json",
          "Connection": "keep-alive"
      },
  })
  .then((response) => response.json())
  .then((data) => {
      data.data.forEach((order) => {
        createOrderItem(order.id, order.products, order.total, order.created_at, order.status);
      });
  })
  .catch((error) => {
      console.error("Error:", error);
  });
};
/* End get Orders function */
/* Start logout */
function logout() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `http://${lesIp}:3000/api/logout`, true);
  xhr.withCredentials = true;

  localStorage.removeItem("userFirstName");
  localStorage.removeItem("userRole");

  xhr.onload = function () {
      if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
      }
  };

  xhr.onerror = function (error) {
      console.error("Error:", error);
  };

  xhr.send();

  window.location.reload();
}
/* End logout */