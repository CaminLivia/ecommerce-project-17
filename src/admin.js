const productTableBody = document.querySelector(".admin-products-table");
const addNewProductBtn = document.querySelector(".add-new-product");
const updateProductBtn = document.querySelector(".update-product");

const productsURL = `https://61f17300072f86001749f1f8.mockapi.io/products`;
// const productsURL = "./src/products.json";

window.addEventListener("load", getAllProducts);

async function getAllProducts() {
  const result = await fetch(productsURL);
  const products = await result.json();

  const tableRows = products
    .map(
      (product) =>
        `<tr>       
           <th scope="row"><a href="details.html?product-id=${product.id}">${product.id}</a></th>
           <td><a href="details.html?product-id=${product.id}"><img src="./products_images/${product.imageURL}" style="width:64px"></a></td>
           <td><a href="details.html?product-id=${product.id}">${product.name}</a></td>
           <td><a href="details.html?product-id=${product.id}">${product.description}</a></td>
           <td><a href="details.html?product-id=${product.id}">${product.brand}</a></td>
           <td><a href="details.html?product-id=${product.id}">${product.gender}</a></td>           
           <td><a href="details.html?product-id=${product.id}">${product.price} lei</a></td>      
           <td><button class="btn btn-dark delete" data-product-id=${product.id}>
           <div class="btn-align-center"><i class="ph-trash"></i></div>
           </button></td>
           <td><button class="btn btn-primary btn-orange edit" data-product-id=${product.id}>
           <div class="btn-align-center"><i class="ph-pencil-simple-line"></i></div>
           </button></td>
        </tr>`
    )
    .join("");

  productTableBody.innerHTML = tableRows;
}

productTableBody.addEventListener("click", handleProducts);

async function handleProducts(event) {
  const productId = event.target.getAttribute("data-product-id");
  if (event.target.classList.contains("delete")) {
    let response = await fetch(`${productsURL}/${productId}`, {
      method: "DELETE",
    });
    console.log(response);
    getAllProducts();
  } else if (event.target.classList.contains("edit")) {
    console.log("edit", productId);
    editProductById(productId);
  }
}

addNewProductBtn.addEventListener("click", addNewProduct);

async function addNewProduct(event) {
  event.preventDefault();

  const newProductImageURL = document.getElementById("newImageURL").value;
  const newProductName = document.getElementById("newName").value;
  const newProductDescription = document.getElementById("newDescription").value;
  const newProductBrand = document.getElementById("newBrand").value;
  const newProductGender = document.getElementById("newGender").value;
  const newProductPrice = document.getElementById("newPrice").value;

  let response = await fetch(productsURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imageURL: newProductImageURL,
      name: newProductName,
      description: newProductDescription,
      brand: newProductBrand,
      gender: newProductGender,
      price: newProductPrice,
    }),
  });

  let product = await response.json();
  console.log("newProduct", product);

  let newProductTableRow = `<tr>
         <th scope="row">${product.id}</th>
         <td><img src="./products_images/${product.imageURL}" style="width:64px"></td>
         <td>${product.name}</td>
         <td>${product.description}</td>
         <td>${product.brand}</td>
         <td>${product.gender}</td>
         <td>${product.price} lei</td>
         <td><button class="btn btn-dark" data-product-id=${product.id}>
         <div class="btn-align-center"><i class="ph-trash"></i></div>
         </button></td>
         <td><button class="btn btn-primary btn-orange edit" data-product-id=${product.id}>
         <div class="btn-align-center"><i class="ph-pencil-simple-line"></i></div>
         </button></td>
      </tr>`;

  productTableBody.innerHTML += newProductTableRow;
}

updateProductBtn.addEventListener("click", updateProduct);

async function updateProduct(event) {
  event.preventDefault();

  const productImageURL = document.getElementById("imageURL").value;
  const productName = document.getElementById("name").value;
  const productDescription = document.getElementById("description").value;
  const productBrand = document.getElementById("brand").value;
  const productGender = document.getElementById("gender").value;
  const productPrice = document.getElementById("price").value;
  // value from hidden input
  const productId = document.getElementById("productId").value;

  let response = await fetch(`${productsURL}/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: productId,
      productImageURL: productImageURL,
      name: productName,
      description: productDescription,
      brand: productBrand,
      gender: productGender,
      price: productPrice,
    }),
  });

  let data = await response.json();
  console.log(data);
  getAllProducts();
}

async function editProductById(productId) {
  const productImageURLElement = document.getElementById("imageURL");
  const productNameElement = document.getElementById("name");
  const productDescriptionElement = document.getElementById("description");
  const productBrandElement = document.getElementById("brand");
  const productGenderElement = document.getElementById("gender");
  const productPriceElement = document.getElementById("price");
  const productIdHiddenElement = document.getElementById("productId");

  let response = await fetch(`${productsURL}/${productId}`);
  let product = await response.json();

  productImageURLElement.value = product.imageURL;
  productNameElement.value = product.name;
  productDescriptionElement.value = product.description;
  productBrandElement.value = product.brand;
  productGenderElement.value = product.gender;
  productPriceElement.value = product.price;

  productIdHiddenElement.value = product.id;
}
