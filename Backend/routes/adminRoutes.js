import express from 'express'
import { adminLogin,adminLogout,getUserData,createUser,updateUser,deleteUser } from '../controllers/adminController.js'

const router=express.Router()

router.post('/adminlogin',adminLogin)
router.post('/adminlogout',adminLogout)
router.get('/userData', getUserData)
router.post('/createUser',createUser)
router.put('/updateUser/:id',updateUser)
router.delete('/deleteUser/:id',deleteUser)


export default router  