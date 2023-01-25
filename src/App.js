import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignIn from "./Components/Pages/SignIn/SignInPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element=<SignIn/> />

      </Routes>
    </Router>
  );
}

export default App;
