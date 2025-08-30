import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDtoken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    if (aToken) {
      localStorage.removeItem("aToken");
      setAToken('');
    } else if (dToken) {
      localStorage.removeItem("dToken");
      setDtoken('');
    }
    navigate('/');
  };

  return (
    <div className='flex justify-between items-center px-4 sm:py-10 py-3 border border-b '>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-600 text-gray-700 bg-white'>
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button 
        onClick={logout} 
        className='bg-primary text-white text-sm md:text-base lg:text-lg px-4 sm:px-6 md:px-8 py-2 rounded-full transition-transform transform hover:scale-105'
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
