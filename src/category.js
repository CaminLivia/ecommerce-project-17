window.addEventListener("load", async () => {
  let searchParamString = window.location.search;

  const searchParam = new URLSearchParams(searchParamString);
  const productCategory = searchParam.get("category");

  const categoryTitle = document.querySelector(".category-title");
  categoryTitle.innerHTML = productCategory;

  const productsURL = `https://61f17300072f86001749f1f8.mockapi.io/products`;
  const result = await fetch(productsURL);
  const products = await result.json();

  let productsByCategory = products.filter(
    (product) => product.gender == productCategory
  );

  const productsByCategoryContainer = document.querySelector(
    ".products-by-category"
  );

  const cardsProductByCategory = productsByCategory
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

  productsByCategoryContainer.innerHTML = cardsProductByCategory;
});
