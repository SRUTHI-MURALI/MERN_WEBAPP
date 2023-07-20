import asyncHandler from 'express-async-handler'
import User from '../Models/userModel.js'
import generateToken from '../utils/generatetoken.js'

// Auth user/set token
//route  POST/api/users/auth
//@access public

const authUser= asyncHandler(async (req,res)=>{
   const { email,password}= req.body
   const user=await User.findOne({email})
   
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
        token
    })
    console.log(user,'haaaaaa');
    
}else{
    res.status(400)
    throw new Error('Invalid User or password')
} 
   
})

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
    const user = await User.create({
        name,
        email,
        password
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

    if(user){
       user.name=req.body.name || user.name
       user.email=req.body.email || user.email
      
        if(req.body.password){
            user.password=req.body.password
        } 

        const updatedUser =await user.save()
      
        res.status(201).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            password:updatedUser.password
            
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
