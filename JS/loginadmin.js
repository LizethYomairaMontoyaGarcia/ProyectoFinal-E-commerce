const URL_API = "http://localhost:3000/admin";

const getUser = async (userName, password) => {
  try {
    const url = `${URL_API}?userName=${userName}&password=${password}`;
    const { data } = await axios.get(url);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};