import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/Appcontext';
import { assets } from '../../assets/assets';

const Allappoinment = () => {
  const { aToken, getAllAppoinment, appoinments, cancelAppoinment } = useContext(AdminContext);
  const { calculateAge, slotDateFormate, Currency } = useContext(AppContext);


  useEffect(() => {
    if (aToken) {
      getAllAppoinment();
    }
  }, [aToken]);

  return (
    <div className='w-full max-w-6xl mx-auto my-5'>
      <p className='font-medium text-lg mb-3'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appoinments.map((item, index) => (
          <div className='flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-700 py-3 px-6 border-b hover:bg-gray-50' key={index}>
            <p className='hidden sm:block'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-10 h-10 rounded-full bg-gray-200' src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
            </div>
            <p className='hidden sm:block'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormate(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img className='w-10 h-10 rounded-full bg-gray-200' src={item.docData.image} alt="" />
              <p>{item.docData.name}</p>
            </div>
            <p>{Currency}{item.amount}</p>
            {
              item.cancelled
                ? <p className='text-red-500 text-sm font-medium'>cancelled</p>
                :item.isCompleted
                  ? <p className='text-green-600 text-sm font-medium  '>Completed</p>
                  : <img onClick={() => cancelAppoinment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default Allappoinment;
