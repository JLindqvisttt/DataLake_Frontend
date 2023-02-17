import AdminService from "../../../Services/AdminService";
import {STATES} from "./AuthAction";

export const USERSTATE = {
  REMOVE_USER: "REMOVE_USER",
  REMOVE_USER_FAIL: "REMOVE_USER_FAIL",
  ADD_USER: "ADD_USER",
  ADD_USER_FAIL: "ADD_USER_FAIL",
  SET_MESSAGE: "SET_MESSAGE"
};

export const addUser = (userEmail, password,firstname,lastname) => (dispatch) => {
  console.log("**" + userEmail +  password+ firstname+ lastname);
  return AdminService.addUser(userEmail, password, firstname, lastname).then(
    (response) => {
      dispatch({
        type: USERSTATE.ADD_USER,
      });

      dispatch({
        type: USERSTATE.SET_MESSAGE,
        payload: response.data.message,
      });

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
    (data) => {
      dispatch({
        type: USERSTATE.REMOVE_USER,
        payload: {users: data}
      });
      return data;
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

      return error.response;
    }
  );
}


