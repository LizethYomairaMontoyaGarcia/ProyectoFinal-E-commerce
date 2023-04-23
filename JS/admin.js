const URL_PRODUCTS = " http://localhost:3000/product";
const URL_ADMIN = "http://localhost:3000/admin";

const allCategoryProducts = async (url) => {
  const { data } = await axios.get(url);
  console.log("Estos son los productos", data);
  return data;
};

//FORMULARIO
//insertar un nuevo video
const form = document.querySelector(".formulario");
console.log("formulario", form);
const nameProduct = document.querySelector(".nameProduct");
console.log("name", nameProduct);
const url = document.querySelector(".urlImgProduct");
console.log("url", url);
const price = document.querySelector(".price");
console.log("precio", price);
const category = document.querySelector(".category");
console.log("categoria", category);
const enviar = document.querySelector(".enviar");
console.log("enviar", enviar);

const validate = async () => {
  let productsList;
  const products = await allCategoryProducts(URL_PRODUCTS);
  console.log("ENTRE");
  productsList = products;

  console.log("lista", productsList);

  console.log("nombre del producto",nameProduct.value)
  console.log("url del producto",url.value)
  console.log("price del producto",price.value)
  console.log("categoria del producto",category.value)
  
  if (nameProduct.value && url.value && price.value && category.value) {
    //OBJETO
    const identidadDeProduct = {
      id: productsList.length + 1,
      name: nameProduct.value,
      img: url.value,
      price: price.value,
      category: category.value,
    };

    const aggregateProduct = async (url) => {
      try {
        await axios.post(url, identidadDeProduct);
      } catch (error) {
        alert("Ocurrio un error");
      }
    };
    aggregateProduct(URL_PRODUCTS);
  
    console.log("El nuevo producto",identidadDeProduct);

    alert("Todo alo bien");
  } else {
    alert("Hay campos en el fomulario sin diligenciar");
  }
};
enviar.addEventListener("click", validate);


