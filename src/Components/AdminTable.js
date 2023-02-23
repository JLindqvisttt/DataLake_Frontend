import React, {useCallback, useEffect, useState} from 'react';
import Cookies from "js-cookie";
import {signOut} from "../Redux/Actions/AllActions/AuthAction";
import axios from "axios";
import ModalEditUser_Admin from "./ModalEditUser_Admin";
import {useDispatch} from "react-redux";
import {getAllUsers} from "../Redux/Actions/AllActions/AdminAction";
import {IconName} from "react-icons/io5";
import {MDBIcon} from "mdb-react-ui-kit";
import ModalRemoveUser_Admin from "./ModalRemoveUser_Admin";
import ModalAddUser_Admin from "./ModalAddUser_Admin";

const AdminTable = (props) => {

  const [updateUsers, setupdateUsers] = useState(false);
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();


  useEffect(() => {

    dispatch(getAllUsers())
      .then((users) => {
        console.log(JSON.parse(users))
        setUserList(JSON.parse(users))
      })
  }, [!updateUsers])

  function updateTheUserList() {
    setupdateUsers(true)
  }

  return (
    <>
      <div className="row">
        <div className="col">

        </div>

      </div>
      <div className="row">
        <table className="table text-white">
          <thead>
          <tr>
            <th className="animatedLine">Email</th>
            <th className="animatedLine">Firstname</th>
            <th className="animatedLine">Lastname</th>
            <th className="animatedLine">Role</th>
            <th className="animatedLine">Edit</th>
            <th>
              <button className="button fw-bold" onClick={event => updateTheUserList()}><MDBIcon fas icon="sync"/>
              </button>
            </th>
            <th>
              <ModalAddUser_Admin/>
            </th>
          </tr>
          </thead>
          <tbody>
          {
            userList.map((user) => {
                if (JSON.parse(Cookies.get('user')).email !== user.username) {
                  return <tr key={user.identity}>
                    <td>{user.username}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.role}</td>
                    <td><ModalEditUser_Admin user={user}/></td>
                    <td></td>
                    <td><ModalRemoveUser_Admin user={user}/></td>
                  </tr>
                }
              }
            )
          }
          </tbody>
        </table>
      </div>
    </>


  );
};
export default AdminTable;
