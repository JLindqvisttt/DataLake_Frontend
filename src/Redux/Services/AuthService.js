import axios from "axios";
import Cookies from 'js-cookie'

const API_URL = "http://localhost:8085/api/auth/"

const signIn = (username, password) => {

    return axios.post(API_URL + "signIn", {
        username,
        password
    })
        .then((response) => {
            if (response.data.token) {
                const user = {
                    token: response.data.token,
                    type: response.data.type,
                    id: response.data.id,
                    email: response.data.email,
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    role: response.data.role,
                    availableDatabases: response.data.availableDatabases
                }
                Cookies.set('user', JSON.stringify(user), {expires: 7});
            }
        })
}
const signOut = () => {
    Cookies.remove('user');
};

export default {
    signIn,
    signOut
}
