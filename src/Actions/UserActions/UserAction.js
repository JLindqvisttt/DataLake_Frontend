import {
  EDIT_USER, EDIT_USER_FAIL, GET_ALL_USER, GET_ALL_USER_FAIL
} from "./UserTypes";

import UserService from "../../Services/UserService";
import {LOGIN_FAIL, SET_MESSAGE} from "./Auth_Types";

export const getAllUsers = () => (dispatch) => {
  return UserService.getAllUsers().then(
    (data) => {
      dispatch({
        type: GET_ALL_USER,
        payload: {user:data}
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
        type: GET_ALL_USER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
}

