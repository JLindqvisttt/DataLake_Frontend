import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import SignIn from "./Components/Pages/SignIn/SignInPage";
import HomePage from "./Components/Pages/HomePage/HomePage";
import Profile from "./Components/Pages/Profile/Profile";
import AdminPage from "./Components/Pages/Admin/AdminPage";
import {useDispatch} from "react-redux";
import AuthVerify from "./Redux/Actions/UserActions/AuthVerify";
import {useCallback, useEffect} from "react";
import {signOut} from "./Redux/Actions/UserActions/AuthAction";
import EventBus from "./Redux/Actions/UserActions/EventBus";

const App = () => {

    const dispatch = useDispatch();
    let location = useLocation();
    useEffect(() => {
        if (["/"].includes(location.pathname)) {

        }
    }, [location]);


    const signout = useCallback(() => {
        dispatch(signOut());
    }, [dispatch]);

    useEffect(() => {
        EventBus.on("signOut", () => {
            signout();
        });

        return () => {
            EventBus.remove("signOut");
        };
    }, [signout]);

    return (
        <div>
            <Routes>
                <Route exact path="/" element=<SignIn/> />
                <Route exact path="/Homepage" element=<HomePage/> />
                <Route exact path="/Profile" element=<Profile/> />
                <Route exact path="/AdminPage" element=<AdminPage/> />
            </Routes>
            <AuthVerify signout={signout}/>
        </div>


    );
}

export default App;
