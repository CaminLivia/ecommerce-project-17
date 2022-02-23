const nrProdCartHeader = document.querySelector(".nrProdCart");

window.addEventListener("load", () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  let totalProductsInCart = 0;
  if (cart != null) {
    cart.forEach((productCart) => {
      totalProductsInCart += productCart.noOfProducts;
    });
    nrProdCartHeader.innerHTML = totalProductsInCart;
  }

  if (cart) {
    let total = calculateTotal(cart);
    const productCards = cart
      .map(
        (product) =>
          `<div class="card">
      			<div class="card-body cart-card">
                    <div class="product-cart">
                        <div>
                            <button data-product-id=${product.id} class="delete btn-dark"> x </button>
                        </div>
                        <div>
                            <img src="./products_images/${product.imageURL}" style="width:100px">
                        </div>
                        <div>
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.price} lei</p>
                        </div>  
                    </div>
      
                    <div>
                        <p class="card-text">Qty:
                        <button data-product-id=${product.id} class="decrement btn btn-light"> - </button>
                        <span class="no-of-products">${product.noOfProducts}</span>
                        <button data-product-id=${product.id} class="increment btn btn-light"> + </button>
                        </p>
                    </div>
      			</div>
    		</div>`
      )
      .join("");

    displayTotalSection(total);

    if (cart.length == 0) {
      document.querySelector(
        ".cart-container"
      ).innerHTML = `No products in cart. Return to <a href='./index.html' class="btn-orange">shop</a>.`;
    } else {
      document.querySelector(".cart-container").innerHTML = productCards;
    }
  }
});

const cartContainer = document.querySelector(".cart-container");
cartContainer.addEventListener("click", handleCartActions);

function handleCartActions(event) {
  const targetButton = event.target;
  let cart = JSON.parse(localStorage.getItem("cart"));
  const productInCart = cart.find(
    (productFromCart) =>
      productFromCart.id == targetButton.getAttribute("data-product-id")
  );
  let quantityParagraph = targetButton.parentNode;

  if (targetButton.classList.contains("increment")) {
    productInCart.noOfProducts++;
  } else if (targetButton.classList.contains("decrement")) {
    if (productInCart.noOfProducts > 1) productInCart.noOfProducts--;
  } else if (targetButton.classList.contains("delete")) {
    productInCart.noOfProducts = 0;
    cart = cart.filter((product) => product.id != productInCart.id);
    targetButton.parentNode.parentNode.parentNode.parentNode.remove();
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  if (productInCart.noOfProducts == 0) {
    let total = calculateTotal(cart);

    if (total == 0) {
      document.querySelector(
        ".cart-container"
      ).innerHTML = `No products in cart. Return to <a href='./index.html'>shop</a>.`;
    }

    displayTotalSection(total);
  } else if (productInCart.noOfProducts > 0) {
    quantityParagraph.querySelector(".no-of-products").innerHTML =
      productInCart.noOfProducts;

    let total = calculateTotal(cart);
    displayTotalSection(total);
  }
}

const discountBtn = document.querySelector("#discountBtn");
let discountCode = "sale10";
discountBtn.addEventListener("click", discountApply);

function discountApply() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let discountInput = document.querySelector("#discountCode").value;
  if (discountInput == discountCode) {
    let total = calculateTotal(cart);
    let discountValue = (total * 10) / 100;
    let newTotal = total - discountValue;
    let totalPriceCard = `<div class="card">
      <div class="card-body cart-card" style="display:block">
        <div class="total">
            <div>Total products: </div>
            <div>${total} lei</div>
        </div>
        <div class="total">
            <div>Shipping Tax: </div>
            <div>FREE</div>
        </div>
        <div class="total">
        <div>Discount -10%: </div>
        <div>- ${discountValue} <button class="deleteDiscount btn-dark" id="deleteDiscount">x</button></div>
  
    </div>
        <div class="total">
            <div>TOTAL: </div>
            <div>${newTotal} lei</div>
        </div>
      </div>
    </div>`;

    document.querySelector(".total-price-container").innerHTML = totalPriceCard;
  } else {
    alert("Incorrect code");
  }
  document.querySelector("#discountCode").value = "";

  const deleteDiscountBtn = document.querySelector("#deleteDiscount");
  deleteDiscountBtn.addEventListener("click", deleteDiscount);

  function deleteDiscount() {
    let total = calculateTotal(cart);
    displayTotalSection(total);
  }
}

function calculateTotal(cart) {
  let total = 0;
  let totalProductsInCart = 0;

  cart.forEach((product) => {
    total = total + Number(product.price) * product.noOfProducts;
    totalProductsInCart += product.noOfProducts;
  });

  nrProdCartHeader.innerHTML = totalProductsInCart;

  return total;
}

function displayTotalSection(total) {
  let totalPriceCard = `<div class="card">
  <div class="card-body cart-card" style="display:block">
    <div class="total">
        <div>Total products: </div>
        <div>${total} lei</div>
    </div>
    <div class="total">
        <div>Shipping Tax: </div>
        <div>FREE</div>
    </div>
    <div class="total">
        <div>TOTAL: </div>
        <div>${total} lei</div>
    </div>
  </div>
</div>`;
  document.querySelector(".total-price-container").innerHTML = totalPriceCard;
}
