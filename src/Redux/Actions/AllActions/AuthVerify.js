import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import Cookies from "js-cookie";

const AuthVerify = (props) => {
    let location = useLocation();

    useEffect(() => {
        const user = Cookies.get('user');
        if (user) {
            const token = JSON.parse(user).token;
            const decodedJwt = parseJwt(token);
            if (decodedJwt.exp * 1000 < Date.now()) {
                props.signout();
            }
        }
    }, [location, props]);

    return <div></div>;
};

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};
export default AuthVerify;
