//Obtenemos los objetos db.json en una lita
let products = [];

const URL_PRODUCTS = " http://localhost:3000/product";

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
    <article class="container__imgs" data-imgs="imgs"  name=${printProduct.id}>
    <img class="imgs__products" data-imgs="imgs" name=${printProduct.img} src=${printProduct.img}  alt=${printProduct.img} 
    width="150px" height="150px">

    <div class="product-box">
              <div class="productImage">
                <ul class="productOptionFavorite">
                  <li>
                    <button  >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3722/3722014.png"
                        alt=""
                        width="22px"
                      />
                    </button>
                  </li>
                  <li>
                    <button>
                      <img
                        src="https://e7.pngegg.com/pngimages/102/984/png-clipart-clockwise-rotation-arrow-symbol-logo-arrow-text-logo.png"
                        alt=""
                        width="22px"
                      />
                    </button>
                  </li>
                  <li>
                    <button>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
                        alt=""
                        width="22px"
                      />
                    </button>
                  </li>
                </ul>
              </div>
              <div class="product-detail">
                <a href="product-left-thumbnail.html" tabindex="0">
                  <h6 class="nameProduct"> ${printProduct.name}
                  </h6>
                </a>

                <h5 class="sold text-content">
                ${printProduct.price}
                </h5>

                <div class="product-rating mt-sm-2 mt-1">
                  <ul class="rating">
                    <li>
                      <img src="https://img.freepik.com/vector-premium/icono-vector-estrella-simbolo-estrella-aislado-sobre-fondo-blanco-elemento-icono-plano-revision-calificacion-producto-cliente-aplicaciones-sitios-web-logros-juegos_646072-218.jpg?w=2000" 
                      alt="" width="25px">
                       </li>
                    <li>
                   <img src="https://img.freepik.com/vector-premium/icono-vector-estrella-simbolo-estrella-aislado-sobre-fondo-blanco-elemento-icono-plano-revision-calificacion-producto-cliente-aplicaciones-sitios-web-logros-juegos_646072-218.jpg?w=2000" 
                   alt="" width="25px">
                    </li>
                    <li>
                      <img src="https://png.pngtree.com/png-vector/20190725/ourlarge/pngtree-vector-star-icon-png-image_1577370.jpg" 
                      alt="" width="26px">
                       </li>
                  </ul>

                  <h6 class="theme-color">En Stock</h6>
                </div>

                <div class="add-to-cart-box">
                  <div class="cart_qty qty-box">
                    <div class="input-group">
                      <button
                        class="btn btn-add-cart addcart-button"
                        tabindex="0"
                      >
                        Add
                        <span class="add-icon">
                          <i class="fa-solid fa-plus"></i>
                        </span>
                      </button>
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
   
                                         
    </article>`;
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

/*const getAllPosts = async () => {
  const response = await fetch(url);
  return await response.json();
};

getAllPosts().then((response) => {
  console.log("Mis productos:", response);
  printImagsInHtml(mainImgsContainer, response);
});

const mainImgsContainer = document.getElementById("main_imgs");
console.log("Mi contenedor es:", mainImgsContainer);

function printImagsInHtml(container, printProducts) {
  console.log("Estoy dentro de la funcion");

  container.innerHTML = "";
  printProducts.forEach((printProduct) => {
    container.innerHTML += `
      <article class="container__imgs" data-imgs="imgs"  name=${printProduct.id}>
      <img class="imgs__products" data-imgs="imgs" name=${printProduct.img} src=${printProduct.img}  alt=${printProduct.img} 
      width="150px" height="150px">

      <div class="product-box">
                <div class="productImage">
                  <ul class="productOptionFavorite">
                    <li>
                      <button>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/3722/3722014.png"
                          alt=""
                          width="22px"
                        />
                      </button>
                    </li>
                    <li>
                      <button>
                        <img
                          src="https://e7.pngegg.com/pngimages/102/984/png-clipart-clockwise-rotation-arrow-symbol-logo-arrow-text-logo.png"
                          alt=""
                          width="22px"
                        />
                      </button>
                    </li>
                    <li>
                      <button>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
                          alt=""
                          width="22px"
                        />
                      </button>
                    </li>
                  </ul>
                </div>
                <div class="product-detail">
                  <a href="product-left-thumbnail.html" tabindex="0">
                    <h6 class="nameProduct"> ${printProduct.name}
                    </h6>
                  </a>

                  <h5 class="sold text-content">
                  ${printProduct.price}
                  </h5>

                  <div class="product-rating mt-sm-2 mt-1">
                    <ul class="rating">
                      <li>
                        <img src="https://img.freepik.com/vector-premium/icono-vector-estrella-simbolo-estrella-aislado-sobre-fondo-blanco-elemento-icono-plano-revision-calificacion-producto-cliente-aplicaciones-sitios-web-logros-juegos_646072-218.jpg?w=2000" 
                        alt="" width="25px">
                         </li>
                      <li>
                     <img src="https://img.freepik.com/vector-premium/icono-vector-estrella-simbolo-estrella-aislado-sobre-fondo-blanco-elemento-icono-plano-revision-calificacion-producto-cliente-aplicaciones-sitios-web-logros-juegos_646072-218.jpg?w=2000" 
                     alt="" width="25px">
                      </li>
                      <li>
                        <img src="https://png.pngtree.com/png-vector/20190725/ourlarge/pngtree-vector-star-icon-png-image_1577370.jpg" 
                        alt="" width="26px">
                         </li>
                    </ul>

                    <h6 class="theme-color">En Stock</h6>
                  </div>

                  <div class="add-to-cart-box">
                    <div class="cart_qty qty-box">
                      <div class="input-group">
                        <button
                          class="btn btn-add-cart addcart-button"
                          tabindex="0"
                        >
                          Add
                          <span class="add-icon">
                            <i class="fa-solid fa-plus"></i>
                          </span>
                        </button>
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
     
                                           
      </article>`;
  });
}*/

/*busqueda de videos por nombres
const filterNameCateryProducts = (termSearch, listProducts) => {
  const filterProducts = listProducts.filter((video) =>
    video.name.toLowerCase().includes(termSearch.toLowerCase())
  );
  const result = filterProducts.length ? filterProducts : listProducts;

  const resultBusque = filterProducts.length ? false : "No existe este producto";

  return {
    resultSearch: result,
    messageSearch: resultBusque,
  };
};

const searchForm = document.getElementById("search__products");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  console.log(searchForm.products);

  const  formProducts = Array.from(searchForm.products);

  const inputSearch = formProducts.find((item) => item.localName === "input");

  console.log(inputSearch.value);

  const searchProducts = inputSearch.value;

  if (searchTermVideoTube) {
    const searchResult = filterNameCateryProducts(searchProducts, mainImgsContainer)
     
    console.log(searchResult);

    printImagsInHtml(mainImgsContainer, searchResult.resultSearch);

    if (searchResult.messageSearch) {
      Swal.fire("Oops!", searchResult.messageSearch, "error");
    }
  } else {
    Swal.fire("Oops!", "No ingresaste ningun producto", "error");
  }
});*/
