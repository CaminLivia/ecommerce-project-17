const nrProdCartHeader = document.querySelector(".nrProdCart");

window.addEventListener("load", async () => {
  let searchParamString = window.location.search;

  const searchParam = new URLSearchParams(searchParamString);
  const productBrand = searchParam.get("brand");

  const brandTitle = document.querySelector(".brand-title");
  brandTitle.innerHTML = productBrand;

  const productsURL = `https://61f17300072f86001749f1f8.mockapi.io/products`;
  const result = await fetch(productsURL);
  const products = await result.json();

  const cart = JSON.parse(localStorage.getItem("cart"));
  let totalProductsInCart = 0;
  if (cart != null) {
    cart.forEach((productCart) => {
      totalProductsInCart += productCart.noOfProducts;
    });
    nrProdCartHeader.innerHTML = totalProductsInCart;
  }

  let productsByBrand = products.filter(
    (product) => product.brand == productBrand
  );
  productsByBrand.reverse();

  const productsByBrandContainer = document.querySelector(".products-by-brand");

  const cardsProductByBrand = productsByBrand
    .map(
      (product) =>
        `<div class="card brand-page" style="width: 18rem;">
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

  productsByBrandContainer.innerHTML = cardsProductByBrand;
});

document
  .querySelector(".products-by-brand")
  .addEventListener("click", addToCart);
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
