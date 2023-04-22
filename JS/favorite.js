const URL_FAVORITE = " http://localhost:3000/favorite";

const allCategoryProducts = async (url) => {
  const { data } = await axios.get(url);
  console.log("Estos son los productos", data);
  return data;
};

const mainImgsContainer = document.getElementById("main_imgs");
console.log("Mi contenedor es:", mainImgsContainer);

document.addEventListener("DOMContentLoaded", async () => {
  const infoProducts = await allCategoryProducts(URL_FAVORITE);
  products = infoProducts;

  printImagsInHtml(mainImgsContainer, products);
});

function printImagsInHtml(container, printProducts) {
  console.log("Estoy dentro de la funcion");

  container.innerHTML = "";
  printProducts.forEach((printProduct) => {
    container.innerHTML += `
      <article class="container__imgs" data-imgs="imgs" name="${printProduct.id}">
       <button
          class="eliminate__products"
          data-attribute="eliminate__products"
          id="${printProduct.id}"
          >
          <img
          src="../imagenes/eliminar.png"
          alt="corazon"
          width="22px"
          data-attribute="eliminate__products"
          id="${printProduct.id}"
          />
        </button>
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

/*-----------------------eliminar productos-------------------*/
document.addEventListener("click", (e) => {
  console.log(e);

  const eliminateFavorite = e.target.getAttribute("data-attribute");
  if (eliminateFavorite === "eliminate__products") {
    console.log(eliminateFavorite);

    const id = e.target.getAttribute("id");
    const product = products.find((item) => item.id == id);
   console.log("producto", product);

    const eliminateProduct = async (url) => {
      try {
        console.log("el id",id)
        await axios.delete(url.concat(id));
      } catch (error) {
        console.log("erorr ",error)
        alert("Ocurrio un error");
      }
    };
    eliminateProduct(URL_FAVORITE.concat("/"));
  }
});

//-----------------recargar a la pagina principal dandole click a la imegen----------
const logoFastkar = document.querySelector(".logoFastkart");
logoFastkar.addEventListener("click", () => {
  window.location.href = "../index.html";
});