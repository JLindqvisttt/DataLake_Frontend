import React, {useState, useRef, useEffect} from "react";
import "../Styles/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import {Button, Modal, NavLink} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {clearMessage, getAllDatasets, getAllUsers, updateUser} from "../Redux/Actions/AllActions/AdminAction";
import {MDBIcon} from "mdb-react-ui-kit";
import Select from 'react-select'
import {MultiSelect} from "react-multi-select-component";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";


const validPassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const ModalEditUser_Admin = (user) => {

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [databases, setDatabases] = useState([]);
  const [showPassword, setshowPassword] = useState(false);
  const checkBtn = useRef();
  const [successful, setSuccessful] = useState(false);
  const {message} = useSelector(state => state.message);

  const [databasesOptions, setdatabasesOptions] = useState([]);
  const form = useRef();
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  useEffect(() => {
    const items = user.user.availableDatabases;
    if (items != null) {
      const convertedItems = items.map(item => ({
        label: item.charAt(0).toUpperCase() + item.slice(1),
        value: item
      }));
      setDatabases(convertedItems)
      if (user.user.role == "ROLE_ADMIN") {
        const converted = {
          label: "ROLE_ADMIN",
          value: "ROLE_ADMIN"
        };
        setRole(converted)
      } else {
        const converted = {
          label: "ROLE_USER",
          value: "ROLE_USER"
        }
        setRole(converted)
      }
    }
    dispatch(getAllDatasets())
      .then((datasets) => {
        if (typeof datasets === 'string') datasets = JSON.parse(datasets);
        const convertedItems = datasets.map((item) => ({
          label: item.charAt(0).toUpperCase() + item.slice(1),
          value: item
        }));
        console.log("Converted items:", JSON.stringify(convertedItems));
        setdatabasesOptions(convertedItems)
      })


  }, [])


  const roleOptions = [
    {label: "ROLE_USER", value: "ROLE_USER"},
    {label: "ROLE_ADMIN", value: "ROLE_ADMIN"},
  ];

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
    dispatch(clearMessage());
    setSuccessful(true);
    setShow(false);
  }
  const handleShow = () => {
    setSuccessful(false);
    dispatch(clearMessage());
    setShow(true);
  }
  const handleSubmit = (e) => {
    const DatabaseList = databases.map(value => value.value);
    setSuccessful(false);
    form.current.validateAll();

    if (password) {
      if (checkBtn.current.context._errors.length === 0) {
        const theEditUser = {
          id: user.user.id,
          password: password,
          role: role.value,
          availableDatabases: DatabaseList
        }

        dispatch(updateUser(theEditUser))
          .then(() => {
            setSuccessful(true);
          })
          .catch(() => {
            setSuccessful(false);
          })
      }
    } else {

      const theEditUser = {
        identity: user.user.id,
        role: role,
        availableDatabases: DatabaseList
      }
      dispatch(updateUser(theEditUser))
        .then(() => {
          setSuccessful(true);
        })
        .catch((err) => {
          setSuccessful(false);
        })
    }
  }

  return (
    <>
      <button className="btn btn-primary" onClick={handleShow}>
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
          <Modal.Title className="text-dark">Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className="animatedLine">{user.user.username}</h3>
          <Form className="text-dark" onSubmit={handleSubmit} ref={form}>
            {!successful && (
              <div>

                <h5>Databases </h5>
                <MultiSelect
                  options={databasesOptions}
                  value={databases}
                  onChange={setDatabases}
                  labelledBy="Select"
                />


                <h5 className="mt-3">Role</h5>
                <Select
                  type="text"
                  labelledBy="Select"
                  value={role}
                  defaultValue={role}
                  onChange={setRole}
                  options={roleOptions}
                  isSearchable={false}
                />

                <div className="form-check form-check-inline mt-3" onChange={event => {
                  setshowPassword(showPassword => !showPassword) || setPassword("")
                }}>
                  <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                  <h6>Check this if you want to create a new password</h6>
                </div>
                <div className="form-group mb-5" hidden={!showPassword}>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    placeholder="New password"
                    id="floatingPassword"
                    maxLength={40}
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
                  onClick={event => handleSubmit()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


export default ModalEditUser_Admin;
