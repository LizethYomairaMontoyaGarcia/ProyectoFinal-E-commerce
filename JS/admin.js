let products = [];

const URL_PRODUCTS = "http://localhost:3000/product";
const URL_ADMIN = "http://localhost:3000/admin";

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
    <a class="editProduct" href="#openModal">
    <button
    class="edit__products"
    data-atribute="edit__products"
    id="${printProduct.id}"
    >
    <img
    src="../imagenes/lapizEditar.png"
    alt="editar"
    width="22px"
    data-attribute="edit__products"
    id="${printProduct.id}"
    />
  </button>
  </a>
  <button
  class="eliminate__products"
  data-attribute="eliminate__products"
  id="${printProduct.id}"
  >
  <img
  src="../imagenes/eliminar.png"
  alt="eliminar"
  width="22px"
  data-attribute="eliminate__products"
  id="${printProduct.id}"
  />
</button>
            </a>
    
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
                <img src="../imagenes/ojo.png" alt="ojo" width="23px" />
              </button>
            </li>
            <li>
              <button class="favorite__products">
                <img src="../imagenes/retorno.png" alt="retorno" width="23px" />
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
              src="../imagenes/estrellistas.jpg"
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

//FORMULARIO
const form = document.querySelector(".formulario");
console.log("formulario", form);
const nameProduct = document.querySelector(".nameProduct");
console.log("name", nameProduct);
const url = document.querySelector(".urlImgProduct");
console.log("url", url);
const price = document.querySelector(".price");
console.log("precio", price);
const stock = document.querySelector(".stock");
console.log("cantidad del producto", stock);
const category = document.querySelector(".category");
console.log("categoria", category);
const enviar = document.querySelector(".enviar");
console.log("enviar", enviar);

/*-----------------------eliminar y edita productos -------------------*/
/*-----------------------eliminar -------------------*/
document.addEventListener("click", async (e) => {
  console.log("Evento click en el documento", e);

  const valueAtribute = e.target.getAttribute("data-attribute");
  if (valueAtribute === "eliminate__products") {
    console.log(valueAtribute);

    const id = e.target.getAttribute("id");
    const product = products.find((item) => item.id == id);
    console.log("producto", product);

    const eliminateProduct = async (url) => {
      try {
        console.log("el id", id);
        await axios.delete(url.concat(id));
      } catch (error) {
        console.log("erorr ", error);
        alert("Ocurrio un error");
      }
    };
    eliminateProduct(URL_PRODUCTS.concat("/"));

    /*-----------------------edita productos -------------------*/
  } else if (valueAtribute === "edit__products") {
    console.log("le dio en el boton");
    const idProduct = e.target.id;
    console.log("id del producto", idProduct);
    const productToUpdate = await allCategoryProducts(
      URL_PRODUCTS.concat("/").concat(idProduct)
    );
    nameProduct.value = productToUpdate.name;
    url.value = productToUpdate.img;
    price.value = productToUpdate.price;
    stock.value = productToUpdate.stock;
    category.value = productToUpdate.category;

    /*marcar boton para actualizar producto*/
    enviar.setAttribute("data-attribute", "update");
    enviar.setAttribute("product-id", productToUpdate.id);
    enviar.innerHTML = "Actualizar";
    console.log("poducto", productToUpdate);
  } else if (e.target.id === "closeModal") {
    form.reset();
    enviar.removeAttribute("data-attribute");
    enviar.removeAttribute("product-id");
    enviar.innerHTML = "Insertar";
  }
});

//-----------------recargar a la pagina principal dandole click a la imegen----------
const logoFastkar = document.querySelector(".logoFastkart");
logoFastkar.addEventListener("click", () => {
  window.location.href = "../index.html";
});

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

/*formulario para el administrador*/
const validate = async () => {
  let productsList;
  const products = await allCategoryProducts(URL_PRODUCTS);

  const buttonAttribute = enviar.getAttribute("data-attribute");

  console.log("ENTRE", buttonAttribute);
  productsList = products;

  console.log("lista", productsList);

  console.log("nombre del producto", nameProduct.value);
  console.log("url del producto", url.value);
  console.log("price del producto", price.value);
  console.log("categoria del producto", category.value);

  if (
    nameProduct.value &&
    url.value &&
    price.value &&
    stock.value &&
    category.value
  ) {
    if (buttonAttribute === "update") {
      /* obtiene el atributo de update*/
      const idProduct = enviar.getAttribute("product-id");
      const identidadDeProduct = {
        id: idProduct,
        name: nameProduct.value,
        img: url.value,
        price: parseInt(price.value),
        stock: parseInt(stock.value),
        category: category.value,
      };
      console.log("Update producto", identidadDeProduct);
      const updateProduct = async (url) => {
        try {
          await axios.put(url, identidadDeProduct);
          form.reset();
        } catch (error) {
          alert("Ocurrio un error");
        }
      };
      updateProduct(URL_PRODUCTS.concat("/").concat(idProduct));
      console.log("Producto actualizado", identidadDeProduct);
      alert("Producto actualizado");

      /*boton de insertar*/
    } else if (buttonAttribute === null) {
      const identidadDeProduct = {
      
        name: nameProduct.value,
        img: url.value,
        price: parseInt(price.value),
        stock: parseInt(stock.value),
        category: category.value,
      };
      console.log("en el insert");
      const aggregateProduct = async (url) => {
        try {
          await axios.post(url, identidadDeProduct);
          alert("Producto insertado");
        } catch (error) {
          alert("Ocurrio un error");
        }
      };
      aggregateProduct(URL_PRODUCTS);
      console.log("El nuevo producto", identidadDeProduct);
    } else {
      alert("Hay campos en el fomulario sin diligenciar");
    }
  }
};
enviar.addEventListener("click", validate);
