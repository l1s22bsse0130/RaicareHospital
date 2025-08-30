import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/Appcontext';

const DoctorDashboard = () => {
    const { dToken, dashData, getDashData,  completeAppoinment, cancelAppoinment } = useContext(DoctorContext);
    const { Currency, slotDateFormate } = useContext(AppContext)
    useEffect(() => {
        if (dToken) {
            getDashData();
        }
    }, [dToken])
    return dashData && (
        <div className='w-full max-w-6xl mx-auto my-5 px-4'>
            <div className='flex flex-wrap gap-3'>
                <div className='flex items-center p-4 gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all '>
                    <img className='w-15' src={assets.doctor_icon} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-700'>{Currency}{dashData.earning}</p>
                        <p className='text-gray-400'>Earnings</p>
                    </div>
                </div>
                <div className='flex items-center p-4 gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all '>
                    <img className='w-15' src={assets.earning_icon} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-700'>{dashData.appoinments}</p>
                        <p className='text-gray-400'>Appoinments</p>
                    </div>
                </div>
                <div className='flex items-center p-4 gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all '>
                    <img className='w-15' src={assets.patients_icon} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-700'>{dashData.patients}</p>
                        <p className='text-gray-400'>Patients</p>
                    </div>
                </div>
            </div>

            <div className='bg-white'>
                <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
                    <img src={assets.list_icon} alt="" />
                    <p className='font-semibold'>Latest Booking</p>
                </div>
                <div className='pt-4 border border-t-0'>
                    {
                        dashData.latestAppoinments.map((item, index) => (
                            <div className='flex items-center px-6py-6 gap-3 hover:bg-gray-100 m-5' key={index}>
                                <img className='w-10 rounded-full' src={item.userData.image} alt="" />
                                <div className='flex-1 text-sm'>
                                    <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                                    <p className='text-gray-800'>{slotDateFormate(item.slotDate)}</p>
                                </div>
                                {
                                item.cancelled ? 
                                    <p className='text-red-500 text-sm font-medium'>Cancelled</p>
                                 : item.isCompleted ? 
                                    <p className='text-green-500 text-sm font-medium'>Completed</p>
                                 : 
                                    <div className='flex space-x-2'>
                                        <img onClick={() => cancelAppoinment(item._id)} className='w-8 h-8 cursor-pointer' src={assets.cancel_icon} alt="Cancel" />
                                        <img onClick={() => completeAppoinment(item._id)} className='w-8 h-8 cursor-pointer' src={assets.tick_icon} alt="Complete" />
                                    </div>
                                
                            }
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard
