import UserService from "../../Services/UserService";
import {STATES} from "./AuthAction";

export const USERSTATE = {
  EDIT_USER: "EDIT_USER",
  EDIT_USER_FAIL: "EDIT_USER_FAIL",
  GET_ALL_USER: "GET_ALL_USER",
  GET_ALL_USER_FAIL: "GET_ALL_USER_FAIL",
};

export const getAllUsers = () => (dispatch) => {
  return UserService.getAllUsers().then(
    (data) => {
      console.log(data)
      dispatch({
        type: USERSTATE.GET_ALL_USER,
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

