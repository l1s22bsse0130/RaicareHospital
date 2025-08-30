import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import ConnectionDB from './config/mongodb.js';
import cloudinaryConnection from './config/cloudinary.js';
import adminRouter from './routers/admin.route.js';
import doctorRouter from './routers/doctor.route.js';
import userRouter from './routers/user.router.js';


// app config
const app = express();
const port = process.env.PORT|| 4000
ConnectionDB();
cloudinaryConnection();
// middleware 
app.use(express.json());
app.use(cors());
// api endpoint 
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
app.get('/',(req,res)=>{
    res.send("Fateh Ali");

})

app.listen(port,()=>console.log("Server run at",port))