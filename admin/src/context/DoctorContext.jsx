import react, { createContext,useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDtoken] = useState(localStorage.getItem("dToken") ? localStorage.getItem('dToken') : "")
    const [appoinment, setAppoinment] = useState([]);
    const [dashData,setDashData]= useState(false);
    const [profileData,setProfileData]= useState(false);
    const getAppoinments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/appoinments', { headers: { dToken } });
            if (data.success) {
                setAppoinment(data.appoinment);
                console.log(data.appoinment); 
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error(error.message);
        }
    };

    const completeAppoinment = async(apponimentId)=>{

        try {
            const {data} = await axios.post(backendUrl+"/api/doctor/complete-appoinment",{apponimentId},{headers:{dToken}})
            if (data.success) {
                toast.success(data.message)
                getAppoinments()
                
            }else{
                toast.error(data.message);

            }
            
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error(error.message);
            
        }
    }

    const cancelAppoinment = async(apponimentId)=>{

        try {
            const {data} = await axios.post(backendUrl+"/api/doctor/cancel-appoinment",{apponimentId},{headers:{dToken}})
            if (data.success) {
                toast.success(data.message)
                getAppoinments()
                
            }else{
                toast.error(data.message);

            }
            
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error(error.message);
            
        }
    }
    const getDashData = async()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/doctor/dashboard',{headers:{dToken}})
            if (data.success) {
                setDashData(data.dashData);
                console.log(data.dashData)
                
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            
        }
    }

    const getProfile = async()=>{
        try {
            const {data} = await axios.get(backendUrl+"/api/doctor/profile",{headers:{dToken}});
            if (data.success) {
                setProfileData(data.profileData);
                console.log(data.profileData);
                
            }
            
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
            
        }
    }

   
    
    
    const value = {
        dToken, setDtoken,
        backendUrl,
        appoinment, setAppoinment,
        getAppoinments,
        completeAppoinment, 
        cancelAppoinment,
        dashData,setDashData,getDashData,
        profileData,setProfileData,
        getProfile

    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>


    )
}
export default DoctorContextProvider;