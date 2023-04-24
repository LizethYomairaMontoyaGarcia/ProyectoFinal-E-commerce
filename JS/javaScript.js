//Obtenemos los objetos db.json en una lita
let products = [];

const URL_PRODUCTS = " http://localhost:3000/product";
const URL_FAVORITE = " http://localhost:3000/favorite";
const URL_TROLLEY = " http://localhost:3000/trolley";

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

//llene el valor del carrito en el label, porque se recarga la pagina. 
async function getIemQuantity(productId) {
  try {
    await allCategoryProducts(URL_TROLLEY.concat("/").concat(productId)).then(
      (value) => {
        const itemQuantity = document.querySelector(
          ".itemQuantityClass".concat(productId)
        );
      
        itemQuantity.value = value.itemQuantity;
      }
    );
  } catch {}
}

function printImagsInHtml(container, printProducts) {
  console.log("Estoy dentro de la funcion");

  container.innerHTML = "";
  printProducts.forEach((printProduct) => {

    getIemQuantity(printProduct.id);

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
                  class="resta"
                  data-resta="resta"
                  id="${printProduct.id}"
                >
              
              <img
              src="./imagenes/resta.jpg"
              alt="resta"
              width="17px"
              data-resta="resta"
              id="${printProduct.id}"
            />
                </button>
                <input
                  class="form-control input-number itemQuantityClass${printProduct.id}"
                  type="text"
                  disabled
                  name="quantity"
                  value="0"
                  tabindex="0"
                  id="${printProduct.id}"
                  data-atribute="itemQuantity${printProduct.id}"
                />
                <button
                  type="button"
                  class="suma"
                  data-suma="suma"
                  id="${printProduct.id}"
                >
                <img
                src="./imagenes/suma.png"
                alt="suma"
                width="20px"
                data-suma="suma"
                id="${printProduct.id}"
              />
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

//------------------------reloj------------------------
function updateTime() {
  var date = new Date();
  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hour = date.getHours();

  var elementoHour = document.getElementById("horas");
  var elementoMinutes = document.getElementById("minutos");
  var elementoSeconds = document.getElementById("segundos");

  elementoHour.textContent = hour;
  elementoMinutes.textContent = minutes;
  elementoSeconds.textContent = seconds;

  if (hour >= 8 && minutes >= 1 && hour < 12) {
  }
  if (hour >= 12 && minutes >= 1 && hour < 19) {
  }
  if (hour >= 19 && minutes >= 1) {
  }
}
setInterval(updateTime, 1000);

//------------------------Agregar al carro------------------------

document.addEventListener("click", (e) => {
  console.log("El evento click en el documento", e);
  const itemQuantity = document.querySelector(
    ".itemQuantityClass".concat(e.target.id)
  );
  console.log("Item", itemQuantity);

  const trolleyAddition = e.target.getAttribute("data-suma");
  const trolleyDelete = e.target.getAttribute("data-resta");

  //buscar el produto que está agregando
  const id = e.target.getAttribute("id");
  const product = products.find((item) => item.id == id);

  if (trolleyAddition === "suma") {
  console.log("item value",itemQuantity.value);
    if (itemQuantity.value < product.stock) {
      itemQuantity.value = parseInt(itemQuantity.value) + 1;
    }

    const productTrolley = {
      id: product.id,
      name: product.name,
      img: product.img,
      price: parseInt(product.price),
      itemQuantity: parseInt(itemQuantity.value),
      category: product.category,
    };

    console.log("producto nuevo stock", product.stock);

    if (productTrolley.itemQuantity == 1) {
      aggregateProduct(URL_TROLLEY, productTrolley);
    } else {
      updateProduct(URL_TROLLEY, productTrolley);
    }
    /*para restar producto del carro*/
  } else if (trolleyDelete === "resta") {
    if (itemQuantity.value > 0) {
      itemQuantity.value = parseInt(itemQuantity.value) - 1;
    }
    
    const productTrolley = {
      id: product.id,
      name: product.name,
      img: product.img,
      price: parseInt(product.price),
      itemQuantity: parseInt(itemQuantity.value),
      category: product.category,
    };

    updateProduct(URL_TROLLEY,productTrolley);
  }
});


//agregar producto,  segun la url

const aggregateProduct = async (url, product) => {
  try {
    await axios.post(url, product);
  } catch (error) {
    alert("Ocurrio un error");
  }
};

//actualizar producto segun url

const updateProduct = async (url, product) => {
  try {
    await axios.put(url.concat("/").concat(product.id), product);
  } catch (error) {
    alert("Ocurrio un error");
  }
};

//eliminar producto 
const deleteProductTrolley = async (url, product) => {
  try {
    await axios.delete(url.concat("/").concat(product.id));
  } catch (error) {
    alert("Ocurrio un error");
  }
};


function redirectTo(url){
  window.location.href =url;
}


