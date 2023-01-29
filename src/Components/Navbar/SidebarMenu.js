import React, {useCallback} from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink} from 'react-router-dom';
import "./Sidebar.css"



const Sidebar = (props) => {

  return (
    <div style={{position: 'fixed', overflow: 'scroll initial', height: '100vh', zIndex: '1000'}}>
      <CDBSidebar style={{backgroundColor: "#131316"}}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large text-dark"></i>} className="animatedLine">
          <a href="/Homepage" className="text-decoration-none sidebarTitle" style={{color: 'inherit'}}>
            Data lake
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">

          <CDBSidebarMenu>
            <NavLink exact to="/Homepage" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home animatedLine">Home</CDBSidebarMenuItem>
            </NavLink>

            <NavLink activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user animatedLine">profile namnet</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/" activeClassName="activeClicked" >
              <CDBSidebarMenuItem icon="sign-out-alt text-danger">Sign out</CDBSidebarMenuItem>
            </NavLink>
            <div >
              <hr/>
              <NavLink exact to="/Adminpage" activeClassName="activeClicked ">
                <CDBSidebarMenuItem icon="lock-open text-info">Admin page </CDBSidebarMenuItem>
              </NavLink>
            </div>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
}

export default Sidebar;
