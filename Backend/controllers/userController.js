import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generatetoken.js'
import fs from 'fs'


// Register a new user
//route  POST/api/users
//@access public

const registerUser= asyncHandler(async (req,res)=>{
    const {name,email,password}=req.body
    const userExists=await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('user already existing')
    }
    const photo=""
    const user = await User.create({
        name,
        email,
        password,
        photo
    })
    if(user){
       const token =  generateToken(user._id);
     
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token
        })
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
   
})



// Auth user/set token
//route  POST/api/users/auth
//@access public

const authUser= asyncHandler(async (req,res)=>{
   const { email,password}= req.body
   const user=await User.findOne({email})
   console.log("haaaikkkk");
if(user.matchPasswords(password)){
    console.log('password');
}
   if(user && (await user.matchPasswords(password))){
    
    const token = generateToken(user._id)
    console.log(token,'kkkk');
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        photo:user.photo,
        token
    })
    console.log(user,'haaaaaa');
    
}else{
    res.status(400)
    throw new Error('Invalid User or password')
} 
   
})



// Log out user
//route  POST/api/users/logout
//@access public

const logoutUser= asyncHandler(async (req,res)=>{
 
   
    res.status(200).json({message:'User logged out'})
})

// Get user profile
//route  POST/api/users/profile
//@access private

const getUserProfile= asyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id)
    res.status(200).json(user)
})

// Update user profile
//route  PUT/api/users/profile
//@access private

const updateUserProfile= asyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id)   
    let new_image = '';
    
    try {
        
        if (req.file ) { // Check if the file is uploaded and has a filename
          new_image = req.file.filename;
          try {
            fs.unlinkSync('./uploads/' + req.body.photo);
          } catch (error) {     
            console.log(error);
          }
        }else{
            new_image= req.body.photo;
        }
       
    console.log(new_image,'ffffffff');
      } catch (error) {
        console.log(error);
      }

    if(user){
       user.name=req.body.name || user.name
       user.email=req.body.email || user.email
        user.photo= new_image || user.photo
        if(req.body.password){
            user.password=req.body.password
        } 

        const updatedUser =await user.save()
      
        res.status(201).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            password:updatedUser.password,
            photo:updatedUser.photo
            
        })

     }else{
         res.status(404)
         throw new Error('User not found')
     }
    
})


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}
