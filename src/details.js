const nrProdCartHeader = document.querySelector(".nrProdCart");

window.addEventListener("load", async () => {
  let searchParamString = window.location.search;

  const searchParam = new URLSearchParams(searchParamString);
  const productId = searchParam.get("product-id");

  const productURL = `https://61f17300072f86001749f1f8.mockapi.io/products/${productId}`;
  // const productsURL = `./src/products.json`;
  const result = await fetch(productURL);
  const product = await result.json();

  const cart = JSON.parse(localStorage.getItem("cart"));
  let totalProductsInCart = 0;
  if (cart != null) {
    cart.forEach((productCart) => {
      totalProductsInCart += productCart.noOfProducts;
    });
    nrProdCartHeader.innerHTML = totalProductsInCart;
  }

  //  <h5 class="card-title">${product[productId].name}</h5> -> pentru json

  const productCard = `
    <div class="card-image">
      <img src='./products_images/${product.imageURL}' style="width:100%">
    </div>

		<div class="card-details">
			<div class="card-header">
	  			Product Details
			</div>
			<div class="card-body">
	  			<h5 class="card-title"><strong>${product.name}</strong></h5>
          <p class="card-text gray-text small-text">Product code: YA101203-${product.id}</p>
	  			<p class="card-text gray-text">${product.description}</p>
          <p class="card-text">Brand: <a href="brand.html?brand=${product.brand}">${product.brand}</a></p>
          <p class="card-text">Category: <a href="category.html?category=${product.gender}">${product.gender}</a></p>
          <p class="gray-text small-text"><i class="ph-check"></i> In stock</p>
	  			<h4 class="card-text spaces">${product.price} lei <span class="gray-text small-text">VAT included</span></h4>
	  			<button data-product-id=${product.id} class="add-to-cart btn btn-primary btn-orange">Add to cart</button>
			</div>
      <div class="icons">
      <div class="col-xs-12 gray-text">
        <svg xmlns="http://www.w3.org/2000/svg" width="30.094" height="50.117" viewBox="0 0 48.875 40.094">
          <path
            d="M10.782,37.623a4.123,4.123,0,1,0,4.072,4.122A4.1,4.1,0,0,0,10.782,37.623Zm28.5,0a4.123,4.123,0,1,0,4.071,4.122A4.1,4.1,0,0,0,39.281,37.623Zm6.881-20.61H30.89V28.3H49.459V20.351A3.318,3.318,0,0,0,46.162,17.013ZM30.89,41.746h2.285a6.107,6.107,0,1,1,12.214,0h1.9a2.182,2.182,0,0,0,2.168-2.2V29.921H30.89V41.746ZM15.52,18.4L1.787,32.3A4.12,4.12,0,0,0,.6,35.2V39.17a2.561,2.561,0,0,0,2.545,2.576H4.674a6.107,6.107,0,1,1,12.214,0h12.4V29.921H17.009V29.911l-7.814-.05,8.212-8.368,0.042,6.8H29.284V17.013H18.825A4.645,4.645,0,0,0,15.52,18.4ZM38.144,8.541c2.8-.464,5.143,4.1-3.572,6.921l1.749,0.031c10.945-2.254,8.555-10.583,2.531-9.587C32.571,6.951,31.071,15.4,31.071,15.4l1,0.018C32.086,15.382,35.225,9.026,38.144,8.541ZM23.982,15.447l1.75-.031c-8.714-2.824-6.376-7.385-3.572-6.921,2.918,0.485,6.057,6.84,6.075,6.876l1-.018S27.732,6.9,21.45,5.86C15.427,4.863,13.037,13.193,23.982,15.447Z"
            transform="translate(-0.594 -5.781)"
          ></path>
        </svg>
        <span> Free shipping </span>
      </div>

      <div class="col-xs-12 gray-text">
          <svg
            xmlns="http://www.w3.org/2000/svg" width="30.094" height="50.117" viewBox="0 0 24.625 36.844">
            <path
              d="M29.416,34.856h0a4.07,4.07,0,0,1-1.658-.32l-2.111-.962a1.208,1.208,0,0,0-.754,0l-2.111.882a3.726,3.726,0,0,1-1.583.321H20.747a0.352,0.352,0,0,0-.377.321v8.419a0.211,0.211,0,0,0,.377.16l4.3-3.688a0.438,0.438,0,0,1,.6,0l4.3,3.688a0.224,0.224,0,0,0,.377-0.16V35.177a0.282,0.282,0,0,0-.377-0.321H29.416ZM29.123,20.2a0.846,0.846,0,0,0-.8.644,5.865,5.865,0,0,0-.248,1.976,6.025,6.025,0,0,0,.248,1.993,0.85,0.85,0,0,0,.8.662q1.1,0,1.1-2.655Q30.224,20.2,29.123,20.2Zm-6.9-2.6q0-2.637-1.109-2.636a0.84,0.84,0,0,0-.8.652,6.039,6.039,0,0,0-.244,1.984,6.038,6.038,0,0,0,.244,1.984,0.841,0.841,0,0,0,.8.652Q22.225,20.238,22.225,17.6Zm14.2,3.463a2.378,2.378,0,0,1,0-1.764l1.055-2.726a2.328,2.328,0,0,0-1.131-2.967l-2.563-1.122a2.475,2.475,0,0,1-1.131-1.363L31.6,8.4a2.1,2.1,0,0,0-2.789-1.283L26.25,8.235a2,2,0,0,1-1.658,0L22.029,7.113a2.092,2.092,0,0,0-2.789,1.2l-1.055,2.726a2.037,2.037,0,0,1-1.206,1.2l-2.638,1.2a2.328,2.328,0,0,0-1.131,2.967l1.055,2.726a2.379,2.379,0,0,1,0,1.764L13.21,23.631A2.328,2.328,0,0,0,14.34,26.6L16.9,27.72A2.063,2.063,0,0,1,18.034,29l1.055,2.726a2.1,2.1,0,0,0,2.789,1.283l2.563-1.122a1.993,1.993,0,0,1,1.658,0l2.563,1.122a2.093,2.093,0,0,0,2.789-1.2l1.055-2.726a2.039,2.039,0,0,1,1.206-1.2l2.563-1.123a2.322,2.322,0,0,0,1.206-2.967Zm-17.288-.429a5.553,5.553,0,0,1-.7-3.052q0-4.085,2.68-4.085a2.3,2.3,0,0,1,2.029,1.059,5.418,5.418,0,0,1,.71,3.026,5.58,5.58,0,0,1-.693,3.088A2.306,2.306,0,0,1,21.116,21.7,2.235,2.235,0,0,1,19.137,20.636Zm3.407,6.118h-1.63l6.814-13.068h1.63Zm8.612-.849a2.3,2.3,0,0,1-2.033,1.027,2.251,2.251,0,0,1-1.983-1.059,5.5,5.5,0,0,1-.706-3.052q0-4.085,2.689-4.085a2.3,2.3,0,0,1,2.012,1.055,5.367,5.367,0,0,1,.718,3.03A5.53,5.53,0,0,1,31.156,25.905Z"
              transform="translate(-13.031 -6.938)"
            ></path>
          </svg>
          <span> 100% Original</span>
        </span>
      </div>

      <div class="col-xs-12 gray-text">
          <svg xmlns="http://www.w3.org/2000/svg" width="30.094" height="50.117" viewBox="0 -24 464.00061 415.99985">
            <path
              d="M 256,338.89844 V 307 H 0 v 32.02734 C 0,368.03125 23.4375,392 52.445312,392 H 281.80078 c -2.19922,-2 -4.32031,-3.75391 -6.32422,-5.76172 C 262.94922,373.67187 255.94141,356.64062 256,338.89844 Z m 0,0"
            ></path>
            <path
              d="m 181.25781,145.52344 37.14844,25.5039 37.29297,-25.5039 C 265.89844,138.56641 274,122.86719 274,110.52344 V 57.820312 L 218.5,30.371094 163,57.75 v 52.77344 c 0,12.33984 8.05469,28.04297 18.25781,35 z m 8.36328,-49.8125 c 2.7461,-2.71875 7.17969,-2.69922 9.89844,0.0508 l 11.15625,11.26562 26.85156,-26.84765 c 2.73438,-2.73438 7.16797,-2.73438 9.90235,0.004 2.73437,2.73438 2.73047,7.16797 -0.004,9.90235 l -31.82422,31.83984 c -1.3125,1.31641 -3.08984,2.06641 -4.94922,2.07422 h -0.0156 c -1.86719,-0.0117 -3.65235,-0.76563 -4.95703,-2.10156 L 189.57031,105.625 c -2.71875,-2.75391 -2.69531,-7.1875 0.0508,-9.91406 z m 0,0"
            ></path>
            <path
              d="m 426.89453,-24 h -0.22266 C 406.10547,-24 389,-6.816406 389,13.761719 V 78 h 75 V 13.636719 C 464.09375,-6.980469 447.51172,-23.800781 426.89453,-24 Z m 0,0"
            ></path>
            <path
              class="cls-1"
              d="M 107.46875,-24 C 88.019531,-24 72.191406,-8.382812 72.191406,10.773438 L 70.125,293 H 263 c 3.92578,0.15625 7.02344,3.39453 7,7.32812 v 38.57032 c -0.0703,29.16015 23.4375,52.89062 52.59375,53.10156 h 0.17578 C 351.82031,391.78906 375.19922,368.07031 375,339.01953 V 13.773438 C 375,-0.941406 381.62109,-14 391.57031,-24 Z M 149,53.382812 c -0.0898,-2.632812 1.35156,-5.082031 3.69922,-6.285156 l 62.6875,-30.808594 c 1.92578,-0.953124 4.18359,-0.953124 6.10937,0 l 62.80078,30.894532 c 2.34766,1.203125 3.78907,3.648437 3.70313,6.285156 v 57.05469 c 0,16.98047 -10.36328,37 -24.39844,46.5664 l -41.125,28.19922 c -1.15234,0.79297 -2.51953,1.21875 -3.91797,1.21875 -1.39453,0 -2.7539,-0.42187 -3.89843,-1.21875 l -41.2461,-28.19922 C 159.38672,147.51953 149,127.5 149,110.52344 Z M 318,261 H 126 c -3.86719,0 -7,-3.13281 -7,-7 0,-3.86719 3.13281,-7 7,-7 h 192 c 3.86719,0 7,3.13281 7,7 0,3.86719 -3.13281,7 -7,7 z m 0,-37 H 126 c -3.86719,0 -7,-3.13281 -7,-7 0,-3.86719 3.13281,-7 7,-7 h 192 c 3.86719,0 7,3.13281 7,7 0,3.86719 -3.13281,7 -7,7 z m 0,0"
            ></path>
          </svg>
          <span> Official Importer </span>
        </span>
      </div>
    </div>
 		</div>`;

  document.querySelector(".product-details").innerHTML = productCard;
});

document.querySelector(".product-details").addEventListener("click", addToCart);
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
