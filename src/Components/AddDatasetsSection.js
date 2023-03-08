import React, {useState, useRef, useEffect} from "react";
import "../Styles/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {
  addDatasets_Patients,
  addDatasets_Symptoms, clearMessage,
  getAllUsers,
  updateUser
} from "../Redux/Actions/AllActions/AdminAction";
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
  const [loadingSymptoms, setloadingSymptoms] = useState(false);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const dispatch = useDispatch();
  const [symptomsFile, setSymptomsFile] = useState();
  const [patientFile, setPatientFile] = useState();
  const [datasetNamePatient, setdatasetNamePatient] = useState();
  const [datasetNameSymptoms, setdatasetNameSymptoms] = useState();
  const [symptomsMessageError, setSymptomsMessageError] = useState(false);
  const [nameMessageError, setnameMessageError] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const {message} = useSelector(state => state.message);

  const form = useRef();
  const checkBtn = useRef();

  useEffect(() => {
    dispatch(clearMessage());
  }, [symptomsMessageError])

  const onChangeSymptoms = e => {
    setSymptomsFile(e.target.files[0])
  }
  const onChangePatient = e => {
    setPatientFile(e.target.files[0])
  }
  const onChangeDatasetNamePatients = e => {
    const name = e.target.value;
    setdatasetNamePatient(name)
  }
  const onChangeDatasetNameSymptoms = e => {
    const name = e.target.value;
    setdatasetNameSymptoms(name)
  }

  const handleSubmitPatients = (e) => {
    if (patientFile && datasetNamePatient!=null) {
      setLoadingPatients(true);
      dispatch(addDatasets_Patients(patientFile, datasetNamePatient))
        .then(() => {
          setSuccessful(true);
          setLoadingPatients(false);
        })
        .catch(() => {
          setSuccessful(false);
          setLoadingPatients(false);
        })
      setSymptomsMessageError(false)
      setnameMessageError(false)

    } else {
      setnameMessageError(true)
    }
  }
  const handleSubmitSymptoms = (e) => {
    if (symptomsFile && datasetNameSymptoms!=null) {
      setloadingSymptoms(true);
      dispatch(addDatasets_Symptoms(symptomsFile, datasetNameSymptoms))
        .then(() => {
          setSuccessful(true);
          setloadingSymptoms(false);
        })
        .catch(() => {
          setSuccessful(false);
          setloadingSymptoms(false);
        })
      setSymptomsMessageError(false)
      setnameMessageError(false)
    } else {
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
        <Form onSubmit={handleSubmitPatients} ref={form}>
            <div>
              <p className="textOrange mt-2">Patient data</p>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={event => onChangePatient(event)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Datasheets name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a dataset name"
                  onChange={onChangeDatasetNamePatients}
                  maxLength={50}
                  value={datasetNamePatient}
                  validations={[required, validName]}
                />
                <Form.Text className="text-muted">
                  You must enter a name to this new dataset, to save this in the database
                </Form.Text>
              </Form.Group>
            </div>
        </Form>
        <button
          className="btn btn-outline-success btn-lg"
          onClick={event => handleSubmitPatients()}
          disabled={loadingPatients }>
          {loadingPatients && (
            <span className="spinner-border spinner-border-sm ">  </span>
          )}
          <span>Add patients</span>
        </button>
        <Form onSubmit={handleSubmitSymptoms} ref={form}>
            <div>
              <Form.Group controlId="formFile" className="mb-3">
                <p className="textOrange mt-3">Symptoms data</p>
                <Form.Control type="file" onChange={event => onChangeSymptoms(event)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Datasheets name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a dataset name"
                  onChange={onChangeDatasetNameSymptoms}
                  maxLength={50}
                  value={datasetNameSymptoms}
                  validations={[required, validName]}
                />
                <Form.Text className="text-muted">
                  You must enter a name to this new dataset, to save this in the database
                </Form.Text>
              </Form.Group>
            </div>
          {message && (
            <div className="form-group align-content-center">
              <div
                className={successful ? "alert alert-success" : "alert alert-danger"}
                style={{width:'450px'}}
                role="alert">
                {message}
              </div>
            </div>
          )}
        </Form>
        {setMessageName()}
        <button
          className="btn btn-outline-success btn-lg"
          onClick={event => handleSubmitSymptoms()}
          disabled={loadingSymptoms }>
          {loadingSymptoms && (
            <span className="spinner-border spinner-border-sm ">  </span>
          )}
          <span>Add symptoms</span>
        </button>
      </section>
    </div>
  );
};

export default AddDatasetsSection;
