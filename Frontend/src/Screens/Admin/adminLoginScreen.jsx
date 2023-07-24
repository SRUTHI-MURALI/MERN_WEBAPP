import React, { useState, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {Form,Button} from 'react-bootstrap'
import FormContainer from '../../components/FormContainer/FormContainer'
import { useLoginMutation } from '../../Slices/AdminApiSlice'
import { setAdminCredentials } from '../../Slices/AdminSlice'
import {toast} from 'react-toastify'
import Loader from '../../components/Loader/Loader'

const AdminLogin=()=> {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [login, {isLoading} ]=useLoginMutation()

    
    const submitHandler=async (e)=>{
        e.preventDefault()
        
        try {
            
            const res = await login({email,password}).unwrap()
            dispatch(setAdminCredentials({...res}))
          
            navigate('/adminHome')
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
       
    }
  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control   
                type='email'
                placeholder='Enter valid email'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password </Form.Label>
                <Form.Control   
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            {isLoading && <Loader/>}
           <Button type='submit' variant='primary' className='mt-3'>
                Sign In
           </Button>
           
        </Form>
    </FormContainer>
  )
}

export default AdminLogin
