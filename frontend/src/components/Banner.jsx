import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();
  return (
    <div className='flex rounded-lg px-6 bg-primary sm:px-10 md:px-14 xl:px-12 my-20 md:mx-10'>
        {/* left side */}
        <div className='flex-1 py-8 sm:py-12 md:py-16 lg:py-28 lg:pl-5'>
            <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
                <p>Book Appoinments</p>
                <p className='mt-4'>With 100+ Tursted Doctors</p>
            </div>
            <button onClick={()=>{navigate('/login'),scrollTo(0,0)}} className='text-sm bg-white sm:text-base px-8 py-4 text-gray-600 rounded-full mt-6 hover:scale-105 transition-all duration-200'>Create account</button>
        </div>
        {/* right side   */}
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
            <img className='w-full absolute right-0 bottom-0 max-w-md' src={assets.appointment_img} alt="" />

        </div>
    </div>
  )
}

export default Banner
