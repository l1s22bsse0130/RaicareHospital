import { Doctor } from "../models/doctors.model.js";
import { Appoinment } from "../models/appoinment.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const changeAvaliability = async(req,res)=>{
    try {
        const {docId} = req.body;
        const doctorData = await Doctor.findById(docId)
        await Doctor.findByIdAndUpdate(docId,{avaliable:!doctorData.avaliable})
        res.json({success:true,message:"Avaliability changed"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const DoctorList = async(req,res)=>{
    try {
        const doctors = await Doctor.find({}).select(["-password","-email"])
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
}

// api to login doctor 
const loginDoctor = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const doctor = await Doctor.findOne({email});
        if(!doctor){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password,doctor.password)
        if(isMatch){
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRETE)
            res.json({success:true,token});
        }else{
            return res.json({success:false,message:"Invalid credentials"})

        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
}
// api to get doctor appoinment for doctor panel 
const appoinmentDoctor = async(req,res)=>{
    try {
        const {docId}=req.body;
        const appoinment = await Appoinment.find({docId})
        res.json({success:true,appoinment})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
}

// api to create appointemt completed for doctor panel 
const appoinmentCompleted =async(req,res)=>{
    try {
        const {docId, apponimentId} = req.body
        const appoinmentData = await Appoinment.findById(apponimentId);
        if(appoinmentData && appoinmentData.docId===docId){
            await Appoinment.findByIdAndUpdate(appoinmentData,{isCompleted:true});
            return res.json({success:true,message:"Appointment Completed"});

        }else{
            return res.json({success:false,message:"Mark Failed"});

        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
}
// api to create appointemt cancel for doctor panel 
const appoinmentCancel =async(req,res)=>{
    try {
        const {docId, apponimentId} = req.body
        const appoinmentData = await Appoinment.findById(apponimentId);
        if(appoinmentData && appoinmentData.docId===docId){
            await Appoinment.findByIdAndUpdate(appoinmentData,{ cancelled:true});
            return res.json({success:true,message:"Appointment Cancelled"});

        }else{
            return res.json({success:false,message:"Cancellation Failed"});

        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
}

// Api to get dashboard data from doctor panel 
const doctorDasboard = async (req, res) => {
    try {
        const { docId } = req.body;
        const appoinments = await Appoinment.find({ docId });

        let earning = 0;
        const patients = new Set(); // Use a Set to keep unique patient IDs

        appoinments.forEach((item) => {
            if (item.isCompleted || item.payment) {
                earning += item.amount;
            }
            patients.add(item.userId); // Add the patient ID to the Set
        });

        const dashData = {
            earning,
            appoinments: appoinments.length,
            patients: patients.size, // Get the size of the Set for unique patients
            latestAppoinments: appoinments.reverse().slice(0, 5), // Note: Corrected 'latestappoinments' to 'latestAppoinments'
        };

        res.json({ success: true, dashData });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// api to get doctor profile for doctor panel 
const doctorProfile = async(req,res)=>{
    try {
        const {docId}= req.body
        const profileData = await Doctor.findById(docId).select("-password");
        res.json({success:true,profileData})

        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        
    }
}

// api to update doctor profile in doctor panel 
const doctorProfileUpdate = async(req,res)=>{
    try {
        const {docId ,fees,avaliable,address} = req.body;
        await Doctor.findByIdAndUpdate(docId,{fees,avaliable,address});
        res.json({success:true,message:"Profile Update"})
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        
        
    }
}

export {changeAvaliability,DoctorList,loginDoctor,appoinmentDoctor,appoinmentCompleted,appoinmentCancel,doctorDasboard,doctorProfile,doctorProfileUpdate}