import Cookies from 'js-cookie'
import axios from "axios";

const API_URL = "http://localhost:8085/api/user/"

const updateUser = (theedituser) => {
  const token = JSON.parse(Cookies.get("user")).token;
  return axios.patch(API_URL + "updateUser", theedituser, {headers: {"Authorization": `Bearer ${token}`}})
};

const updateUserWithNewPassword = (theedituser) => {
  const token = JSON.parse(Cookies.get("user")).token;
  console.log(JSON.stringify(theedituser))
  return axios.patch(API_URL + "updateUser", theedituser, {headers: {"Authorization": `Bearer ${token}`}})
};

export default {
  updateUser,
  updateUserWithNewPassword
}
