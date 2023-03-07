import Cookies from 'js-cookie'
import axios from "axios";

const API_URL = "http://localhost:8086/api/user/"

const updateUserName = (theedituser) => {
  const token = JSON.parse(Cookies.get("user")).token;
  return axios.patch(API_URL + "updateUserName", theedituser, {headers: {"Authorization": `Bearer ${token}`}})
};

const updateUserWithNewPassword = (theedituser) => {
  const token = JSON.parse(Cookies.get("user")).token;
  return axios.patch(API_URL + "updateUserPassword", theedituser, {headers: {"Authorization": `Bearer ${token}`}})
};

export default {
  updateUserName,
  updateUserWithNewPassword
}
