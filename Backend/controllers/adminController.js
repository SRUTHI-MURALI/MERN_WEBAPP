import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generatetoken.js'


// adminlogin 
//route  POST/api/admin/adminlogin
//@access public

const adminLogin= asyncHandler(async (req,res)=>{
    const { email,password}= req.body
    console.log("haaai");
    const name="sruthi"
    const id=12345
 if(email==="admin123@gmail.com" && password==="123"){
     console.log('password');
     const token = generateToken(id)
     res.status(201).json({
         
        name,
        email,
        password,
        token
        
     })
   
     
 }else{
     res.status(400)
     throw new Error('Invalid userid or password')
 } 
    
 })

 // Get user profile
//route   POST/api/admin/userData
//@access private

const getUserData= asyncHandler(async (req,res)=>{
    const user = await User.find()
    res.status(200).json(user)
})


// Add User
//route POST/api/admin/createUser
//@access public

const createUser= asyncHandler(async (req,res)=>{
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
         res.status(201).json({
             _id:user._id,
             name:user.name,
             email:user.email,
             password:user.password,
             photo:user.photo
         })
     }else{
         res.status(400)
         throw new Error('Invalid User Data')
     }
})



// Update user Data
//route PUT/api/admin/updateUser/:id
//@access private

const updateUser= asyncHandler(async (req,res)=>{
    const id=req.params.id;
   
    const user = await User.findById(id)   
    

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
            password:updatedUser.password,
            
            
        })

     }else{
         res.status(404)
         throw new Error('User not found')
     }
    
})


//Delete User
//route DELETE/api/admin/deleteUser/:id
//@access public

const deleteUser=asyncHandler(async(req,res)=>{
    const id=req.params.id;
    console.log(id,'delete');
    const user = await User.findById(id)
    if(user){
        await User.deleteOne({_id:id})
    }
    res.status(200).json({message:'deleted'})
})

 // Logout admin
//route   POST/api/admin/adminlogout
//@access public

const adminLogout= asyncHandler(async (req,res)=>{
   
   
    res.status(200).json({message:'admin logged out'})
})

 export { adminLogin,adminLogout,getUserData,createUser,updateUser,deleteUser}