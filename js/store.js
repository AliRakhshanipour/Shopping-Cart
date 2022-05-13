const $ = document;
const conLog = console.log.bind(console); // easy debugging
//set src of images and fonts
const itemSource = {
  images: {
    nameObj: "images",
    srcObj: {
      sources: [
        {
          name: "iPhone 11 pro max",
          src: "Images/iphone 11 pro max.jpeg",
          price: 320,
        },
        {
          name: "iPhone 11 Pro",
          src: "Images/iphone 11 pro.jpeg",
          price: 298,
        },
        { name: "iPhone 11", src: "Images/iphone 11.jpeg", price: 250 },
        {
          name: "iPhone 12 Pro Max",
          src: "Images/iphone 12 pro max.jpeg",
          price: 520,
        },
        {
          name: "iPhone 12 Pro",
          src: "Images/iphone 12 pro.jpeg",
          price: 490,
        },
        { name: "iPhone 12", src: "Images/iphone 12.jpeg", price: 439 },
        {
          name: "iPhone 13 Mini",
          src: "Images/iphone 13 mini.webp",
          price: 620,
        },
        {
          name: "iPhone 13 Pro Max",
          src: "Images/iphone 13 pro max.jpeg",
          price: 800,
        },
        {
          name: "iPhone 13 Pro",
          src: "Images/iphone 13 pro.jpeg",
          price: 780,
        },
        { name: "iPhone 13", src: "Images/iphone 13.png", price: 690 },
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

//get items from dataBase
itemSource.images.srcObj.sources.forEach((item) => {
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

  //set function to items calculate
  function addToCartHandler(event) {
    cartItems.innerHTML = "";
    // let checkItemExistingFlag = shoppingCart.includes(item.name);
    // if (!checkItemExistingFlag) {
    //   pushItemIntoShoppingCart(item.name);
    //   showItemInList(shoppingCart, item);
    // } else {
    //   pushItemIntoShoppingCart(item.name);
    // }
    showItemInList(shoppingCart, item);
  }

  //set function to push item into the shopping cart list
  function pushItemIntoShoppingCart(clickedItem) {
    shoppingCart.push(clickedItem);
  }

  //show items in cart list
  function showItemInList(cart_array, source) {
    //set a method for counting repeated elements
    const count = {};

    //set elements to cart list
    let cartRow = $.createElement("div");
    let cartColumn = $.createElement("div");
    let cartItemImage = $.createElement("img");
    let cartItemTitle = $.createElement("span");
    let cartItemPrice = $.createElement("span");
    let cartItemQuantity = $.createElement("div");
    let cartItemQuantityInput = $.createElement("input");
    let cartItemRemoveBtn = $.createElement("button");

    //checkItemExistingFlag
    let checkItemExistingFlag = cart_array.includes(source.name);
    if (!checkItemExistingFlag) {
      pushItemIntoShoppingCart(item.name);
      //count number of repeated elements
      cart_array.forEach((element) => {
        count[element] = (count[element] || 0) + 1; // easy to count repeated elements

        //set class to items
        cartRow.className = "cart-row";
        cartColumn.className = "cart-item cart-column";
        cartItemImage.className = "cart-item-image";
        cartItemTitle.className = "cart-item-title";
        cartItemPrice.className = "cart-price cart-column";
        cartItemQuantity.className = "cart-quantity cart-column";
        cartItemQuantityInput.className = "cart-quantity-input";
        cartItemRemoveBtn.className = "btn btn-danger";

        //set src,width,height to image element
        cartItemImage.src = source.src;
        cartItemImage.width = "100";
        cartItemImage.height = "100";

        //set title element
        cartItemTitle.innerHTML = source.name;

        //set cart item price
        cartItemPrice.innerHTML = " $ " + source.price;

        //set quantity element type and value
        cartItemQuantityInput.type = "number";
        cartItemQuantityInput.value = count[source.name];

        //set remove button type and value
        cartItemRemoveBtn.type = "button";
        cartItemRemoveBtn.innerHTML = "remove";

        //append elements to parents
        cartColumn.append(cartItemImage, cartItemTitle);
        cartItemQuantity.append(cartItemQuantityInput, cartItemRemoveBtn);
        cartRow.append(cartColumn, cartItemPrice, cartItemQuantity);
        cartItems.appendChild(cartRow);
      });
    } else {
    }
    cartItemRemoveBtn.addEventListener("click", (event) => {
      event.target.parentNode.parentNode.remove();
    });

    //--------------------------------------------------------

    //-----------------------------------------------------
  }

  shopItemAddBtn.addEventListener("click", addToCartHandler);

  //shop item title
  shopItemTitle.innerHTML = item.name;

  //set price to items
  shopItemPrice.innerHTML = " $ " + item.price;

  //add btn type and inner text
  shopItemAddBtn.type = "button";
  shopItemAddBtn.innerHTML = "Add To Cart";

  //set src for image items
  shopItemImage.src = item.src;

  //append to parent elements
  shopItemDetails.append(shopItemPrice, shopItemAddBtn);
  shopItemBox.append(shopItemTitle, shopItemImage, shopItemDetails);
  shopItems.appendChild(shopItemBox);
});
