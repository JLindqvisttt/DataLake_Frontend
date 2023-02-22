import axios from "axios";
import Cookies from 'js-cookie'

const API_URL = "http://localhost:8085/api/admin/"
const token = JSON.parse(Cookies.get("user")).token;
const removeUser = (theRemoveUser) => {
  return axios.post(API_URL + "removeUser", theRemoveUser, {headers: {"Authorization": `Bearer ${token}`}})
};

const addUser = (username,password,firstname,lastname) => {
  const token = JSON.parse(Cookies.get("user")).token;
  return axios.post(API_URL + "signUp", {
    username,
    password,
    firstname,
    lastname
  }, {headers: {"Authorization": `Bearer ${token}`}});

};

const getAllUsers = () => {
  const token = JSON.parse(Cookies.get("user")).token;
  return axios.get(API_URL + "getAllUser", {headers: {"Authorization": `Bearer ${token}`}})
}

const updateUser = (theedituser) => {
  const token = JSON.parse(Cookies.get("user")).token;
  console.log("KOMMA HIT:" + JSON.stringify(theedituser))
  return axios.patch(API_URL + "updateUser", theedituser, {headers: {"Authorization": `Bearer ${token}`}})
};


export default {
  removeUser,
  addUser,
  getAllUsers,
  updateUser
}
