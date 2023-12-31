import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AdminHomeScreen() {
  
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
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

const handleSearch = (e) => {
  setSearchQuery(e.target.value);
};

const deleteHandler= async (userid)=>{
 
 await axios.delete(`/api/admin/deleteUser/${userid}`)
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userid));
   
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <InputGroup className="mb-5">
        <FormControl
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
        
        </InputGroup>
    <InputGroup className='mb-5'><Link to={'/addUser'}><button className='btn btn-primary' >
      Add User</button></Link></InputGroup>
        
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
          {filteredUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className='btn btn-danger' onClick={() => deleteHandler(user._id)}>Delete</button>
                
              </td>
             
            </tr>
          ))}
        </tbody>
        
    </Table>
    </div>
  );
}

export default AdminHomeScreen;
