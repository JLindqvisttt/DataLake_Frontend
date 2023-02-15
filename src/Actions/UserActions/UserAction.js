import {
  USERSTATE
} from "./UserTypes";

import UserService from "../../Services/UserService";
import {STATES} from "./Auth_Types";

export const getAllUsers = () => (dispatch) => {
  return UserService.getAllUsers().then(
    (data) => {
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

