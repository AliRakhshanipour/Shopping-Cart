//create shopping cart elements
function createShoppingCartElements(shoppingProductArray) {
  totalPriceShop = 0;
  shoppingProductArray.forEach((productItem) => {
    //set elements to cart list
    let cartRow = $.createElement("div");
    let cartColumn = $.createElement("div");
    let cartItemImage = $.createElement("img");
    let cartItemTitle = $.createElement("span");
    let cartItemPrice = $.createElement("span");
    let cartItemQuantity = $.createElement("div");
    let cartItemQuantityInput = $.createElement("input");
    let cartItemRemoveBtn = $.createElement("button");

    //set class to items
    cartRow.className = "cart-row";
    cartRow.id = productItem.id;
    cartColumn.className = "cart-item cart-column";
    cartItemImage.className = "cart-item-image";
    cartItemTitle.className = "cart-item-title";
    cartItemPrice.className = "cart-price cart-column";
    cartItemQuantity.className = "cart-quantity cart-column";
    cartItemQuantityInput.className = "cart-quantity-input";
    cartItemRemoveBtn.className = "btn btn-danger";

    //set src,width,height to image element
    cartItemImage.src = productItem.src;
    cartItemImage.width = "100";
    cartItemImage.height = "100";

    //set title element
    cartItemTitle.innerHTML = productItem.name;

    //set cart item price
    cartItemPrice.innerHTML = " $ " + productItem.price;

    //set quantity element type and value
    cartItemQuantityInput.type = "number";
    cartItemQuantityInput.value = 1;

    //set remove button type and value
    cartItemRemoveBtn.type = "button";
    cartItemRemoveBtn.innerHTML = "remove";

    //remove button handler
    cartItemRemoveBtn.addEventListener("click", () => {
      cartItemRemoveBtnHandler(productItem.id);
    });

    //set total price handler
    totalPriceHandler(productItem);

    cartItemQuantityInput.onchange = (event) => {
      totalPriceShop -= productItem.price;
      let itemNumber = event.target.value;
      totalPriceHandler(productItem, itemNumber);
    };

    //append elements to parents
    cartColumn.append(cartItemImage, cartItemTitle);
    cartItemQuantity.append(cartItemQuantityInput, cartItemRemoveBtn);
    cartRow.append(cartColumn, cartItemPrice, cartItemQuantity);
    cartItems.appendChild(cartRow);
  });
  // console.log(cartItems);
}

function cartItemRemoveBtnHandler(productItemId) {
  shoppingCart = shoppingCart.filter(function (item) {
    return item.id !== productItemId;
  });
  cartItems.innerHTML = "";
  createShoppingCartElements(shoppingCart);
  if (shoppingCart.length == 0) {
    totalPrice.innerHTML = "";
  }
}

//set a button to remove all cart items from shopping cart
function removeAllItems() {
  totalPrice.innerHTML = "";
  cartItems.innerHTML = "";
  shoppingCart = [];
  createShoppingCartElements(shoppingCart);
}

//set function to push item into the shopping cart list
function pushToCartHandler(productName) {
  let mainItem = itemArray.find((product) => {
    return product.name === productName;
  });
  if (!shoppingCart.includes(mainItem)) {
    shoppingCart.push(mainItem);
    cartItems.innerHTML = "";
    createShoppingCartElements(shoppingCart);
    //sweetAlert for adding product
    Swal.fire({
      title: mainItem.name,
      text: "added to shopping cart",
      imageUrl: mainItem.src,
      imageWidth: 120,
      imageHeight: 100,
      imageAlt: mainItem.name,
      showConfirmButton: false,
      timer: 800,
    });
  } else {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Already Added",
      showConfirmButton: false,
      timer: 700,
    });
  }
}

//set total price handler
function totalPriceHandler(pItem, itemNumber = 1) {
  totalPriceShop += pItem.price * itemNumber;
  totalPrice.innerHTML = " $ " + totalPriceShop;
}
