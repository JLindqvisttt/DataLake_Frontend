import UserService from "../../../Services/UserService";
import {STATES} from "./AuthAction";

export const USERSTATE = {
  EDIT_USER: "EDIT_USER",
  EDIT_USER_FAIL: "EDIT_USER_FAIL",
  UPDATE_USER_FIRSTNAME_LASTNAME: "UPDATE_USER_FIRSTNAME_LASTNAME",
  UPDATE_USER_FIRSTNAME_LASTNAME_FAIL: "UPDATE_USER_FIRSTNAME_LASTNAME_FAIL",
  UPDATE_USER_PASSWORD: "UPDATE_USER_PASSWORD",
  UPDATE_USER_PASSWORD_FAIL: "UPDATE_USER_PASSWORD_FAIL",
  SET_MESSAGE: "SET_MESSAGE",
  CLEAR_MESSAGE: "CLEAR_MESSAGE",
};


export const updateUserName = (editUser) => (dispatch) => {
  return UserService.updateUserName(editUser).then(
    (response) => {
      dispatch({
        type: USERSTATE.UPDATE_USER_FIRSTNAME_LASTNAME,
      });

      dispatch({
        type: USERSTATE.SET_MESSAGE,
        payload: response.data.message,
      });
      console.log("Message:" + response.data.message)
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
        type: USERSTATE.UPDATE_USER_FIRSTNAME_LASTNAME_FAIL,
      });

      dispatch({
        type: STATES.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
}

export const updateUserWithNewPassword = (editUser) => (dispatch) => {
  return UserService.updateUserWithNewPassword(editUser).then(
    (response) => {
      dispatch({
        type: USERSTATE.UPDATE_USER_PASSWORD,
      });

      dispatch({
        type: USERSTATE.SET_MESSAGE,
        payload: response.data.message,
      });
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
        type: USERSTATE.UPDATE_USER_PASSWORD_FAIL,
      });

      dispatch({
        type: STATES.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
}


