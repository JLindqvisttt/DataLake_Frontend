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
import AddDatasetsSection from "../Components/AddDatasetsSection";


const Datasets_Admin = () => {


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
            <h1 className="text-white mb-5 animatedLine">Datasets page</h1>
            <p className="text-white-50">
              Do you want to add a new datasets, in order to do that you need to have a file that has
              symptoms and one with patient data that is related to the data.
            </p>
            <AddDatasetsSection/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Datasets_Admin;
