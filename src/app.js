const nrProdCartHeader = document.querySelector(".nrProdCart");
//  new In Products
window.addEventListener("load", async () => {
  const productsURL = "https://61f17300072f86001749f1f8.mockapi.io/products";
  // const productsURL = "./src/products.json";
  const result = await fetch(productsURL);
  const products = await result.json();
  let nrOfProd = products.length - 1;
  const cart = JSON.parse(localStorage.getItem("cart"));
  let totalProductsInCart = 0;
  if (cart != null) {
    cart.forEach((productCart) => {
      totalProductsInCart += productCart.noOfProducts;
    });
    nrProdCartHeader.innerHTML = totalProductsInCart;
  }

  // creating newInProduct Cards
  let newInProducts = [];
  for (let i = nrOfProd; i >= nrOfProd - 3; i--) {
    newInProducts.push(products[i]);
  }

  const newInProductContainer = document.querySelector(
    ".newIn-products-container"
  );

  const cardsNewIn = newInProducts
    .map(
      (product) =>
        `<div class="card" style="width:18rem">
               <div class="card-body">
                  <div>
                    <a href="details.html?product-id=${product.id}">
                      <img src='./products_images/${product.imageURL}' style="width:100%">
                      <h5 class="card-title">${product.name}</h5>
                      <p>${product.price} lei</p>
                    </a>
                  </div>
                  <div class="butons-card">                    
                    <button data-product-id=${product.id} class="add-to-cart btn btn-primary btn-orange">Add to cart</button>
                  </div>
                </div>
         </div>`
    )
    .join("");

  // <a href="details.html?product-id=${product.id}" class="btn btn-primary">Details</a>

  newInProductContainer.innerHTML = cardsNewIn;

  // creating luxuryProduct Cards
  const luxuryProductContainer = document.querySelector(
    ".luxury-products-container"
  );
  let luxuryProducts = [];
  for (let i = 3; i < 5; i++) {
    luxuryProducts.push(products[i]);
  }
  const cardsluxury = luxuryProducts
    .map(
      (product) =>
        `<div class="card" style="width: 18rem;">
      <div class="card-body">
          <div>
            <a href="details.html?product-id=${product.id}">
              <img src='./products_images/${product.imageURL}' style="width:100%">
              <h5 class="card-title">${product.name}</h5>
              <p>${product.price} lei</p>
            </a>
          </div>
          <div class="butons-card">                    
            <button data-product-id=${product.id} class="add-to-cart btn btn-primary btn-orange">Add to cart</button>
          </div>
      </div>
    </div>`
    )
    .join("");

  luxuryProductContainer.innerHTML = cardsluxury;

  //creating bestSellerProduct Cards
  let bestSellerProducts = [];
  for (let i = 1; i < 3; i++) {
    bestSellerProducts.push(products[i]);
  }
  const bestSellerProductContainer = document.querySelector(
    ".bestSeller-products-container"
  );

  const cardsBestSeller = bestSellerProducts
    .map(
      (product) =>
        `<div class="card" style="width: 18rem;">
      <div class="card-body">
          <div>
            <a href="details.html?product-id=${product.id}">
              <img src='./products_images/${product.imageURL}' style="width:100%">
              <h5 class="card-title">${product.name}</h5>
              <p>${product.price} lei</p>
            </a>
          </div>
          <div class="butons-card">                    
            <button data-product-id=${product.id} class="add-to-cart btn btn-primary btn-orange">Add to cart</button>
          </div>
      </div>
    </div>`
    )
    .join("");

  bestSellerProductContainer.innerHTML = cardsBestSeller;
});

document.querySelector(".products-home").addEventListener("click", addToCart);
async function addToCart(event) {
  const addToCartBtn = event.target;
  let productId = addToCartBtn.getAttribute("data-product-id");

  const productURL = `https://61f17300072f86001749f1f8.mockapi.io/products/${productId}`;
  // const productsURL = `./src/products.json`;
  const result = await fetch(productURL);
  const product = await result.json();
  console.log(product);

  let cart = [];
  if (localStorage.getItem("cart") == null) {
    cart.push({ ...product, noOfProducts: 1 });
    // cart.push({ ...product[productId], noOfProducts: 1 });
  } else {
    cart = JSON.parse(localStorage.getItem("cart"));
    const productInCart = cart.find(
      (productFromCart) => productFromCart.id == product.id
      // (productFromCart) => productFromCart[productId] == product.id
    );
    if (productInCart != undefined) {
      // productInCart[productId].noOfProducts++;
      productInCart.noOfProducts++;
      addToCartBtn.innerHTML =
        "Product added to <a href='/cart.html'>cart</a>.";
      setTimeout(() => {
        addToCartBtn.innerHTML = "Add to cart";
      }, 5000);

      console.log("Produsul exista in cos");
    } else {
      const productToBeAddedInCart = { ...product, noOfProducts: 1 };
      // const productToBeAddedInCart = { ...product[productId], noOfProducts: 1 };
      cart.push(productToBeAddedInCart);

      addToCartBtn.innerHTML =
        "Product added to <a href='/cart.html'>cart</a>.";
      setTimeout(() => {
        addToCartBtn.innerHTML = "Add to cart";
      }, 5000);

      console.log("Produsul a fost adaugat prima oara in cos");
    }
  }

  console.log(cart);
  if (cart.length > 0) {
    localStorage.setItem("cart", JSON.stringify(cart));
    let totalProductsInCart = 0;
    cart.forEach((productCart) => {
      totalProductsInCart += productCart.noOfProducts;
    });
    nrProdCartHeader.innerHTML = totalProductsInCart;
  }
}
