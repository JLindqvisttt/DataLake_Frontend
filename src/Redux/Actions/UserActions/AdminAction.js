import AdminService from "../../../Services/AdminService";
import {STATES} from "./AuthAction";

export const USERSTATE = {
  REMOVE_USER: "REMOVE_USER",
  REMOVE_USER_FAIL: "REMOVE_USER_FAIL",
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


