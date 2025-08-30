import express from 'express'
import { addDoctor,adminDashboard,allDoctor,appoinmentAdmin,appoinmentCancelled,loginAdmin } from '../controllers/admin.controller.js';
import upload from '../middlewares/multar.middleware.js';
import { authAdmin } from '../middlewares/authAdmin.middleware.js';
import { changeAvaliability } from '../controllers/doctor.controller.js';

const adminRouter = express.Router();
adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctor)
adminRouter.post('/change-avaliability',authAdmin,changeAvaliability)
adminRouter.get('/appoinments', authAdmin, appoinmentAdmin);
adminRouter.post('/cancel-appoinment',authAdmin,appoinmentCancelled)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter;