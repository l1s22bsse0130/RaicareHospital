import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className='mx-8 md:mx-10'>
      <div className='flex flex-col gap-16 sm:grid grid-cols-[3fr_1fr_1fr] m-10 sm:gap-4 my-10 mt-40 text-sm'>
        {/* left section  */}
        <div>
          <img className='mb-5 w-40 cursor-pointer'
          onClick={()=>{navigate("/");scrollTo(0,0)}}
          src={assets.raicare_logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-9 sm:w-full '>RaiCare Hospital is a modern healthcare facility committed to offering excellent medical care. With skilled doctors and advanced technology, RaiCare provides a variety of services to ensure the best health for all patients.</p>
        </div>
        {/* center section */}
        <div>
          <p className='text-xl font-medium mb-5 sm:mb-2'>Company</p>
          <ul className='flex flex-col text-gray-600 gap-2'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy police</li>
            <li ><a href=" http://localhost:5174/"><button>Admin login</button></a></li>
            <li ><a href=" http://localhost:5174/"><button>Doctor login</button></a></li>
          </ul>
        </div>
         {/* right section  */}
         <div>
          <p className='text-xl font-medium mb-5 sm:mb-2'>Get in Touch</p>
          <ul  className='flex flex-col text-gray-600 gap-2'>
            <li>+923331788600</li>
            <li>fatehmuhammad623@gmail.com</li>
          </ul>
         </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-center text-sm'>Copyright 2024@ Raicare - All right Reserved</p>
      </div>
      
    </div>
  )
}

export default Footer
