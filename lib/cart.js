var outer = document.getElementsByClassName("shop-items");

function ready() {
    var removeCartItemButtons = document.getElementsByClassName("btn-danger");
    for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i];
      button.addEventListener("click", removeCartItem);
    }
  
  
    var addToCartButtons = document.getElementsByClassName("shop-item-button");
    for (var i = 0; i < addToCartButtons.length; i++) {
      var button = addToCartButtons[i];
      button.addEventListener("click", addToCartClicked);
    }
  
    document
      .getElementsByClassName("btn-purchase")[0]
      .addEventListener("click", purchaseClicked);
  }

function clean() {
  cart = [];
  localStorage.setItem("Cart", JSON.stringify(cart));

  while (outer[0].hasChildNodes()) {
    outer[0].removeChild(outer[0].firstChild);
  }
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
 clean
  alert("Cart Emptied");
}

function purchaseClicked() {
  alert("Thank you for your purchase");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  
  updateCartTotal();
  clean()
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function addToCartClicked(event) {
  console.log("event")
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  console.log("Shop item found");
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  console.log(imageSrc);
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" hidden type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);

    updateCartTotal()
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("ETB ",""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "ETB " + total;
}

window.addEventListener("load", function () {
  var cart = JSON.parse(localStorage.getItem("Cart"));
  console.log(cart);

  for (i of cart) {
    var div1 = document.createElement("div");
    div1.classList.add("shop-item");
    var div2 = document.createElement("div");
    div2.classList.add("shop-item-details");

    var img = document.createElement("img");
    img.classList.add("shop-item-image");

    var span = document.createElement("span");
    span.classList.add("shop-item-title");
    var span2 = document.createElement("span");
    span2.classList.add("shop-item-price");

    var button = document.createElement("button");
    button.classList.add("shop-item-button");
    button.setAttribute("type","button")

    console.log(outer[0]);
    var store = JSON.parse(localStorage.getItem(i));
    // console.log(store)

    span2.innerHTML = `${store.price} ETB`;
    button.innerHTML = `${"Checkout"}`;
 
    
    div2.appendChild(span2);
    div2.appendChild(button);

    console.log("div2");
    console.log(div2);

    img.src = store.impath;
    span.innerHTML = `${store.title}`;

    div1.appendChild(span);
    div1.appendChild(img);
    div1.appendChild(div2);
    console.log("div1");
    console.log(div1);

    outer[0].appendChild(div1);

    console.log("parent");
    shopItem = button.parentElement.parentElement;
    console.log(shopItem);
    title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    console.log(title);
    price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    // console.log(price)
    imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
    console.log(imageSrc);

    ready()

    // button.onclick=addToCartClicked(event)
  }
});