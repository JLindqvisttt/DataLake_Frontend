import React, {useState, useRef, useEffect} from "react";
import "../style.css"
import Sidebar from "../../Navbar/SidebarMenu";
import Cookies from "js-cookie";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";


const Profile = () => {
  const [userEmail, setUserEmail] = useState();
  const [userRole, setUserRole] = useState();
  const [userFirstname,setuserFirstname] = useState();
  const [userLastname,setuserLastname] = useState();

  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if(Cookies.get('user')){
      setUserEmail(JSON.parse(Cookies.get('user')).email)
      setuserFirstname(JSON.parse(Cookies.get('user')).firstname)
      setuserLastname(JSON.parse(Cookies.get('user')).lastname)
      setUserRole(JSON.parse(Cookies.get('user')).role)
    }
  }, [])

  if (!Cookies.get('user')) {
    return <Navigate to="/" />;
  }


  return (
    <div className="container-fluid ps-md-0">
      <Sidebar/>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6 m-5">
            <h1>{userFirstname}   {userLastname}</h1>
            <h5>{userEmail} </h5>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;
