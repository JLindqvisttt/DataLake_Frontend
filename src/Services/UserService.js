import axios from "axios";
import Cookies from 'js-cookie'
import {useDispatch} from "react-redux";

const API_URL = "http://localhost:8085/api/auth/"

const getAllUsers = () => {

  const token = JSON.parse(Cookies.get("user")).token;
  return axios.get(API_URL + "getAllUser", {headers: {"Authorization": `Bearer ${token}`}})
}

const updateUser = () => {
  Cookies.remove('user');
};

export default {
  getAllUsers
}
