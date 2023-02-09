import React, {useCallback, useEffect, useState} from 'react';
import {Button, Table} from "reactstrap";
import Cookies from "js-cookie";
import {signOut} from "../../../Actions/Auth";
import axios from "axios";
import ModalEdit from "./ModalEdit";

const EditableTable = () => {
  const columns = ['Fullname', 'Age', 'Company Name', 'City', 'Country'];

  const [userList, setUserList] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:8085/api/auth/getAllUser")
      .then((respone) =>{
        console.log(respone.data)
        setUserList(respone.data);
      })
  }, [])


  return (
    <Table bordered hover variant="dark">
      <thead className="bg-dark text-white">
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
        userList.map(user =>
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
    </Table>
  );
};
export default EditableTable;
