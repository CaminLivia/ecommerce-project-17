window.addEventListener("load", async () => {
  let searchParamString = window.location.search;

  const searchParam = new URLSearchParams(searchParamString);
  const productBrand = searchParam.get("brand");

  const brandTitle = document.querySelector(".brand-title");
  brandTitle.innerHTML = productBrand;

  const productsURL = `https://61f17300072f86001749f1f8.mockapi.io/products`;
  const result = await fetch(productsURL);
  const products = await result.json();

  let productsByBrand = products.filter(
    (product) => product.brand == productBrand
  );
  console.log(productsByBrand);
  const productsByBrandContainer = document.querySelector(".products-by-brand");

  const cardsProductByBrand = productsByBrand
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

  productsByBrandContainer.innerHTML = cardsProductByBrand;
});
