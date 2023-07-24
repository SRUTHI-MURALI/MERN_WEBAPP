import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import { toast } from 'react-toastify';
import axios from 'axios';

function AdminHomeScreen() {
  
  const [users, setUsers] = useState([]);
  
useEffect(()=>{
  const submitHandler = async (e) => {
   
    try {
      const res = await axios.get('/api/admin/userData'); 
      setUsers(res.data); 
      
     
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
    
  };
  submitHandler()
},[])

const deleteHandler= async (userid)=>{
 
 await axios.delete(`/api/admin/deleteUser/${userid}`)
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userid));
   
  }


 

  return (
    <div>
      
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {users.map((user,index) => (
        <tr key={user._id}>
          <td>{index+1}</td>
          <td>{user.name}</td>
          <td>{user.email} </td>
          <td><button className='btn btn-danger' onClick={()=>deleteHandler(user._id)}>Delete</button></td>
          <td><button className='btn btn-primary'>Update</button></td>
        </tr>
        ))}
        </tbody>
    </Table>
    </div>
  );
}

export default AdminHomeScreen;
