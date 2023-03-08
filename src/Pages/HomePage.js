import React, {useState, useRef, useEffect} from "react";
import "../Styles/style.css"
import Sidebar from "../Components/SidebarMenu";
import {Navigate} from "react-router-dom";
import Cookies from "js-cookie";

import Select from 'react-select'
import {MDBIcon} from "mdb-react-ui-kit";
import Footer from "../Components/Footer";
import {useDispatch} from "react-redux";
import {getAllPatients, getPatientsByDataset} from "../Redux/Actions/AllActions/UserAction";
import {utils, write as writeExcel} from 'xlsx';
import {saveAs} from 'file-saver';

const HomePage = () => {
  const dispatch = useDispatch();
  const [databases, setDatabases] = useState([]);
  const [selectedDatabases, setSelectedDatabases] = useState(null);
  const [successfulGetData, setsuccessfulGetData] = useState(false);
  const [failedGetData, setfailedGetData] = useState(false);
  const [dataDownload, setdataDownload] = useState([]);

  useEffect(() => {
    if (Cookies.get('user')) {
      const items = JSON.parse(Cookies.get('user')).availableDatabases;
      const convertedItems = items.map(item => ({
        label: item.charAt(0).toUpperCase() + item.slice(1),
        value: item
      }));
      setDatabases(convertedItems)
    }
  }, [])


  if (!Cookies.get('user')) {
    return <Navigate to="/"/>;
  }

  function whichDatabasesSelected() {
    if (selectedDatabases) {
      if (selectedDatabases.value === "261") {
        return (
          <div>
            <button className="button fw-bold m-4" onClick={event => getPatientByDatasetFunction()}><MDBIcon fas
                                                                                                             icon="sync"/> Get
              all patients from this dataset
            </button>
          </div>
        )
      }
    }
  }

  function getAllPatientsFunction() {
    setsuccessfulGetData(false)
    dispatch(getAllPatients())
      .then((datasets) => {
        setsuccessfulGetData(true)
        setdataDownload(datasets)
      }).catch((err) => {
      setfailedGetData(true)
    })
  }

  function getPatientByDatasetFunction() {
    setsuccessfulGetData(false)
    dispatch(getPatientsByDataset(selectedDatabases.value))
      .then((datasets) => {
        setsuccessfulGetData(true)
        setdataDownload(datasets)
        console.log(datasets)
      }).catch((err) => {
      setfailedGetData(true)
    })
  }

  function close() {
    setsuccessfulGetData(false)
    setdataDownload(null)
  }

  function setMessageGetData() {
    if (failedGetData)
      return <div className="form-group-sm mt-2">
        <div className="alert alert-danger" role="alert">
          Failed to retrieved the data
        </div>
      </div>
    if (successfulGetData) return <div className="form-group-sm mt-2">
      <div className="alert alert-success text-center" role="alert">
        <p>Successfully retrieved the data</p>
        <button className="btn btn-danger m-2" onClick={event => close()}>Close</button>
        <button className="btn btn-primary m-2" onClick={downloadJSON}><MDBIcon fas icon="download"/> Download as JSON
        </button>
        <button className="btn btn-primary m-2" onClick={downloadExcel}><MDBIcon fas icon="download"/> Download as Excel
        </button>
      </div>
    </div>
  }

  const downloadJSON = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(dataDownload)], {type: "application/json"});
    element.href = URL.createObjectURL(file);
    element.download = "data.json";
    document.body.appendChild(element);
    element.click();
  };

  const downloadExcel = () => {
    if (!dataDownload) return;
    const data = JSON.parse(dataDownload);
    const flattenedData = data.map(item => {
      const flattenedItem = { ...item };
      flattenedItem.treatment = item.treatment.treatment; // Flatten the treatment field
      flattenedItem.symptoms = item.symptoms.map(symptom => `${symptom.symptom} (${symptom.severity})`).join(', '); // Flatten the symptoms field
      flattenedItem.overAllSurvivalStatus = item.overAllSurvivalStatus.overAllSurvivalStatus; // Flatten the overAllSurvivalStatus field
      flattenedItem.newMalignancy = item.newMalignancy.newMalignancy; // Flatten the newMalignancy field
      if (item.causeOfDeath) flattenedItem.causeOfDeath = item.causeOfDeath.causeOfDeath; // Flatten the causeOfDeath field
      return flattenedItem;
    });
    const sheet = utils.json_to_sheet(flattenedData);
    const book = utils.book_new();
    utils.book_append_sheet(book, sheet, 'Sheet1');
    const excelBuffer = writeExcel(book, {type: 'buffer'});
    saveAs(new Blob([excelBuffer]), 'data.xlsx');
  };

  return (
    <div>
      <Sidebar/>
      <div className="container" style={{height: '100vh'}}>
        <div className="row justify-content-md-center">
          <div className="col m-5">
            <h1 className="text-white mb-5 animatedLine">Home page</h1>
            <section className=" mt-3">
              <h5 className="mt-3 text-white-50">Which database you want to work with</h5>
              <div className="col-3">
                <Select className={"form-select-lg"} options={databases} onChange={setSelectedDatabases}
                        defaultValue={selectedDatabases} isSearchable={false}/>
              </div>
              {whichDatabasesSelected()}
              <h5 className="text-white-50 mt-3">General queries</h5>
              <button className="button fw-bold m-4" onClick={event => {
                getAllPatientsFunction()
              }}><MDBIcon fas icon="sync"/> Get
                all patients from ALL datasets
              </button>
              {setMessageGetData()}

            </section>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
