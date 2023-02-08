import React, {useState, useRef, useEffect} from "react";
import "../style.css"
import Sidebar from "../../Navbar/SidebarMenu";


const HomePage = () => {


  return (
    <div className="container-fluid ps-md-0">

      <Sidebar/>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6 m-5">
            <h1>Home page</h1>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
