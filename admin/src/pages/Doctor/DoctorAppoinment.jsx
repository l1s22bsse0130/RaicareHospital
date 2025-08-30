import { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/Appcontext';
import { assets } from '../../assets/assets';

const DoctorAppoinment = () => {
    const { appoinment, dToken, getAppoinments, completeAppoinment, cancelAppoinment } = useContext(DoctorContext);
    const { calculateAge, slotDateFormate, Currency } = useContext(AppContext);
    
    useEffect(() => {
        if (dToken) {
            getAppoinments();
        }
    }, [dToken]);

    return (
        <div className='w-full max-w-6xl mx-auto my-5 px-4'>
            <p className='font-medium text-lg mb-3'>All Appointments</p>
            <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto'>
                <div className='hidden md:grid md:grid-cols-[0.5fr_3fr_1fr_1fr_3fr_1fr_1fr] py-3 px-6 border-b gap-1.5'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Actions</p>
                </div>
                {
                    appoinment.reverse().map((item, index) => (
                        <div className='flex flex-wrap justify-between gap-1.5 md:grid md:grid-cols-[0.5fr_3fr_1fr_1fr_3fr_1fr_1fr] items-center text-gray-700 py-3 px-6 border-b hover:bg-gray-50' key={index}>
                            <p className='hidden md:block'>{index + 1}</p>
                            <div className='flex items-center gap-2'>
                                <img className='w-10 h-10 rounded-full bg-gray-200' src={item.userData.image} alt="" />
                                <p className='text-sm'>{item.userData.name}</p>
                            </div>
                            <div>
                                <p className='text-sm inline px-2 border border-primary rounded-full'>{item.payment ? "Online" : "Cash"}</p>
                            </div>
                            <p className='hidden md:block'>{calculateAge(item.userData.dob)}</p>
                            <p className='text-sm'>{slotDateFormate(item.slotDate)}, {item.slotTime}</p>
                            <p className='text-sm'>{Currency}{item.amount}</p>
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
    );
}

export default DoctorAppoinment;
