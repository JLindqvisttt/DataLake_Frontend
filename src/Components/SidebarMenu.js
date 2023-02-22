import React, {useCallback, useEffect, useState} from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import {NavLink} from 'react-router-dom';
import "../Styles/Sidebar.css"
import Cookies from 'js-cookie'
import {useDispatch} from "react-redux";
import {signOut} from "../Redux/Actions/AllActions/AuthAction";


const Sidebar = (props) => {
  const [userEmail, setUserEmail] = useState();
  const [userRole, setUserRole] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    setUserEmail(JSON.parse(Cookies.get('user')).email)
    setUserRole(JSON.parse(Cookies.get('user')).role)
  }, [])

  const signout = useCallback(() =>{
    dispatch(signOut());
  },[dispatch])

  return (
    <div style={{position: 'fixed', overflow: 'scroll initial', height: '100vh', zIndex: '1000'}}>
      <CDBSidebar style={{backgroundColor: "#131316", boxShadow: '2px 2px 10px 1px rgb(255, 165, 0,0.2)'}}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large text-dark"></i>} className="animatedLine">
          <a href="/Users/Nonno/Documents/GitHub/DataLake_Frontend/src/Pages/HomePage" className="text-decoration-none sidebarTitle" style={{color: 'inherit'}}>
            Data lake
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">

          <CDBSidebarMenu>
            <NavLink  to="/Homepage" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="home animatedLine">Home</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/ProfilePage" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user animatedLine">{userEmail}</CDBSidebarMenuItem>
            </NavLink>

            <NavLink  to="/" activeclassname="activeClicked" onClick={ signout  }>
              <CDBSidebarMenuItem icon="sign-out-alt text-danger">Sign out</CDBSidebarMenuItem>
            </NavLink>
            <div>
              <div hidden={userRole !== "ROLE_ADMIN"}>
                <hr/>
                <NavLink  to="/Adminpage" activeclassname="activeClicked ">
                  <CDBSidebarMenuItem icon="lock-open text-info">Admin page </CDBSidebarMenuItem>
                </NavLink>
              </div>

            </div>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
}

function remove(){
  console.log("apa")
  Cookies.remove('user')
}
export default Sidebar;
