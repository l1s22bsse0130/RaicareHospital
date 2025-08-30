import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='m-4'>
      <div className='text-center text-2xl text-gray-600 pt-10'>
        <p>ABOUT <span className='text-gray-800 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[280px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Raicare Hospital is a leading healthcare facility committed to providing exceptional medical services with a focus on patient care and advanced treatments. Equipped with state-of-the-art technology, the hospital offers specialized care across various departments, including cardiology, orthopedics, and pediatrics</p>
          <p>With a team of experienced doctors and compassionate staff, Raicare ensures a comfortable environment for patients. Its emphasis on innovation and holistic treatment makes it a trusted choice for healthcare in the region.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision is to be a leader in healthcare, delivering compassionate, high-quality care through innovation and patient-centered services. We aim to continuously improve the well-being of the communities we serve by embracing cutting-edge technology, fostering a culture of trust, and setting new standards in medical excellence, while ensuring accessible and holistic healthcare for all.</p>
        </div>
      </div>
      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-800 font-semibold'>CHOOSE US</span></p>
      </div>
      <div className='flex flex-col md:flex-row mb-10'>
        <div className='border px-10 m-1 md:px-16 py-4 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer'>
          <b>Efficiency:</b>
          <p>Raicare ensures efficient, timely care with advanced technology and expertise.</p>
        </div>
        <div className='border px-10 m-1 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer'>
          <b>Convenience:</b>
          <p>Offers convenient, accessible healthcare with easy appointments and personalized services.</p>
        </div>
        <div className='border px-10 m-1 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer'>
          <b>Personalization:</b>
          <p>Gives personalized care focused on each person’s needs with kindness.</p>
        </div>
      </div>
    </div>
  )
}

export default About
