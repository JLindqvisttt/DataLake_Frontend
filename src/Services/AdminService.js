import axios from "axios";
import Cookies from 'js-cookie'

const API_URL = "http://localhost:8085/api/auth/"

const removeUser = (theRemoveUser) => {
  const token = JSON.parse(Cookies.get("user")).token;
  console.log("KOMMA HIT:" + JSON.stringify(theRemoveUser))
  console.log("token" + token)
  return axios.post(API_URL + "removeUser", theRemoveUser, {headers: {"Authorization": `Bearer ${token}`}})
};

const addUser = (theRemoveUser) => {
  const token = JSON.parse(Cookies.get("user")).token;

  return ;
};
export default {
  removeUser,
  addUser
}
