let products = [];
const URL_TROLLEY = " http://localhost:3000/trolley";

const allCategoryProducts = async (url) => {
    const { data } = await axios.get(url);
    console.log("Estos son los productos", data);
    return data;
  };

  const mainImgsContainer = document.getElementById("main_imgs");
console.log("Mi contenedor es:", mainImgsContainer);

document.addEventListener("DOMContentLoaded", async () => {
  const infoProducts = await allCategoryProducts(URL_TROLLEY);
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
                  class="resta"
                  data-resta="resta"
                  id="${printProduct.id}"
                >
              
              <img
              src="../imagenes/resta.jpg"
              alt="resta"
              width="17px"
              data-resta="resta"
              id="${printProduct.id}"
            />
                </button>
                <input
                  class="form-control input-number"
                  type="text"
                  name="quantity"
                  value="0"
                  tabindex="0"
                />
                <button
                  type="button"
                  class="suma"
                  data-suma="suma"
                  id="${printProduct.id}"
                >
                <img
                src="../imagenes/suma.png"
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