import axios from "axios";
import Cookies from 'js-cookie'

const API_URL = "http://localhost:8085/api/admin/"
const API_PATIENT = "http://localhost:8085/api/patient/"
const removeUser = (theRemoveUser) => {
  const token = JSON.parse(Cookies.get("user")).token;
  return axios.post(API_URL + "removeUser", theRemoveUser, {headers: {"Authorization": `Bearer ${token}`}})
};

const addUser = (username, password, firstname, lastname) => {
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
  return axios.patch(API_URL + "updateUser", theedituser, {headers: {"Authorization": `Bearer ${token}`}})
};

const addDatasets_Patients = (patientFile) => {
  const token = JSON.parse(Cookies.get("user")).token;


  const formData = new FormData();
  formData.append('file', patientFile); // file is a variable containing the file object
  formData.append('name', "261"); // name is a variable containing the string value

  console.log("KOMMER HIT PATIENT")
  console.log(patientFile)
  return axios.post(API_PATIENT + "input", formData)
};

const addDatasets_Symptoms = (symptomsFile) => {

  const formData = new FormData();
  formData.append('file', symptomsFile); // file is a variable containing the file object
  formData.append('name', "261"); // name is a variable containing the string value

  const token = JSON.parse(Cookies.get("user")).token;
  const name = "261";
  console.log("KOMMER HIT sYMPTOMS")
  console.log(symptomsFile)
  return axios.post(API_PATIENT + "input/symptoms", formData)
};

export default {
  removeUser,
  addUser,
  getAllUsers,
  updateUser,
  addDatasets_Symptoms,
  addDatasets_Patients
}
