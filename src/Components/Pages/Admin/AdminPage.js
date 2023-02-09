import React, {useState, useRef, useEffect} from "react";
import "../style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "../../Navbar/SidebarMenu";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

import EditableTable from "./Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";

import { Modal, NavLink } from "react-bootstrap";
import {Button} from "reactstrap";
import ModalEdit from "./ModalEdit";


const AdminPage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="container-fluid ps-md-0">

      <Sidebar/>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6 m-5">
            <h1>Admin page</h1>
            <EditableTable/>

          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminPage;
