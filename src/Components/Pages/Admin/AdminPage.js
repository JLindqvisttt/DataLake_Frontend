import React, {useState, useRef, useEffect} from "react";
import "../style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "../../Navbar/SidebarMenu";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import EditableTable from "./Table";
import {Navigate} from "react-router-dom";
import Cookies from "js-cookie";


const AdminPage = () => {


  if (!Cookies.get('user')) {
    return <Navigate to="/"/>;
  }
  if (JSON.parse(Cookies.get('user')).role == "ROLE_USER") {
    return <Navigate to="/Homepage"/>;
  }

  return (
    <div className="container-fluid ps-md-0">

      <Sidebar/>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6 m-5">
            <h1>Admin page </h1>
            <EditableTable/>

          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminPage;
