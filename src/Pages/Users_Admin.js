import React, {useState, useRef, useEffect} from "react";
import "../Styles/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "../Components/SidebarMenu";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import {Navigate} from "react-router-dom";
import Cookies from "js-cookie";
import AdminTable from "../Components/AdminTable";
import Footer from "../Components/Footer";


const Users_Admin = () => {


  if (!Cookies.get('user')) {
    return <Navigate to="/"/>;
  }
  if (JSON.parse(Cookies.get('user')).role === "ROLE_USER") {
    return <Navigate to="/Homepage"/>;
  }

  return (
    <div>
      <Sidebar/>
      <div className="container" style={{height:'100vh'}}>
        <div className="row justify-content-md-center">
          <div className="col-lg-7 m-5">
            <h1 className="text-white mb-5 animatedLine">Users page</h1>
            <p className="text-white-50">
              Here you can see all users and their properties. Where you can change the role, change/add new database availability. And have the ability to delete users.
            </p>
            <AdminTable/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Users_Admin;
