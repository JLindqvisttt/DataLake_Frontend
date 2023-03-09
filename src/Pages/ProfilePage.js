import React, {useState, useEffect} from "react";
import "../Styles/style.css"
import Sidebar from "../Components/SidebarMenu";
import Cookies from "js-cookie";
import {Navigate} from "react-router-dom";
import ModalEditUser_User from "../Components/ModalEditUser_User";
import ModalEditPasswordUser_User from "../Components/ModalEditPasswordUser_User";
import Footer from "../Components/Footer";


const ProfilePage = () => {
  const [userEmail, setUserEmail] = useState();
  const [userFirstname, setuserFirstname] = useState();
  const [userLastname, setuserLastname] = useState();
  const [databases, setDatabases] = useState([]);

  useEffect(() => {
    if (Cookies.get('user')) {
      setUserEmail(JSON.parse(Cookies.get('user')).email)
      setuserFirstname(JSON.parse(Cookies.get('user')).firstname)
      setuserLastname(JSON.parse(Cookies.get('user')).lastname)
      const datebase = JSON.parse(Cookies.get('user')).availableDatabases
      setDatabases(datebase)
    }
  }, [])

  if (!Cookies.get('user')) {
    return <Navigate to="/"/>;
  }


  function DatabaseList() {
    return (
      <div>
        {databases.map(database => (
          <h6 className="text-white-50" key={database}>{database}</h6>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Sidebar/>
      <div className="container" style={{height: '100vh'}}>
        <div className="row justify-content-md-center">
          <div className="col-8 m-5">
            <h1 className="text-white mb-5 animatedLine">Profile page</h1>
            <div className="row">
              <div className="col-9">
                <h1 className="text-white-50"> {userFirstname + " " + userLastname}</h1>
                <h5 className="text-white-50"> Email : {userEmail}</h5>
                <h4 className="text-white">Available databases</h4>
                {DatabaseList()}
                <hr className="text-white"/>
              </div>
              <div className="col">
                <ModalEditUser_User/>
                <ModalEditPasswordUser_User/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};


export default ProfilePage;
