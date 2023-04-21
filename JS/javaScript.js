//Obtenemos los objetos db.json en una lita
let products = [];

const URL_PRODUCTS = " http://localhost:3000/product";
const URL_FAVORITE = " http://localhost:3000/favorite";

const allCategoryProducts = async (url) => {
  const { data } = await axios.get(url);
  console.log("Estos son los productos", data);
  return data;
};
const mainImgsContainer = document.getElementById("main_imgs");
console.log("Mi contenedor es:", mainImgsContainer);

document.addEventListener("DOMContentLoaded", async () => {
  const infoProducts = await allCategoryProducts(URL_PRODUCTS);
  products = infoProducts;

  printImagsInHtml(mainImgsContainer, products);
});

function printImagsInHtml(container, printProducts) {
  console.log("Estoy dentro de la funcion");

  container.innerHTML = "";
  printProducts.forEach((printProduct) => {
    container.innerHTML += `
    <article class="container__imgs" data-imgs="imgs" name="${printProduct.id}">
      <img
        class="imgs__products"
        data-imgs="imgs"
        name="${printProduct.img}"
        src="${printProduct.img}"
        alt="${printProduct.img}"
      />

      <div class="product-box">
        <div class="productImage">
          <ul class="productOptionFavorite">
            <li>
              <button class="favorite__products">
                <img src="./imagenes/ojo.png" alt="ojo" width="23px" />
              </button>
            </li>
            <li>
              <button class="favorite__products">
                <img src="./imagenes/retorno.png" alt="retorno" width="23px" />
              </button>
            </li>
            <li>
              <button
                class="favorite__products"
                data-attribute="favorite__products"
                id="${printProduct.id}"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
                  alt="corazon"
                  width="22px"
                  data-attribute="favorite__products"
                  id="${printProduct.id}"
                />
              </button>
            </li>
          </ul>
        </div>
        <div class="product-detail">
          <p class="nameProduct"> <strong>${printProduct.name} </strong></p>
          <p class="price_product"><strong>${printProduct.price}</strong></p>

          <div class="product-rating mt-sm-2 mt-1">
            <img
              src="./imagenes/estrellistas.jpg"
              alt="estrellistas"
              width="70px"
            />
            <h6 class="stock">En Stock</h6>
          </div>

          <div class="add-to-cart-box">
            <div class="cart_qty qty-box">
              <div class="input-group">
                <button
                  type="button"
                  class="qty-left-minus"
                  data-type="minus"
                  data-field=""
                  tabindex="0"
                >
                  <i class="fa fa-minus" aria-hidden="true"></i>
                </button>
                <input
                  class="form-control input-number qty-input"
                  type="text"
                  name="quantity"
                  value="0"
                  tabindex="0"
                />
                <button
                  type="button"
                  class="qty-right-plus"
                  data-type="plus"
                  data-field=""
                  tabindex="0"
                >
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
    `;
  });
}

// -----------barra de busqueda--------------
const findProductByName = (searchProduct, listProducts) => {
  const productsFilters = listProducts.filter((product) =>
    product.name.toLowerCase().includes(searchProduct.toLowerCase())
  );
  const result = productsFilters.length ? productsFilters : listProducts;

  const resultBusqueProducts = productsFilters.length
    ? false
    : "No existe este producto";

  return {
    resultSearch: result,
    messageSearch: resultBusqueProducts,
  };
};

const searchForm = document.getElementById("search__products");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(" imprimiendo al hijo ", searchForm.children);

  const formProducts = Array.from(searchForm.children);
  console.log("este es el formularioo", formProducts);

  const inputSearch = formProducts.find((item) => item.localName === "input");
  console.log(inputSearch.value);

  const searchProduct = inputSearch.value;

  if (searchProduct) {
    const response = findProductByName(searchProduct, products);
    console.log(response);

    if (response.messageSearch) {
      Swal.fire("Oops!", response.messageSearch, "error");
    }

    printImagsInHtml(mainImgsContainer, response.resultSearch);
  } else {
    Swal.fire("Oops!", "No ingresaste ningun producto", "error");
  }
});

//-----------------------filtrar por categoria------------------------

document.addEventListener("click", (event) => {
  const valueEvent = event.target.getAttribute("category");

  if (valueEvent != null && valueEvent.includes("category")) {
    const nameCategory = event.target.name;
    const filterProductsCategory = products.filter((item) => {
      return item.category.includes(nameCategory);
    });
    // console.log("productos filtrados", filterProductsCategory)
    printImagsInHtml(mainImgsContainer, filterProductsCategory);
  }
});

//------------------------agregar a favoritos------------------------

document.addEventListener("click", (event) => {
  console.log(event);
  const favorite = event.target.getAttribute("data-attribute");
  if (favorite === "favorite__products") {
    console.log(favorite);
    const id = event.target.getAttribute("id");
    const product = products.find((item) => item.id == id);
    console.log("producto", product);
    const aggregateProduct = async (url) => {
      try {
        await axios.post(url, product);
      } catch (error) {
        alert("Ocurrio un error");
      }
    };
    aggregateProduct(URL_FAVORITE);
  }
});
