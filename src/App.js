import './Styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';

import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import SignIn from "./Pages/SignInPage";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import Users_Admin from "./Pages/Users_Admin";
import Datasets_Admin from "./Pages/Datasets_Admin";
import Info_Admin from "./Pages/Info_Admin"
import {useDispatch} from "react-redux";
import AuthVerify from "./Redux/Actions/AllActions/AuthVerify";
import {useCallback, useEffect} from "react";
import {signOut} from "./Redux/Actions/AllActions/AuthAction";
import EventBus from "./Redux/Actions/AllActions/EventBus";

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
        <Route exact path="/ProfilePage" element=<ProfilePage/> />
        <Route exact path="/Users_Admin" element=<Users_Admin/> />
        <Route exact path="/Datasets_Admin" element=<Datasets_Admin/> />
        <Route exact path="/Info_Admin" element=<Info_Admin/> />
      </Routes>
      <AuthVerify signout={signout}/>
    </div>


  );
}

export default App;
