
import validator from "validator";
import bcrypt from 'bcrypt';
import { User } from "../models/user.model.js";
import Jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary"
import { Doctor } from "../models/doctors.model.js";
import { Appoinment } from "../models/appoinment.model.js";
const registerUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password length
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const userData = {
            email,
            name,
            password: hashPassword
        }
        const newUser = new User(userData)
        const user = await newUser.save();
        const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRETE)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })


    }
}

// Api use for yser login 
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // Generate JWT token
            const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRETE);
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Api for get data for profile 
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await User.findById(userId).select('-password');
        res.json({ success: true, userData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }

}

// Api for update profile 
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file
        if (!name || !phone || !phone || !gender) {
            return res.json({ success: false, message: "Missing Details" });

        }
        await User.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
        if (imageFile) {
            const imageupload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageUrl = imageupload.secure_url;
            await User.findByIdAndUpdate(userId, { image: imageUrl })


        }
        res.json({ success: true, message: "Profile Updated" })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const bookAppoinment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;
        const docData = await Doctor.findById(docId).select('-password');
        if (!docData.avaliable) {
            return res.json({ success: false, message: "Doctor is not avaliable" })

        }
        let slots_booked = docData.slots_booked;
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "slot is not avaliable" })

            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)

        }

        const userData = await User.findById(userId).select('-password');
        delete docData.slots_booked

        const appoinmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: Date.now()
        }
        const newAppoinment = new Appoinment(appoinmentData)
        await newAppoinment.save();


        // save new slot in docData 
        await Doctor.findByIdAndUpdate(docId, { slots_booked })
        res.json({ success: true, message: "Appoinemt Booked" })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });


    }


}

// Api to get user appoinment for frontend myappoinment page 
const listAppoinment = async (req, res) => {
    try {
        const { userId } = req.body
        const appoinment = await Appoinment.find({ userId })

        res.json({ success: true, appoinment })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }

}

// Api to create cancel appoinment 
const cancelAppoinment = async (req, res) => {
    try {
        const { userId, apponimentId } = req.body;

        // Fetch the appointment data
        const appoinmentData = await Appoinment.findById(apponimentId)

        // Check if the appointment exists
        if (!appoinmentData) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        // Check if the user is authorized to cancel the appointment
        if (appoinmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized action" });
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
//   Api to make of payment of appoinment using easypassa and jazzcash



export { registerUser, userLogin, getProfile, updateProfile, bookAppoinment, listAppoinment, cancelAppoinment }