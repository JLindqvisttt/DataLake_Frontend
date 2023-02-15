import React, {useState, useRef, useEffect} from "react";
import "../style.css"
import Sidebar from "../../Navbar/SidebarMenu";
import Cookies from "js-cookie";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import {signIn} from "../../../Redux/Actions/UserActions/AuthAction";


const Profile = () => {
  const [userEmail, setUserEmail] = useState();
  const [userRole, setUserRole] = useState();
  const [userFirstname, setuserFirstname] = useState();
  const [userLastname, setuserLastname] = useState();
  const [userPassword, setuserPassword] = useState();
  const [edit, setEdit] = useState(true);

  const form = useRef();

  useEffect(() => {
    if (Cookies.get('user')) {
      setUserEmail(JSON.parse(Cookies.get('user')).email)
      setuserFirstname(JSON.parse(Cookies.get('user')).firstname)
      setuserLastname(JSON.parse(Cookies.get('user')).lastname)
      setUserRole(JSON.parse(Cookies.get('user')).role)
    }
  }, [])

  if (!Cookies.get('user')) {
    return <Navigate to="/"/>;
  }
  const onChangeFirstname = (e) => {
    setuserFirstname(e.target.value);
  };
  const onChangeLastname = (e) => {
    setuserLastname(e.target.value);
  };
  const onChangePassword = (e) => {
    setuserPassword(e.target.value);
  };
  const handleLogin = (e) => {

    e.preventDefault();

  }

  function EditButton() {
    if (edit) return <button className="button fw-bold mb-2" onClick={event => setEdit(false)}>Edit</button>
    else return <button className="buttonGreen fw-bold mb-2" onClick={event => setEdit(true)}>Save</button>
  }

  return (
    <div className="container-fluid ps-md-0">
      <Sidebar/>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6 m-5">
            <h1 className="text-white mb-5 animatedLine">{userEmail}</h1>
            <form className="text-dark" onSubmit={handleLogin} ref={form}>
              <div className="row">
                <div className="col">
                  <div className="form-group mb-3">
                    <label className="animatedLine">Firstname</label>
                    <input
                      type="text"
                      placeholder="Fistname"
                      className="form-control form-control-lg"
                      name="firstname"
                      id="userEmail"
                      disabled={edit}
                      value={userFirstname}
                      onChange={onChangeFirstname}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group mb-3">
                    <label className="animatedLine">Lastname</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="password"
                      value={userLastname}
                      placeholder="Password"
                      id="floatingPassword"
                      disabled={edit}
                      onChange={onChangeLastname}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    {EditButton()}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};


export default Profile;
