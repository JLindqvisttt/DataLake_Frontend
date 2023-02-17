import React, {useState, useRef, useEffect} from "react";
import "../Styles/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import {Button, Modal, NavLink} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {updateUser} from "../Redux/Actions/UserActions/UserAction";
import {MDBIcon} from "mdb-react-ui-kit";


const ModalAddUser = () => {

  const [show, setShow] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const checkBtn = useRef();


  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeRole = (e) => {
    const role = e.target.value;
    setRole(role);
  };

  const options = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'}
  ]
  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  const handleClose = () => {
    setResponseMsg("")
    setShow(false);
  }

  const handleSubmit = (e) => {
    //Kalla på axios funktionen


  }

  function getMessage() {
    if (responseMsg.status === 200)
      return <div className="form-group-sm mt-2">
        <div className="alert alert-success" role="alert">
          {responseMsg.data}
        </div>
      </div>
    return <div className="form-group-sm mt-2" hidden={!responseMsg}>
      <div className="alert alert-danger" role="alert">
        {responseMsg.data}
      </div>
    </div>
  }

  return (
    <>
      <button className="button fw-bold" onClick={handleShow}><MDBIcon fas icon="user-plus" /></button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="textOrange">Add user</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {getMessage()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="btn btn-danger" onClick={event => {
            handleClose()
          }}>
            Close
          </Button>
          <Button variant="primary" className="btn btn-success"
                  onClick={event => handleSubmit()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


export default ModalAddUser;
