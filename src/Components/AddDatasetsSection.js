import React, {useState, useRef, useEffect} from "react";
import "../Styles/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {addDatasets_Patients, addDatasets_Symptoms, updateUser} from "../Redux/Actions/AllActions/AdminAction";
import {useDispatch, useSelector} from "react-redux";
import CheckButton from "react-validation/build/button";

const validName = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be between 6 and 40 characters.
      </div>
    );
  }
};

const AddDatasetsSection = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [pressed, setPressed] = useState(true);
  const [symptomsFile, setSymptomsFile] = useState();
  const [patientFile, setPatientFile] = useState();
  const [datasetName, setdatasetName] = useState();
  const [symptomsMessageError, setSymptomsMessageError] = useState(false);
  const [nameMessageError, setnameMessageError] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const {message} = useSelector(state => state.message);

  const form = useRef();
  const checkBtn = useRef();
  const onChangeSymptoms = e => {
    setSymptomsFile(e.target.files[0])
  }
  const onChangePatient = e => {
    setPatientFile(e.target.files[0])
  }
  const onChangeDatasetName = e => {
    const name = e.target.value;
    setdatasetName(name)
  }

  const handleSubmit = (e) => {
    if (datasetName) {
      if (!patientFile) setSymptomsMessageError(true)
      else {
        setLoading(true);
        dispatch(addDatasets_Patients(patientFile, datasetName))
          .then(() => {
            setSuccessful(true);
            setLoading(false);
          })
          .catch(() => {
            setSuccessful(false);
            setLoading(false);
          })
        if (symptomsFile) {
          setLoading(true);
          dispatch(addDatasets_Symptoms(symptomsFile, datasetName))
            .then(() => {
              setSuccessful(true);
              setLoading(false);
            })
            .catch(() => {
              setSuccessful(false);
              setLoading(false);
            })
        }
        setSymptomsMessageError(false)
        setnameMessageError(false)
      }
    } else {
      console.log("test")
      setnameMessageError(true)
    }
  }
  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  function setMessage() {
    if (symptomsMessageError)
      return <div className="form-group-sm mt-2" hidden={!setSymptomsFile}>
        <div className="alert alert-danger" role="alert">
          There are no patients admitted, you must admit patients.
        </div>
      </div>
  }

  function setMessageName() {
    if (nameMessageError)
      return <div className="form-group-sm mt-2">
        <div className="alert alert-danger" role="alert">
          There are no name to the dataset, need one.
        </div>
      </div>
  }

  return (
    <div>
      <section className="bg-transparent text-white">
        <h4 className="textOrange">Add a new datasets</h4>
        <Form onSubmit={handleSubmit} ref={form}>
          {!successful && (
            <div>


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

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Datasheets name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a dataset name"
                  onChange={onChangeDatasetName}
                  maxLength={50}
                  value={datasetName}
                  validations={[required, validName]}
                />
                <Form.Text className="text-muted">
                  You must enter a name to this new dataset, to save this in the database
                </Form.Text>
              </Form.Group>
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
        </Form>
        {setMessage()}
        {setMessageName()}
        <button
          className="btn btn-outline-success btn-lg"
          onClick={event => handleSubmit()}
          disabled={loading}>
          {loading && (
            <span className="spinner-border spinner-border-sm ">  </span>
          )}
          <span>Add</span>
        </button>
      </section>
    </div>
  );
};

export default AddDatasetsSection;
