import React, {useState} from "react";
import "../Styles/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import {Button, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {MDBIcon} from "mdb-react-ui-kit";
import {clearMessage, removeUser} from "../Redux/Actions/AllActions/AdminAction";


const ModalRemoveUser_Admin = (user) => {

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [successful, setSuccessful] = useState(false);
  const {message} = useSelector(state => state.message);

  const handleClose = () => {
    dispatch(clearMessage());
    setShow(false);
  }
  const handleShow = () => {
    dispatch(clearMessage());
    setShow(true);
  }
  const handleSubmit = () => {
    const theRemoveUser = {id: user.user.id}
    dispatch(removeUser(theRemoveUser)).then(() => {
      setSuccessful(true);
    })
      .catch(() => {
        setSuccessful(false);
      })
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
          {message && (
            <div className="form-group">
              <div
                className={successful ? "alert alert-success" : "alert alert-danger"}
                role="alert">
                {message}
              </div>
            </div>
          )}
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


export default ModalRemoveUser_Admin;
