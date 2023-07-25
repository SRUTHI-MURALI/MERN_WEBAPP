import React, { useState,useEffect } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import {Form,Button,} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer/FormContainer'
import {toast} from 'react-toastify'
import { useUpdateUserMutation } from '../Slices/UsersApiSlice'
import Loader from '../components/Loader/Loader'
import { setCredentials } from '../Slices/AuthSlice'


const ProfileScreen=()=> {
    const {userInfo} = useSelector((state)=> state.auth)
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [photo, setPhoto] = useState(null);
    const dispatch=useDispatch()

    const handleChange=(e)=> {
        const file=e.target.files[0]
        if(file){
            setPhoto(file)
        }
    }
 

    const [updateUser, {isLoading} ]=useUpdateUserMutation()

   
    useEffect(()=>{
        
        setName(userInfo.name)
        setEmail(userInfo.email)
        setPhoto(userInfo.photo)
    },[userInfo])

   

    const submitHandler= async(e)=>{
    
        e.preventDefault()
       if(password !== confirmPassword){
            toast.error('Password error')
       }else{
            try {
                
                const formData = new FormData();
                formData.append('_id', userInfo._id);
                formData.append('name', name);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('photo', photo);
                const res = await updateUser(formData).unwrap();
                dispatch(setCredentials({ ...userInfo, name,email}));
               
               toast.success('Profile updated')

            } catch (err) {
                toast.error(err?.data?.message || err.message);
            }
       }
    }
  return (
    <FormContainer >
        
        <h1>Update Profile</h1>
        <Form onSubmit={submitHandler} encType='multipart/form-data'>
            <Form.Group className='my-2' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control   
                type='text'
                placeholder='Enter your name'
                value={name}
                onChange={(e)=> setName(e.target.value)}
                ></Form.Control>
            </Form.Group>

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

            <Form.Group className='my-2' controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control   
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e)=> setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

           
             <Form.Group  className="App">
            <h2>Add Image:</h2>
            <input type="file" onChange={handleChange} />
            <img src={photo} />
            </Form.Group >
           
            {isLoading && <Loader/>}
           <Button type='submit' variant='primary' className='mt-3'>
                Update
           </Button>
          
        </Form>
    </FormContainer>
  )
}

export default ProfileScreen

