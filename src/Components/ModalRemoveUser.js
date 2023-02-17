import React, {useState, useRef, useEffect} from "react";
import "../Styles/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import {Button, Modal, NavLink} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {MDBIcon} from "mdb-react-ui-kit";
import {removeUser} from "../Redux/Actions/UserActions/AdminAction";


const ModalRemoveUser = (user) => {

  const [show, setShow] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(user.user.role);
  const [showPassword, setshowPassword] = useState(false);
  const checkBtn = useRef();


  const handleClose = () => {
    setResponseMsg("")
    setShow(false);
  }

  const handleSubmit = (e) => {
    const theRemoveUser = {identity: user.user.identity}
    dispatch(removeUser(theRemoveUser)).then((response) => {
      console.log(response)
      setResponseMsg(response)
    })
      .catch((err) => {
        console.log("ERROR" + err.body)
      })
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
      <button className="btn btn-danger text-white" onClick={handleShow}><MDBIcon fas icon="trash-alt"/></button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="textOrange">Remove {user.user.username}</Modal.Title>
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
                  onClick={event => handleSubmit()}><MDBIcon fas icon="trash-alt"/></Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


export default ModalRemoveUser;
