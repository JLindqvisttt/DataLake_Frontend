import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignIn from "./Components/Pages/SignIn/SignInPage";
import HomePage from "./Components/Pages/HomePage/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element=<SignIn/> />
        <Route exact path="/Homepage" element=<HomePage/> />
      </Routes>
    </Router>
  );
}

export default App;
