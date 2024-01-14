import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (userid, username, email, password,address, profile) => {

  // console.log(username, email, password, address, profile);
  return axios.post(API_URL + "signup", {
    userid,
    username,
    email,
    password,
    address,
    profile// Convert profile object to a JSON string
  });
};

const registerShopOwner = (shopid, shopUsername, shopEmail, shopPassword, shopLocation, shopProfile,dustbinid,qrcode) => {
  return axios.post(API_URL + "shopowner/signup", {
    shopid,
    shopUsername,
    shopEmail,
    shopPassword,
    shopLocation,
    shopProfile,
    dustbinid,
    qrcode
  });
};

const login = (userid, password) => {
  return axios
    .post(API_URL + "signin", {
      userid,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  registerShopOwner,
  login,
  logout,
};
