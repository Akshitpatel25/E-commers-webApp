document.addEventListener("DOMContentLoaded", function () {
  let Total_price = 0;

  const item_array = [
    {
      id: Date.now(),
      product_name: "Pizza",
      product_price: "199",
    },
    {
      id: Date.now(),
      product_name: "Momos",
      product_price: "99",
    },
    {
      id: Date.now(),
      product_name: "French-Fry",
      product_price: "50",
    },
  ];

  // Shopping cart array
  let shopping_cart_array =
    JSON.parse(localStorage.getItem("shopping_cart")) || [];

  // assigning variable
  const store_item = document.querySelector(".store_item");
  const shopping_cart = document.querySelector(".shopping_cart");
  const total_item_price = document.querySelector(".total_item_price");
  const check_out = document.querySelector(".check_out");

  // creating element using DOM logic
  function creating_element_DOM() {
    for (let i = 0; i < item_array.length; i++) {
      // console.log(item_array[i]);

      let item_box = document.createElement("div");
      // item_box.style.border = '1px solid white';
      // item_box.style.padding = '15px';
      item_box.style.display = "flex";
      item_box.style.justifyContent = "space-between";
      item_box.style.alignItems = "center";

      let item_name = document.createElement("p");
      item_name.textContent = `${item_array[i].product_name} - ₹${item_array[i].product_price}`;
      item_name.style.color = "white";
      item_name.style.fontSize = "20px";

      let item_add_button = document.createElement("button");
      item_add_button.textContent = "ADD";
      item_add_button.className = "item_add_button";
      item_add_button.style.backgroundColor = "white";
      item_add_button.style.padding = "10px";
      item_add_button.style.borderRadius = "5px";

      // add to cart
      item_add_button.addEventListener("click", function () {
        console.log(`${item_array[i].product_name}`);
        shopping_cart_array.push(item_array[i]);
        save_localStorage();
        window.location.reload();
      });

      // Append elements to item_box and store_item
      item_box.appendChild(item_name);
      item_box.appendChild(item_add_button);
      store_item.appendChild(item_box);
    }
  }

  // adding item to shopping cart array logic
  for (let i = 0; i < shopping_cart_array.length; i++) {
    let box = document.createElement("div");
    box.style.width = "100%";
    box.style.display = "flex";
    box.style.justifyContent = "space-between";

    let cart_item_name = document.createElement("h4");
    cart_item_name.textContent = `${shopping_cart_array[i].product_name}: ₹${shopping_cart_array[i].product_price}`;
    cart_item_name.style.color = "white";

    let cart_delete_btn = document.createElement("button");
    cart_delete_btn.textContent = "remove";
    cart_delete_btn.style.color = "white";
    cart_delete_btn.style.borderRadius = "5px";
    cart_delete_btn.style.padding = "0px 7px 0px 7px";
    cart_delete_btn.style.backgroundColor = "black";
    cart_delete_btn.style.color = "red";

    // Removing item from shopping cart
    cart_delete_btn.addEventListener("click", function () {
      console.log(`${shopping_cart_array[i].id}`);

      shopping_cart_array = shopping_cart_array.filter(
        (item) => item.id != shopping_cart_array[i].id
      );
      save_localStorage();
      window.location.reload();
    });

    box.appendChild(cart_item_name);
    box.appendChild(cart_delete_btn);
    shopping_cart.appendChild(box);
  }

  // total price logic
  for (let i = 0; i < shopping_cart_array.length; i++) {
    Total_price += Number(shopping_cart_array[i].product_price);
    total_item_price.textContent = `₹ ${Total_price}`;
  }

  // check out logic
  check_out.addEventListener("click", function () {
    if (Total_price === 0) return;

    alert(`Order Confirm`);
    shopping_cart_array = [];
    Total_price = 0;
    save_localStorage();
    window.location.reload();
  });

  // saving to local storage logic
  function save_localStorage() {
    localStorage.setItem("shopping_cart", JSON.stringify(shopping_cart_array));
    localStorage.setItem("Total_price", JSON.stringify(Total_price));
  }

  // calling function
  save_localStorage();
  creating_element_DOM();
});
