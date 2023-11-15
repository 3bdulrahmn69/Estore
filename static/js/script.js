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

const newCategory = document.getElementById("New_category");
const categoryName = document.getElementById("category_name");
$(document).ready(function() {
    $("#New_category").click(function() {
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
          console.log(resp);
        }
      });
  
      $("#category_name").val("");
    });
  });