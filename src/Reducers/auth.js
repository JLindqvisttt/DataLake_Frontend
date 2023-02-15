import {STATES} from "../Actions/UserActions/Auth";
import Cookies from "js-cookie";

const user = Cookies.get('user');

const initialState = user
    ? {isLoggedIn: true, user}
    : {isLoggedIn: false, user: null};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case STATES.REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        case STATES.REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case STATES.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case STATES.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case STATES.SIGN_OUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}
