const $ = document;
const conLog = console.log.bind(console); // easy debugging

//set cart for customer
let shoppingCart = Array();

// get elements from DOM
const purchaseBtn = $.getElementById("purchase");
const shopItems = $.querySelector(".shop-items");
const cartItems = $.querySelector(".cart-items");
const removeAllBtn = $.querySelector("#purchase");
const totalPrice = $.querySelector(".cart-total-price");
let totalPriceShop;

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

removeAllBtn.addEventListener("click", () => {
  removeAllItems();
});
