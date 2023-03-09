import Cookies from 'js-cookie'
import axios from "axios";

const API_URL = "http://localhost:8085/api/user/"
const API_PATIENT = "http://localhost:8085/api/patient/"
const updateUserName = (theedituser) => {
  const token = JSON.parse(Cookies.get("user")).token;
  return axios.patch(API_URL + "updateUserName", theedituser, {headers: {"Authorization": `Bearer ${token}`}})
};

const updateUserWithNewPassword = (theedituser) => {
  const token = JSON.parse(Cookies.get("user")).token;
  return axios.patch(API_URL + "updateUserPassword", theedituser, {headers: {"Authorization": `Bearer ${token}`}})
};

const getPatientsByDataset = (name) => {
  const token = JSON.parse(Cookies.get("user")).token;
  return axios.get(API_PATIENT + `getPatientsByDataset?name=${name}`, {headers: {"Authorization": `Bearer ${token}`}})
};

const getAllPatients = () => {
  const token = JSON.parse(Cookies.get("user")).token;
  return axios.get(API_PATIENT + `getAllPatients`, {headers: {"Authorization": `Bearer ${token}`}})
};

export default {
  updateUserName,
  updateUserWithNewPassword,
  getPatientsByDataset,
  getAllPatients
}
