import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignIn from "./Components/Pages/SignIn/SignInPage";
import HomePage from "./Components/Pages/HomePage/HomePage";
import Profile from "./Components/Pages/Profile/Profile";
import AdminPage from "./Components/Pages/Admin/AdminPage";
function App() {
  return (
    <Routes>
      <Route exact path="/" element=<SignIn/> />
      <Route exact path="/Homepage" element=<HomePage/> />
      <Route exact path="/Profile" element=<Profile/> />
      <Route exact path="/AdminPage" element=<AdminPage/> />
    </Routes>
  );
}

export default App;
