import {STATES} from "../Actions/AllActions/AuthAction";

const initialState = {};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case STATES.SET_MESSAGE:
            return {message: payload};

        case STATES.CLEAR_MESSAGE:
            return {message: ""};

        default:
            return state;
    }
}
