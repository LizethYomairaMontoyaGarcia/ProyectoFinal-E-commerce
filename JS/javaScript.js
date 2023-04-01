//Obtenemos los objetos db.json en una lita
const url = " http://localhost:3000/product";

const getAllPosts = async () => {
  const response = await fetch(url);
  return await response.json();
}

getAllPosts().then(response => {
  console.log("Mis productos:", response);
  printImagsInHtml(mainImgsContainer, response);
});


/*const getPostsById = async (id) => {
  const response = await fetch(urlBase.concat("/").concat(id));
  return await response.json();
}*/

const mainImgsContainer = document.getElementById("main_imgs");
console.log("Mi contenedor es:", mainImgsContainer);

function printImagsInHtml(container, printImgs) {
  console.log("Estoy dentro de la funcion");

  container.innerHTML = "";
  printImgs.forEach((printImg) => {
    container.innerHTML += `
      <article class="container__imgs" data-imgs="imgs"  name=${printImg.id}>
      <img class="imgs__products" data-imgs="imgs" name=${printImg.img} src=${printImg.img}  alt=${printImg.img}>
      
      </article>`;
  });
}
