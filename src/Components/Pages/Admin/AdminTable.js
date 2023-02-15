import React, {useCallback, useEffect, useState} from 'react';
import {Button, Table} from "reactstrap";
import Cookies from "js-cookie";
import {signOut} from "../../../Actions/UserActions/AuthAction";
import axios from "axios";
import ModalEdit from "./ModalEdit";
import {useDispatch} from "react-redux";
import {getAllUsers} from "../../../Actions/UserActions/UserAction";

const AdminTable = (props) => {

  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers())
      .then((users) =>{
        setUserList(JSON.parse(users))
      })
  }, [])


  return (
    <table className="table text-white">
      <thead className="animatedLine" >
      <tr>
        <th>ID</th>
        <th>Email</th>
        <th>Password</th>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Role</th>
        <th>Edit</th>
      </tr>
      </thead>
      <tbody>
      {
        userList.map((user,index) =>
          <tr>
            <td>{user.identity}</td>
            <td>{user.username}</td>
            <td>{user.username}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.role}</td>
            <td><ModalEdit user={user}/></td>
          </tr>


        )
      }
      </tbody>
    </table>

  );
};
export default AdminTable;
