import React, {useCallback, useEffect, useState} from 'react';
import Cookies from "js-cookie";
import {signOut} from "../Redux/Actions/UserActions/AuthAction";
import axios from "axios";
import ModalEdit from "./ModalEdit";
import {useDispatch} from "react-redux";
import {getAllUsers} from "../Redux/Actions/UserActions/UserAction";
import {IconName} from "react-icons/io5";
import {MDBIcon} from "mdb-react-ui-kit";

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

      </div>
      <div className="row">

        <table className="table text-white">
          <thead >
          <tr>
            <th className="animatedLine">Email</th>
            <th className="animatedLine">Firstname</th>
            <th className="animatedLine">Lastname</th>
            <th className="animatedLine">Role</th>
            <th className="animatedLine">Edit</th>
            <th><button className="btn btn-primary text-white" onClick={event => updateTheUserList()}><MDBIcon fas icon="sync"/> </button> </th>
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
                    <td><ModalEdit user={user}/></td>
                    <td><button className="btn btn-danger text-white"><MDBIcon fas icon="trash-alt" /> </button></td>
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
