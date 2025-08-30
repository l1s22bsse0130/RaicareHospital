import express from 'express'
import { appoinmentCancel, appoinmentCompleted, appoinmentDoctor, doctorDasboard, DoctorList, doctorProfile, doctorProfileUpdate, loginDoctor } from '../controllers/doctor.controller.js';
import { authDoctor } from '../middlewares/authDoctor.middleware.js';


const doctorRouter = express.Router();
doctorRouter.get('/list',DoctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appoinments',authDoctor,appoinmentDoctor);
doctorRouter.post('/complete-appoinment',authDoctor,appoinmentCompleted)
doctorRouter.post('/cancel-appoinment',authDoctor,appoinmentCancel)
doctorRouter.get('/dashboard',authDoctor,doctorDasboard)
doctorRouter.get('/profile',authDoctor,doctorProfile);
doctorRouter.post('/update-profile',authDoctor,doctorProfileUpdate);


export default doctorRouter;