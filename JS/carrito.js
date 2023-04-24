let productsTrolley = [];
const URL_TROLLEY = " http://localhost:3000/trolley";
const URL_PURCHASEDpRODUCTS = "http://localhost:3000/purchasedProducts";
const URL_PRODUCTS = " http://localhost:3000/product";

const allCategoryProducts = async (url) => {
  const { data } = await axios.get(url);
  console.log("Estos son los productos", data);
  return data;
};

const mainImgsContainer = document.getElementById("main_imgs");
console.log("Mi contenedor es:", mainImgsContainer);

document.addEventListener("DOMContentLoaded", async () => {
  const infoProducts = await allCategoryProducts(URL_TROLLEY);
  productsTrolley = infoProducts;

  printImagsInHtml(mainImgsContainer, productsTrolley);
  sessionStorage.setItem("productsTrolley", JSON.stringify(productsTrolley));
  updateTotal(productsTrolley);
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
                class="form-control input-number itemQuantityClass${printProduct.id}"
                type="text"
                disabled
                name="quantity"
                value="${printProduct.itemQuantity}"
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

//retonar a la pagina principal dando regresar a shopping
const regresarShopping = document.querySelector(".regresarShopping");
regresarShopping.addEventListener("click", () => {
  window.location.href = "../index.html";
});

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
  let productList;
  allCategoryProducts(URL_PRODUCTS).then((response) => {
    productList = response;
    const product = productList.find((item) => item.id == id);
    console.log("el producto que obtuve", product);
    if (trolleyAddition === "suma") {
      console.log("item value", itemQuantity.value);
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

      updateProduct(URL_TROLLEY, productTrolley);
    }
  });
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

function updateTotal(productsTrolley) {
  const labelSubtotal = document.getElementById("numberSubtotal");
  const labelTotal = document.getElementById("numberTotal");

  let subTotal = 0;
  //0
  productsTrolley.forEach((item) => {
    //5000   *      2
    //10000
    // 1000   * 2
    subTotal = subTotal + item.itemQuantity * item.price;
  });

  console.log("el total ", subTotal);
  labelSubtotal.innerHTML = subTotal;
  labelTotal.innerHTML = subTotal * 1.19;
  //guardando el total en el sesionStorage
  sessionStorage.setItem("total", subTotal * 1.19);
}

const buttonForm = document.getElementById("save_formEnviar");
buttonForm.addEventListener("click", saveBuy);

function saveBuy() {
  const namePerson = document.getElementById("namePersonForm");
  console.log("namePerson", namePerson.value);
  const address = document.getElementById("residentialAddress");
  console.log("address", address.value);
  const phone = document.getElementById("numberPhone");
  console.log("phone", phone.value);
  //obtener lista de compra que se guardo en el sesionStorage
  const productsBuy = JSON.parse(sessionStorage.getItem("productsTrolley"));
  console.log("productsBuy", productsBuy);

  if (
    namePerson.value &&
    address.value &&
    phone.value &&
    productsBuy.length > 0
  ) {
    console.log("save buy");
    const buy = {
      productsBuy: productsBuy,
      person: {
        name: namePerson.value,
        address: address.value,
        phone: phone.value,
      },
      //obtener
      total: parseInt(sessionStorage.getItem("total")),
    };
    aggregateProduct(URL_PURCHASEDpRODUCTS, buy);
    restStockProduct(productsBuy);
    console.log("la compra", buy);
  }
}

function restStockProduct(productsBuy) {
  console.log("restPr", productsBuy);
  productsBuy.forEach((item) => {
    console.log("item", item);
    allCategoryProducts(URL_PRODUCTS.concat("/").concat(item.id)).then(
      (response) => {
        response.stock = response.stock - item.itemQuantity;
        deleteProductTrolley(URL_TROLLEY, response);
        updateProduct(URL_PRODUCTS, response);
      }
    );
  });
}



//eliminar producto 
const deleteProductTrolley = async (url, product) => {
  try {
    await axios.delete(url.concat("/").concat(product.id));
  } catch (error) {
    alert("Ocurrio un error");
  }
};

