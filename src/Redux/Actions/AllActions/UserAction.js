import UserService from "../../../Services/UserService";
import {STATES} from "./AuthAction";

export const USERSTATE = {
  EDIT_USER: "EDIT_USER",
  EDIT_USER_FAIL: "EDIT_USER_FAIL",
  UPDATE_USER: "UPDATE_USER",
  UPDATE_USER_FAIL: "UPDATE_USER_FAIL",
};



export const updateUser = (editUser) => (dispatch) => {
  return UserService.updateUser(editUser).then(
    (data) => {
      dispatch({
        type: USERSTATE.UPDATE_USER,
        payload: {users: data}
      });
      return data;
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

      return error.response;
    }
  );
}


