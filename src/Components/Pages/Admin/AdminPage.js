import React, {useState, useRef, useEffect} from "react";
import "../style.css"
import Sidebar from "../../Navbar/SidebarMenu";


const AdminPage = () => {


  return (
    <div className="container-fluid ps-md-0">

      <Sidebar/>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6 m-5">
            <h1>Admin page</h1>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminPage;