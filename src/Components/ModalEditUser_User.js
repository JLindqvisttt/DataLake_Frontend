import React, {useState, useRef, useEffect} from "react";
import "../Styles/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import {Button, Modal, NavLink} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../Redux/Actions/AllActions/UserAction";
import {MDBIcon} from "mdb-react-ui-kit";
import {MultiSelect} from "react-multi-select-component";
import Cookies from "js-cookie";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {clearMessage} from "../Redux/Actions/AllActions/AdminAction";

const ModalEditUser_User = () => {

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const checkBtn = useRef();
  const user = JSON.parse(Cookies.get("user"));
  const form = useRef();
  const [userFirstname, setUserFirstName] = useState(user.firstname);
  const [userLastname, setUserLastName] = useState(user.lastname);
  const {message} = useSelector(state => state.message);
  const [successful, setSuccessful] = useState(false);
  const onChangeUserFirstname = (e) => {
    const firstname = e.target.value;
    setUserFirstName(firstname);
  };
  const onChangeUserLastname = (e) => {
    const lastname = e.target.value;
    setUserLastName(lastname);
  };
  const validLastname = (value) => {
    if (value.length < 2 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The lastname must be between 2 and 20 characters.
        </div>
      );
    }
  };
  const validFirstname = (value) => {
    if (value.length < 2 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The firstname must be between 2 and 20 characters.
        </div>
      );
    }
  };
  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  const handleShow = () => {
    dispatch(clearMessage());
    setShow(true);
  }
  const handleClose = () => {
    dispatch(clearMessage());
    setSuccessful(false);
    setShow(false);
  }

  const handleSubmit = (e) => {
    setSuccessful(false);
    form.current.validateAll();
    const theEditUser = {
      identity: user.id,
      username: user.email,
      firstname: userFirstname,
      lastname: userLastname,
    }
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(updateUser(theEditUser))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  }

  return (
    <>
      <button className="button fw-bold mb-5" onClick={handleShow}> Edit
        <MDBIcon fas icon="user-edit"/>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">Edit firstname & lastname </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="text-dark" onSubmit={handleSubmit} ref={form}>
            {!successful && (
              <div>
                <div className="form-row">
                  <div className="form-floating mb-3">

                    <Input
                      value={userFirstname}
                      type="text"
                      maxLength={65}
                      className="form-control form-control-lg"
                      placeholder="First name"
                      onChange={onChangeUserFirstname}
                      validations={[required, validFirstname]}
                    />
                  </div>
                  <div className="form-floating mb-3">
                    <Input
                      value={userLastname}
                      type="text"
                      maxLength={65}
                      className="form-control form-control-lg"
                      placeholder="Last name"
                      onChange={onChangeUserLastname}
                      validations={[required, validLastname]}
                    />
                  </div>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={successful ? "alert alert-success" : "alert alert-danger"}
                  role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{display: "none"}} ref={checkBtn}/>
          </Form>
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


export default ModalEditUser_User;
