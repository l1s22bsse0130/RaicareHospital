import validator from "validator";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from "cloudinary";
import { Doctor } from "../models/doctors.model.js";
import jwt from 'jsonwebtoken'
import { Appoinment } from "../models/appoinment.model.js";
import { User } from "../models/user.model.js";

// API for adding a doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, avaliable, fees, address } = req.body;
        const imageFile = req.file;

        // Validate required fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !avaliable || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password length
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }

        // Hashing doctor's password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Check if the image is provided
        if (!imageFile) {
            return res.json({ success: false, message: "Please upload an image" });
        }

        // Upload image to Cloudinary
        const uploadImage = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = uploadImage.secure_url;

        // Parse the address safely
        let parsedAddress;
        try {
            parsedAddress = JSON.parse(address);
        } catch (error) {
            return res.json({ success: false, message: "Invalid address format" });
        }

        // Create doctor data
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashPassword,
            speciality,
            experience,
            degree,
            about,
            avaliable, 
            fees,
            address: parsedAddress,
            date: Date.now(),
        };

        // Save doctor to the database
        const newDoctor = new Doctor(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: "Doctor Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
// Api from admin login 
const loginAdmin = async(req,res)=>{
    try {
        const {email , password}=req.body
        if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRETE)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid credentials"})
        }
        
    } catch (error) {
        res.json({ success: false, message: error.message });
        
    }

}

// Api to get all doctor list for admin panel 
const allDoctor = async(req,res)=>{

    try {
        const doctors = await Doctor.find({}).select("-password")
        res.json({success:true,doctors});
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
}
// Api to get all appoinment list 
const appoinmentAdmin= async (req,res)=>{
    try {
        const appoinments = await Appoinment.find({});
        res.json({success:true ,appoinments});

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}

// Api for appoinment cancellation 

const appoinmentCancelled = async (req, res) => {
    try {
        const { apponimentId } = req.body;

        // Fetch the appointment data
        const appoinmentData = await Appoinment.findById(apponimentId)

        // Check if the appointment exists
        if (!appoinmentData) {
            return res.json({ success: false, message: "Appointment not found" });
        }


        // Mark the appointment as cancelled
        await Appoinment.findByIdAndUpdate(apponimentId, { cancelled: true });

        const { docId, slotDate, slotTime } = appoinmentData;

        // Fetch doctor data
        const doctorData = await Doctor.findById(docId);

        // Check if the doctor data is available
        if (!doctorData) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        // Update doctor's booked slots
        let slots_booked = doctorData.slots_booked;
        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
        }

        // Update the doctor's slots in the database
        await Doctor.findByIdAndUpdate(docId, { slots_booked });

        // Return success message
        return res.json({ success: true, message: "Appointment is cancelled" });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

// Api to get rd data for admin panel 
const adminDashboard = async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        const appoinments = await Appoinment.find({});
        const users = await User.find({});

        const dashData = {
            doctors: doctors.length,
            patients: users.length,
            appoinments: appoinments.length,
            latestAppoinments: appoinments.reverse().slice(0, 5)
        };

        res.json({ success: true, dashData });
        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};


export { addDoctor ,loginAdmin,allDoctor ,appoinmentAdmin,appoinmentCancelled,adminDashboard};
