import React, {useState, useRef, useEffect} from "react";
import "../style.css"
import Sidebar from "../../Navbar/SidebarMenu";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import Cookies from "js-cookie";


const HomePage = () => {

  if (!Cookies.get('user')) {
    return <Navigate to="/"/>;
  }

  return (
    <div>
      <Sidebar/>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-8 m-5">
            <h1 className="text-white mb-5 animatedLine">Home page</h1>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
