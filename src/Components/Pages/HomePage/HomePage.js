import React, {useState, useRef, useEffect} from "react";
import "../style.css"
import {useDispatch, useSelector} from "react-redux";
import Sidebar from "../../Navbar/SidebarMenu";


const HomePage = () => {


  return (
    <div className="container-fluid ps-md-0">

      <Sidebar/>
      <div className="container">
        <div className="row justify-content-md-center">

        </div>
      </div>

    </div>
  );
};

export default HomePage;
