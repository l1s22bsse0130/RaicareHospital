import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

// Create the context
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    // Hooks must be inside a functional component
    const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem('aToken'): "");
    const [doctors, setDoctors] = useState([]);
    const [appoinments, setAppoinments] = useState([]);
    const [dashData,setDashData]= useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } });



            if (data.success) {
                console.log("Doctors data:", data.doctors);
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const changeAvaliability = async (docId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/change-avaliability', { docId }, { headers: { aToken } });
            if (data.success) {
                toast.success(data.message)
                getAllDoctors();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);

        }

    }
    const getAllAppoinment = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/appoinments', { headers: { aToken } });
            if (data.success) {
                setAppoinments(data.appoinments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const cancelAppoinment = async(apponimentId)=>{
        try {
           const {data} = await axios.post(backendUrl+'/api/admin//cancel-appoinment',{apponimentId},{headers:{aToken}});
           if(data.success){
            toast.success(data.message);
            getAllAppoinment();
           }else{
            toast.error(data.message);

           }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getDashData = async()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/dashboard',{headers:{aToken}})
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
    

    const value = {
        aToken,
        setAToken,
        backendUrl,
        getAllDoctors,
        doctors,
        changeAvaliability,
        appoinments, setAppoinments,
        getAllAppoinment,
        cancelAppoinment,
        dashData,
        getDashData
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
