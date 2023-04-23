const URL_ADMIN = "http://localhost:3000/admin";

const getUser = async (email, password) => {
  try {
    const url = `${URL_ADMIN}?email=${email}&password=${password}`;
    const { data } = await axios.get(url);
    console.log("este es el administrador", data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const formAdmin = document.querySelector(".form-admin");

const formValidateAdmin = () => {
  const formDataAdmin = {};
  //let vacia
  let empty = "";
  const labelsForm = document.querySelectorAll(".labelForm");
  const inputsForm = document.querySelectorAll(".inputForm");
  const inputs = Array.from(inputsForm);
  const labels = Array.from(labelsForm);
console.log("inputs", inputs)
console.log("inputs formulario", inputsForm)

  inputs.forEach((item) => {
    console.log("item", item)
    if (item.id) {
        console.log("item", item)
      formDataAdmin[item.id] = item.value;
    }
  });
  console.log("estoy en el formulario", formDataAdmin)

  for (const key in formDataAdmin) {
    if (!formDataAdmin[key]) {
      const label = labels.find(
        (item) => item.getAttribute("forData-attribute") === key
      );
      const labelInnerText = label.innerText.substring(
        0,
        label.innerText.length - 1
      );
      empty += `${labelInnerText} `;
    }
  }

  if (empty) {
    return {
      data: {},
      message: `Campos vacíos: ${empty}`,
    };
  } else {
    return {
      data: formDataAdmin,
      message: "",
    };
  }
};

const submitLoginAdmin = async (form) => {
  const adminLogin = formValidateAdmin();
  if (adminLogin.message) {
    Swal.fire("Oops!", adminLogin.message, "error");
  } else {
    const admin = await getUser(
      adminLogin.data.email,
      adminLogin.data.password
    );
    if (admin.length) {
      Swal.fire(
        "Excelente!",
        `${admin[0].name} has iniciado sesión`,
        "success"
      ).then(() => {
        sessionStorage.setItem("user", JSON.stringify(admin[0]));
        window.location = "admin.html";
      });
    } else {
      Swal.fire("Oops!", "datos de usuario incorrectos", "error").then(() => {
        form.reset();
      });
    }
  }
};
//----------------------------Ejecución--------------

formAdmin.addEventListener("submit", async (event) => {
  event.preventDefault();
  await submitLoginAdmin(formAdmin);
});
