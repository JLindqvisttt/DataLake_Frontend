import AdminService from "../../../Services/AdminService";
import {STATES} from "./AuthAction";
import UserService from "../../../Services/UserService";

export const USERSTATE = {
  REMOVE_USER: "REMOVE_USER",
  REMOVE_USER_FAIL: "REMOVE_USER_FAIL",
  ADD_USER: "ADD_USER",
  ADD_USER_FAIL: "ADD_USER_FAIL",
  SET_MESSAGE: "SET_MESSAGE",
  CLEAR_MESSAGE: "CLEAR_MESSAGE",
  GET_ALL_USER: "GET_ALL_USER",
  GET_ALL_USER_FAIL: "GET_ALL_USER_FAIL",
  GET_ALL_DATASET: "GET_ALL_DATASET",
  GET_ALL_DATASET_FAIL: "GET_ALL_DATASET_FAIL",
  UPDATE_USER: "UPDATE_USER",
  UPDATE_USER_FAIL: "UPDATE_USER_FAIL",
  ADD_DATASET_PATIENT: "ADD_DATASET_PATIENT",
  ADD_DATASET_SYMPTOMS: "ADD_DATASET_SYMPTOMS",
  ADD_DATASET_PATIENT_FAIL: "ADD_DATASET_PATIENT_FAIL",
  ADD_DATASET_SYMPTOMS_FAIL: "ADD_DATASET_SYMPTOMS_FAIL",
};

export const clearMessage = () => ({
  type: USERSTATE.CLEAR_MESSAGE,
});

export const getAllDatasets = () => (dispatch) => {
  return AdminService.getAllDatasets().then(
    (data) => {
      const jsonResp = JSON.stringify(data.data)

      dispatch({
        type: USERSTATE.GET_ALL_DATASET,
        payload: {datasets: jsonResp}
      });
      return jsonResp;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: USERSTATE.GET_ALL_DATASET_FAIL,
      });

      dispatch({
        type: STATES.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
}

export const getAllUsers = () => (dispatch) => {
  return AdminService.getAllUsers().then(
    (data) => {
      const jsonResp = JSON.stringify(data.data)

      dispatch({
        type: USERSTATE.GET_ALL_USER,
        payload: {users: jsonResp}
      });
      return jsonResp;
      console.log(jsonResp)
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: USERSTATE.GET_ALL_USER_FAIL,
      });

      dispatch({
        type: STATES.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
}

export const addUser = (userEmail, password,firstname,lastname) => (dispatch) => {
  return AdminService.addUser(userEmail, password, firstname, lastname).then(
    (response) => {
      dispatch({
        type: USERSTATE.ADD_USER,
      });

      dispatch({
        type: USERSTATE.SET_MESSAGE,
        payload: response.data.message,
      });
      console.log(response.data.message)
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: USERSTATE.ADD_USER_FAIL,
      });

      dispatch({
        type: USERSTATE.SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const removeUser = (removeUser) => (dispatch) => {
  return AdminService.removeUser(removeUser).then(
    (response) => {
      dispatch({
        type: USERSTATE.REMOVE_USER,
      });

      dispatch({
        type: USERSTATE.SET_MESSAGE,
        payload: response.data.message,
      });
      console.log(response.data.message)
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: USERSTATE.REMOVE_USER_FAIL,
      });

      dispatch({
        type: STATES.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
}

export const updateUser = (editUser) => (dispatch) => {
  return AdminService.updateUser(editUser).then(
    (response) => {
      dispatch({
        type: USERSTATE.UPDATE_USER,
      });

      dispatch({
        type: USERSTATE.SET_MESSAGE,
        payload: response.data.message,
      });
      console.log(response.data.message)
      return Promise.resolve();
    },
    (error) => {
      console.log(error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: USERSTATE.UPDATE_USER_FAIL,
      });

      dispatch({
        type: STATES.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
}

/** NEW datasets functions*/
export const addDatasets_Patients = (patientFile,datasetName) => {
  return (dispatch) => {
    return AdminService.addDatasets_Patients(patientFile,datasetName)
      .then((response) => {
        dispatch({
          type: USERSTATE.ADD_DATASET_PATIENT,
        });

        dispatch({
          type: USERSTATE.SET_MESSAGE,
          payload: response.data.message,
        });
        console.log(response.data.message)
        return Promise.resolve();
      }, (error) => {
        console.log(error)
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: USERSTATE.ADD_DATASET_PATIENT_FAIL,
        });

        dispatch({
          type: STATES.SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      });
  };
}

export const addDatasets_Symptoms = (symptomsFile,datasetName) => (dispatch) => {
  return AdminService.addDatasets_Symptoms(symptomsFile,datasetName).then(
    (response) => {
      dispatch({
        type: USERSTATE.ADD_DATASET_SYMPTOMS,
      });

      dispatch({
        type: USERSTATE.SET_MESSAGE,
        payload: response.data.message,
      });
      console.log(response.data.message)
      return Promise.resolve();
    },
    (error) => {
      console.log(error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: USERSTATE.ADD_DATASET_SYMPTOMS_FAIL,
      });

      dispatch({
        type: STATES.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
}
