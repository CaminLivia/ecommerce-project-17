let searchParamString = window.location.search;

const searchParam = new URLSearchParams(searchParamString);
const productCategory = searchParam.get("category");
const productBrand = searchParam.get("brand");

const categoryTitle = document.querySelector(".category-title");
if (productBrand != null) {
  categoryTitle.innerHTML = productCategory + " - " + productBrand;
} else {
  categoryTitle.innerHTML = productCategory;
}

window.addEventListener("load", async () => {
  const productsURL = `https://61f17300072f86001749f1f8.mockapi.io/products`;
  const result = await fetch(productsURL);
  const products = await result.json();

  let productsByCategoryRandom = products.filter(
    (product) => product.gender == productCategory
  );

  if (productBrand != null) {
    let productsCategoryAndBrandRandom = productsByCategoryRandom.filter(
      (product) => product.brand == productBrand
    );
    productsCategoryAndBrandRandom.sort(function (a, b) {
      return 0.5 - Math.random();
    });
    displayProducts(productsCategoryAndBrandRandom);
  } else {
    productsByCategoryRandom.sort(function (a, b) {
      return 0.5 - Math.random();
    });
    displayProducts(productsByCategoryRandom);
  }
});

document.querySelector(".sort").addEventListener("click", handleSort);

async function handleSort(event) {
  const productsURL = `https://61f17300072f86001749f1f8.mockapi.io/products`;
  const result = await fetch(productsURL);
  const products = await result.json();

  if (productBrand != null) {
    let productsAll = products.filter(
      (product) => product.gender == productCategory
    );
    let productsByCategoryOldAndBrand = productsAll.filter(
      (product) => product.brand == productBrand
    );
    let productsByCategoryNewAndBrand = [
      ...productsByCategoryOldAndBrand,
    ].reverse();
    let productsByCategoryLowAndBrand = [...productsByCategoryNewAndBrand].sort(
      function (a, b) {
        return Number(a.price) - Number(b.price);
      }
    );
    let productsByCategoryHighAndBrand = [
      ...productsByCategoryLowAndBrand,
    ].reverse();

    if (event.target.classList.contains("new")) {
      displayProducts(productsByCategoryNewAndBrand);
    } else if (event.target.classList.contains("old")) {
      displayProducts(productsByCategoryOldAndBrand);
    } else if (event.target.classList.contains("highPrice")) {
      displayProducts(productsByCategoryHighAndBrand);
    } else if (event.target.classList.contains("lowPrice")) {
      displayProducts(productsByCategoryLowAndBrand);
    }
  } else {
    let productsByCategoryOld = products.filter(
      (product) => product.gender == productCategory
    );
    let productsByCategoryNew = [...productsByCategoryOld].reverse();
    let productsByCategoryLow = [...productsByCategoryNew].sort(function (
      a,
      b
    ) {
      return Number(a.price) - Number(b.price);
    });
    let productsByCategoryHigh = [...productsByCategoryLow].reverse();

    if (event.target.classList.contains("new")) {
      displayProducts(productsByCategoryNew);
    } else if (event.target.classList.contains("old")) {
      displayProducts(productsByCategoryOld);
    } else if (event.target.classList.contains("highPrice")) {
      displayProducts(productsByCategoryHigh);
    } else if (event.target.classList.contains("lowPrice")) {
      displayProducts(productsByCategoryLow);
    }
  }
}

async function displayProducts(productArray) {
  const productsByCategoryContainer = document.querySelector(
    ".products-by-category"
  );

  const cardsProductByCategory = productArray
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
}
