import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const MyAppoinments = () => {
  const { backendUrl , token , getDoctorData } = useContext(AppContext);
  const [appoinment, setAppoinment] = useState([])
  const months = ["",'Jan',"Feb","Mar","Apr","May","Jun","Jul","Agg","Sep","Oct","Nov","Dec"];
  const slotDateFormate =(slotDate)=>{
    const dateArray = slotDate.split('_')
    return dateArray[0]+ " " +months[Number(dateArray[1])] + " " + dateArray[2]

  }
  const getUserAppoinment = async()=>{
    try {
      const {data} = await axios.get(backendUrl+'/api/user/appoinments',{headers:{token}})
      if(data.success){
        setAppoinment(data.appoinment.reverse());
        console.log(data.appoinment);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }
  const cancelAppoinment = async (apponimentId) => {
    try {
      // Await the axios call to resolve the promise
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appoinment', { apponimentId }, { headers: { token } });
      
      // Check if data contains success
      if (data.success) {
        toast.success(data.message);
        getUserAppoinment();
        getDoctorData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppoinment();
      
    }
  
  }, [token])
  
  return (
    <div>
      <p className=' m-3 pb-3 mt-12 font-medium text-zinc-800 border-b'>My Appointment</p>
      <div>
        {
          appoinment.map((item, index) => (
            <div className=' m-3 grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
              <img className='sm:w-60 bg-indigo-50' src={item.docData.image} alt="Doctor" />
              </div>
              <div className='flex-1 text-sm text-zinc-700'>
                <p className='text-neutral-900 font-semibold'>{item.docData.name}</p>
                <p >{item.docData.speciality}</p>
                <p className='text-zinc-800 mt-1 font-medium'>Address:</p>
                <p className='text-sm'>{item.docData.address.line1}</p>
                <p className='text-sm'>{item.docData.address.line2}</p>
                <p className='text-sm mt-1'><span className='font-medium text-neutral-800'>Date & Time</span> {slotDateFormate(item.slotDate)} | {item.slotTime}</p>
              </div>
              <div></div>
              <div className='flex flex-col justify-end gap-2'>
               {!item.cancelled && !item.isCompleted && <button className='text-stone-500 text-center text-sm sm:max-w-48 p-2  border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>} 
              {!item.cancelled&& !item.isCompleted &&<button onClick={()=>cancelAppoinment(item._id)} className='text-stone-500 text-center text-sm sm:max-w-48 p-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300'>Cancel appoinment</button>}
              {item.cancelled && !item.isCompleted &&<button className='sm:min-w-48 py-2 border border-red-600 rounded text-red-700  '>Appoinment cancelled</button>}
              {item.isCompleted &&<button className='sm:min-w-48 py-2 border border-green-600 rounded text-green-700  '>Completed</button>}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
export default MyAppoinments;
