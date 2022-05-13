const $ = document;
const conLog = console.log.bind(console); // easy debugging
//set src of images and fonts
const itemSource = {
  images: {
    nameObj: "images",
    srcObj: {
      sources: [
        {
          id: 1,
          name: "iPhone 11 pro max",
          src: "Images/iphone 11 pro max.jpeg",
          price: 320,
        },
        {
          id: 2,
          name: "iPhone 11 Pro",
          src: "Images/iphone 11 pro.jpeg",
          price: 298,
        },
        { id: 3, name: "iPhone 11", src: "Images/iphone 11.jpeg", price: 250 },
        {
          id: 4,
          name: "iPhone 12 Pro Max",
          src: "Images/iphone 12 pro max.jpeg",
          price: 520,
        },
        {
          id: 5,
          name: "iPhone 12 Pro",
          src: "Images/iphone 12 pro.jpeg",
          price: 490,
        },
        { id: 6, name: "iPhone 12", src: "Images/iphone 12.jpeg", price: 439 },
        {
          id: 7,
          name: "iPhone 13 Mini",
          src: "Images/iphone 13 mini.webp",
          price: 620,
        },
        {
          id: 8,
          name: "iPhone 13 Pro Max",
          src: "Images/iphone 13 pro max.jpeg",
          price: 800,
        },
        {
          id: 9,
          name: "iPhone 13 Pro",
          src: "Images/iphone 13 pro.jpeg",
          price: 780,
        },
        { id: 10, name: "iPhone 13", src: "Images/iphone 13.png", price: 690 },
      ],
    },
  },
  fonts: {
    nameObj: "fonts",
    srcObj: [
      "../Fonts/Booter - Zero Zero.woff",
      "../Fonts/Booter - Zero Zero.woff2",
    ],
  },
};

//set cart for customer
let shoppingCart = Array();

// get elements from DOM
const purchaseBtn = $.getElementById("purchase");
const shopItems = $.querySelector(".shop-items");
const cartItems = $.querySelector(".cart-items");

//get item array from dataBase

let itemArray = itemSource.images.srcObj.sources;

//get items from dataBase
itemArray.forEach((productItem) => {
  //create elements for every item from dataBase
  let shopItemBox = $.createElement("div");
  let shopItemTitle = $.createElement("span");
  let shopItemImage = $.createElement("img");
  let shopItemDetails = $.createElement("div");
  let shopItemPrice = $.createElement("span");
  let shopItemAddBtn = $.createElement("button");

  //set class to items from dataBase
  shopItemBox.className = "shop-item";
  shopItemTitle.className = "shop-item-title";
  shopItemImage.className = "shop-item-image";
  shopItemDetails.className = "shop-item-details";
  shopItemPrice.className = "shop-item-price";
  shopItemAddBtn.className = "btn btn-primary shop-item-button";

  //================================================================
  //set function to items calculate
  function addToCartHandler() {
    pushToCartHandler(productItem.name);
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
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Already Added",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }

  //================================================================

  shopItemAddBtn.addEventListener("click", () => {
    addToCartHandler();
  });

  //shop item title
  shopItemTitle.innerHTML = productItem.name;

  //set price to items
  shopItemPrice.innerHTML = " $ " + productItem.price;

  //add btn type and inner text
  shopItemAddBtn.type = "button";
  shopItemAddBtn.innerHTML = "Add To Cart";

  //set src for image items
  shopItemImage.src = productItem.src;

  //append to parent elements
  shopItemDetails.append(shopItemPrice, shopItemAddBtn);
  shopItemBox.append(shopItemTitle, shopItemImage, shopItemDetails);
  shopItems.appendChild(shopItemBox);
});
//create shopping cart elements
function createShoppingCartElements(shoppingProductArray) {
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

    //append elements to parents
    cartColumn.append(cartItemImage, cartItemTitle);
    cartItemQuantity.append(cartItemQuantityInput, cartItemRemoveBtn);
    cartRow.append(cartColumn, cartItemPrice, cartItemQuantity);
    cartItems.appendChild(cartRow);
  });
}

function cartItemRemoveBtnHandler(productItemId) {
  shoppingCart = shoppingCart.filter(function (item) {
    return item.id !== productItemId;
  });
  cartItems.innerHTML = "";
  createShoppingCartElements(shoppingCart);
}
