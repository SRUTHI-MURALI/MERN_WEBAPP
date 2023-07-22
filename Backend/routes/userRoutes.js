import express from 'express'
import { authUser,    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/imageUploadMiddleware.js'


const router=express.Router()

router.post('/',registerUser)
router.post('/auth',authUser)
router.post('/logout',logoutUser)
router.get('/profile',protect, getUserProfile)
router.put('/profile',protect,upload,updateUserProfile)
export default router   