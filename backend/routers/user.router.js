import express from 'express'
import { bookAppoinment, cancelAppoinment, getProfile, listAppoinment,  registerUser, updateProfile, userLogin } from '../controllers/user.controller.js';
import { authUser } from '../middlewares/authUser.middleware.js';
import upload from '../middlewares/multar.middleware.js';
const userRouter = express.Router();
userRouter.post('/register',registerUser)
userRouter.post('/login',userLogin)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile);
userRouter.post('/book-appoinment',authUser,bookAppoinment)
userRouter.get('/appoinments',authUser,listAppoinment)
userRouter.post('/cancel-appoinment',authUser,cancelAppoinment)


export default userRouter;