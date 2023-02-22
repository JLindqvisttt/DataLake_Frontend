import React, {useState, useRef, useEffect} from "react";
import "../Styles/style.css"
import Sidebar from "../Components/SidebarMenu";
import {Navigate} from "react-router-dom";
import Cookies from "js-cookie";

import Select from 'react-select'
import {MDBIcon} from "mdb-react-ui-kit";


const HomePage = () => {

  const [databases, setDatabases] = useState([]);
  const [selectedDatabases, setSelectedDatabases] = useState(null);

  useEffect(() => {
    if (Cookies.get('user')) {
      const items = JSON.parse(Cookies.get('user')).availableDatabases;
      console.log("|||" + items)
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
    if (selectedDatabases){
      if (selectedDatabases.value === "database_kth") {
        return (
          <div>
            <button className="button fw-bold m-4"><MDBIcon fas icon="sync"/> Hämta all data för KTH</button>
            <button className="button fw-bold m-4"><MDBIcon fas icon="sync"/> Ge mig all data som omkom i cancer i kth</button>
            <button className="button fw-bold m-4"><MDBIcon fas icon="sync"/> Vilket ämne orsakar cancer mest?</button>
          </div>
        )
      }
      if (selectedDatabases.value === "database_karolinska") {
        return (
          <div>
            <button className="button fw-bold m-4"><MDBIcon fas icon="sync"/> Hämta all data för karolinska</button>
            <button className="button fw-bold m-4"><MDBIcon fas icon="sync"/> Ge mig all data som omkom i cancer</button>
            <button className="button fw-bold m-4"><MDBIcon fas icon="sync"/> Vilket ämne orsakar cancer mest?</button>
          </div>
        )
      }
      if (selectedDatabases.value === "database_bollmora_vårdcentral") {
        return (
          <div>
            <button className="button fw-bold m-4"><MDBIcon fas icon="sync"/> Hämta all data </button>
            <button className="button fw-bold m-4"><MDBIcon fas icon="sync"/> Ge mig all data som omkom i cancer</button>
            <button className="button fw-bold m-4"><MDBIcon fas icon="sync"/> Vilket ämne orsakar cancer mest?</button>
          </div>
        )
      }
    }
  }

  return (
    <div>
      <Sidebar/>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col m-5">
            <h1 className="text-white mb-5 animatedLine">Home page</h1>
            <section className=" mt-3">
              <h5 className="mt-3 text-white-50">Which database you want to work with</h5>
              <div className="col-3">
                <Select className={"form-select-lg"} options={databases} onChange={setSelectedDatabases} defaultValue={selectedDatabases}/>
              </div>
              {whichDatabasesSelected()}
            </section>


          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
