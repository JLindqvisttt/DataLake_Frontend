import React, {useState, useRef, useEffect} from "react";
import "../Styles/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import makeAnimated from 'react-select/animated'
import {Modal, NavLink} from "react-bootstrap";
import {Button, Col} from "reactstrap";
import Select from 'react-select'


const AdminPage = (props) => {
  const [show, setShow] = useState(false);
  const animatedComponents = makeAnimated();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [password, setPassword] = useState("");

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return (
    <>
      <button className="btn btn-primary" onClick={handleShow}>
        Edit
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="animatedLine">{props.user.firstName} {props.user.lastName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Databases</h5>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
          />
          <h5 className="mt-3">Role</h5>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
          />
          <h5 className="mt-3">Change password</h5>
          <div className="form-group mb-5">
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              placeholder="Password"
              id="floatingPassword"
              onChange={onChangePassword}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="btn btn-danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className="btn btn-success">Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminPage;
