import React, {useState, useRef, useEffect} from "react";
import "../Styles/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {addDatasets_Patients, addDatasets_Symptoms, updateUser} from "../Redux/Actions/AllActions/AdminAction";
import {useDispatch, useSelector} from "react-redux";

const AddDatasetsSection = () => {
  const dispatch = useDispatch();
  const [pressed, setPressed] = useState(true);
  const [symptomsFile, setSymptomsFile] = useState();
  const [patientFile, setPatientFile] = useState();
  const [symptomsMessageError, setSymptomsMessageError] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const {message} = useSelector(state => state.message);
  const onChangeSymptoms = e => {
    setSymptomsFile(e.target.files[0])
  }
  const onChangePatient = e => {
    setPatientFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    if (!patientFile) setSymptomsMessageError(true)
    else {
      //Två funktions anrop
      dispatch(addDatasets_Patients(patientFile))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        })
      if(symptomsFile){
        dispatch(addDatasets_Symptoms(symptomsFile))
          .then(() => {
            setSuccessful(true);
          })
          .catch(() => {
            setSuccessful(false);
          })
      }
      setSymptomsMessageError(false)
    }

  }


  function setMessage() {
    if (symptomsMessageError)
    return <div className="form-group-sm mt-2" hidden={!setSymptomsFile}>
      <div className="alert alert-danger" role="alert">
        There are no patients admitted, you must admit patients.
      </div>
    </div>
  }

  return (
    <div>
      <section className="bg-transparent text-white">
        <h4 className="textOrange">Add a new datasets</h4>
        <Form onSubmit={handleSubmit}>
          <p className="mt-2">Patient data</p>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" onChange={event => onChangePatient(event)}/>
          </Form.Group>

          <div className="form-check form-check-inline mt-3" onChange={event => {
            setPressed(pressed => !pressed) && setSymptomsFile(null)
          }}>
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
            <h6>Want to add symptoms?</h6>
          </div>
          <Form.Group controlId="formFile" className="mb-3" hidden={pressed}>
            <p>Symptoms</p>
            <Form.Control type="file" disabled={pressed} onChange={event => onChangeSymptoms(event)}/>
          </Form.Group>

          {message && (
            <div className="form-group">
              <div
                className={successful ? "alert alert-success" : "alert alert-danger"}
                role="alert">
                {message}
              </div>
            </div>
          )}
        </Form>
        {setMessage()}
        <button  className="btn btn-outline-success btn-lg" onClick={event => handleSubmit()}>Add
        </button>
      </section>
    </div>
  );
};

export default AddDatasetsSection;
