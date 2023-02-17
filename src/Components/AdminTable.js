import React, {useCallback, useEffect, useState} from 'react';
import Cookies from "js-cookie";
import {signOut} from "../Redux/Actions/UserActions/AuthAction";
import axios from "axios";
import ModalEditUser from "./ModalEditUser";
import {useDispatch} from "react-redux";
import {getAllUsers} from "../Redux/Actions/UserActions/UserAction";
import {IconName} from "react-icons/io5";
import {MDBIcon} from "mdb-react-ui-kit";
import ModalRemoveUser from "./ModalRemoveUser";
import ModalAddUser from "./ModalAddUser";

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
    console.log("ao")
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
              <ModalAddUser/>
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
                    <td><ModalEditUser user={user}/></td>
                    <td></td>
                    <td><ModalRemoveUser user={user}/></td>
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
