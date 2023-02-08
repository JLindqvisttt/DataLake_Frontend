import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./Auth_Types";

import AuthService from "../Services/AuthService"

export const signIn = (username, password) => (dispatch) => {
  console.log("KASPER1");
  return AuthService.signIn(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {user: data},
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
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    });
}


export const signOut = () => (dispatch) => {
  AuthService.signOut();
  dispatch({
    type: LOGOUT
  })
}
