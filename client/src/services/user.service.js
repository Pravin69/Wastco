import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";
const token = authHeader()['x-access-token'];

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const submitFormData = (formData) => {
  return axios.post(API_URL + "reward-form-data", formData, { headers: authHeader() });
};

const getRewardData = (userId) => {
  const url = userId ? `${API_URL}reward-data/${userId.toString()}` : `${API_URL}reward-data`;
  return axios.get(url, { headers: authHeader() });
};

const getDustbinHistory = (shopId) => {
  const url = shopId ? `${API_URL}shopowner/dustbin-history/${shopId.toString()}` : `${API_URL}shopowner/dustbin-history`;
  return axios.get(url, { headers: authHeader() });
};


const getShopOwners = () => {
  return axios.get(API_URL + "shop-owners", { headers: authHeader() });
};


const getUserData = () => {
  return axios.get(API_URL + "user-data", { headers: authHeader() });
};

const getAllUsers = () => {
  return axios.get(API_URL + "users", { headers: authHeader() });
};

const increaseActiveUserCount = () => {
  return axios.get(API_URL + "increase-active-user-count", { headers: authHeader() });
};

const increaseActiveShopCount = () => {
  return axios.get(API_URL + "increase-active-shop-count", { headers: authHeader() });
};

const submitBottleData = (formData) => {
  return axios.post(API_URL + "submit-bottle-data", formData, { headers: authHeader() });
};
const getAllBottles = () => {
  return axios.get(API_URL + "bottles", { headers: authHeader() });
};

const getAllShopOwners = () => {
  return axios.get(API_URL + "shop-data", { headers: authHeader() });
};


const updateCoinsCount = () => {
  return axios.post(API_URL + "update-coin" , null  ,{ headers: { 'x-access-token': token } })
}

const updateShopCoinsCount = () => {
  return axios.post(API_URL + "update-shop-coins", null, { headers: authHeader()});
};

const getShopOwnerData = () => {
  return axios.get(API_URL + "shop-owner-data", { headers: authHeader() });
};

const getMostUsedDustbin = (userId) => {
  const url = `${API_URL}most-used-dustbin/${userId.toString()}`;
  return axios.get(url, { headers: authHeader() });
};

const getTopShopOwnersTopUsers = () => {
  return axios.get(API_URL + "most-used-dustbin-user", { headers: authHeader() });
};


export default {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
  submitFormData,
  getRewardData,
  getUserData,
  getAllUsers,
  getShopOwners,
  getDustbinHistory,
  increaseActiveUserCount,
  increaseActiveShopCount,
  submitBottleData,
  getAllBottles,
  getAllShopOwners,
  updateCoinsCount,
  updateShopCoinsCount,
  getShopOwnerData,
  getMostUsedDustbin,
  getTopShopOwnersTopUsers,
};
