import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='m-4'>
      <div className='text-center text-2xl text-gray-600 pt-10'>
        <p>CONTACT <span className='text-gray-800 font-semibold'>US</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-12 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center gap-6 items-start'>
          <p className='text-lx text-gray-600 font-semibold'>Our OFFICE</p>
          <p className='text-gray-500'>Kali pull kot addu<br />Punjab , PAKISTAN</p>
          <p className='text-gray-500'>Tel: +923331788600 <br />Email: fatehmuhammad623@gmail.com</p>
          <p className='text-lx text-gray-600 font-semibold'>Careers at RAICARE</p>
          <p className='text-gray-500'>Learn more about our team and job openings</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      
    </div>
  )
}

export default Contact
