import React, {useState, useRef} from "react";
import "../Styles/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import {Button, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {updateUserWithNewPassword} from "../Redux/Actions/AllActions/UserAction";
import {MDBIcon} from "mdb-react-ui-kit";
import Cookies from "js-cookie";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {clearMessage} from "../Redux/Actions/AllActions/AdminAction";


const validPassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const ModalEditPasswordUser_User = () => {

  const [show, setShow] = useState(false);


  const dispatch = useDispatch();
  const checkBtn = useRef();
  const user = JSON.parse(Cookies.get("user"));
  const form = useRef();

  const {message} = useSelector(state => state.message);
  const [successful, setSuccessful] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const onChangeOldPassword = (e) => {
    const password = e.target.value;
    setOldPassword(password);
  };
  const onChangeNewPassword = (e) => {
    const password = e.target.value;
    setNewPassword(password);
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
    setSuccessful(false)
    setShow(true);
  }
  const handleClose = () => {
    setSuccessful(false);
    dispatch(clearMessage());
    setShow(false);
  }

  const handleSubmit = (e) => {
    setSuccessful(false);
    form.current.validateAll();
    const theEditUser = {
      id: user.id,
      password: newPassword,
      checkPassword: oldPassword
    }
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(updateUserWithNewPassword(theEditUser))
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
      <button className="button fw-bold mb-5" onClick={handleShow}> Change
        <MDBIcon fas icon="key"/>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">Change Password </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="text-dark" onSubmit={handleSubmit} ref={form}>
            {!successful && (
              <div>
                <div className="form-row">
                  <div className="form-floating mb-3">
                    <Input
                      value={oldPassword}
                      type="password"
                      maxLength={40}
                      className="form-control form-control-lg"
                      placeholder="Current password"
                      maxLength={40}
                      onChange={onChangeOldPassword}
                      validations={[required, validPassword]}
                    />
                  </div>
                  <div className="form-floating mb-3">
                    <Input
                      value={newPassword}
                      type="password"
                      maxLength={40}
                      className="form-control form-control-lg"
                      placeholder="New password"
                      onChange={onChangeNewPassword}
                      validations={[required, validPassword]}
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


export default ModalEditPasswordUser_User;
