import React, {useState, useEffect} from "react";
import "../Styles/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "../Components/SidebarMenu";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import {Navigate} from "react-router-dom";
import Cookies from "js-cookie";
import Footer from "../Components/Footer";
import {getNrOfNodes, getNrOfRelations} from "../Redux/Actions/AllActions/AdminAction";
import {useDispatch} from "react-redux";


const Info_Admin = () => {
  const dispatch = useDispatch();
  const [nrOfNodes, setnrOfNodes] = useState();
  const [nrOfRelations, setnrOfRelations] = useState();

  useEffect(() => {
    dispatch(getNrOfNodes())
      .then((Nodes) => {
        setnrOfNodes(JSON.parse(Nodes))
      })
    dispatch(getNrOfRelations())
      .then((Relations) => {
        setnrOfRelations(JSON.parse(Relations))
      })
  }, [])

  if (!Cookies.get('user')) {
    return <Navigate to="/"/>;
  }
  if (JSON.parse(Cookies.get('user')).role === "ROLE_USER") {
    return <Navigate to="/Homepage"/>;
  }

  return (
    <div>
      <Sidebar/>
      <div className="container" style={{height: '100vh'}}>
        <div className="row justify-content-md-center">
          <div className="col-lg-7 m-5 align-content-md-center">
            <h1 className="text-white mb-5 animatedLine">Information page</h1>
            <p className="text-white-50">
              Here you can find all information about all datasets. You can see how many nodes and relations that are
              stored in the database,
            </p>
            <h4 className="animatedLine">Nodes : {nrOfNodes}</h4>
            <h4 className="animatedLine">Relations : {nrOfRelations}</h4>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Info_Admin;
