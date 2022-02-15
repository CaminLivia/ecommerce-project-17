//  new In Products
window.addEventListener("load", async () => {
  const productsURL = "https://61f17300072f86001749f1f8.mockapi.io/products";
  // const productsURL = "./src/products.json";
  const result = await fetch(productsURL);
  const products = await result.json();
  let nrOfProd = products.length - 1;

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
                  <img src='./products_images/${product.imageURL}' style="width:100%">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">${product.price} lei</p>
                  <a href="details.html?product-id=${product.id}" class="btn btn-primary">Details</a>
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
               <img src='./products_images/${product.imageURL}' style="width:100%">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">${product.price} lei</p>
                  <a href="details.html?product-id=${product.id}" class="btn btn-primary">Details</a>
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
               <img src="./products_images/${product.imageURL}" style="width:100%">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">${product.price} lei</p>
                  <a href="details.html?product-id=${product.id}" class="btn btn-details">Details</a>
                  <button data-product-id=${product.id} class="add-to-cart btn btn-primary">Add to cart</button>
               </div>
         </div>`
    )
    .join("");

  console.log(cardsBestSeller);

  bestSellerProductContainer.innerHTML = cardsBestSeller;
});
