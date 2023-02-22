import React, {useState, useRef, useEffect} from "react";
import "../Styles/style.css"
import Sidebar from "../Components/SidebarMenu";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import Cookies from "js-cookie";


const HomePage = () => {
  const userDatabases = JSON.parse(Cookies.get('user')).availableDatabases;


  const [databases, setDatabases] = useState();
  if (!Cookies.get('user')) {
    return <Navigate to="/"/>;
  }



  return (
    <div>
      <Sidebar/>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col m-5">
            <h1 className="text-white mb-5 animatedLine">Home page</h1>
              <div className="col bg-white">
                <h2>Test</h2>
                <h5 className="mt-3">Which database you want to work with</h5>
                <select
                  className="form-select"
                  value={databases}
                  onChange={event => setDatabases(event.target.value)}>
                  <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                  <option value="ROLE_USER">ROLE_USER</option>
                </select>
                <h2>{userDatabases}</h2>
              </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
