import React, {useState, useRef, useEffect} from "react";
import "../Styles/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import {Button, Modal, NavLink} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../Redux/Actions/UserActions/UserAction";
import {MDBIcon} from "mdb-react-ui-kit";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import {addUser} from "../Redux/Actions/UserActions/AdminAction";
import {isEmail} from "validator";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
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

const validPassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const ModalAddUser = () => {

  const [show, setShow] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [role, setRole] = useState("");


  const form = useRef();
  const checkBtn = useRef();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  const {message} = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onChangeFirstname = (e) => {
    const firstname = e.target.value;
    setFirstname(firstname);
  };

  const onChangeLastname = (e) => {
    const lastname = e.target.value;
    setLastname(lastname);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
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
    setSuccessful(false)
    setShow(true);
  }
  const handleClose = () => {
    setResponseMsg("")
    setShow(false);
  }

  const handleSubmit = (e) => {
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(addUser(email, password, firstname, lastname))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };
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
          <Form className="text-dark" onSubmit={handleSubmit} ref={form}>
            {!successful && (
              <div>
                <div className="form-floating mb-3">
                  <Input
                    type="email"
                    className="form-control form-control-lg"
                    name = "email"
                    value={email}
                    placeholder="name@example.com"
                    maxLength={65}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  />
                </div>

                <div className="form-row">
                  <div className="form-floating mb-3">
                    <Input
                      value={firstname}
                      type="text"
                      maxLength={65}
                      className="form-control form-control-lg"
                      placeholder="First name"
                      onChange={onChangeFirstname}
                      validations={[required, validFirstname]}
                    />
                  </div>
                  <div className="form-floating mb-3">
                    <Input
                      value={lastname}
                      type="text"
                      maxLength={65}
                      className="form-control form-control-lg"
                      placeholder="Last name"
                      onChange={onChangeLastname}
                      validations={[required, validLastname]}
                    />
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <Input
                    type="password"
                    className="form-control form-control-lg"
                    value={password}
                    maxLength={65}
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={onChangePassword}
                    validations={[required, validPassword]}
                  />
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
                  onClick={event => handleSubmit()}>Add user</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


export default ModalAddUser;
