import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // FontAwesome icons for menu and close button
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { token, setToken, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState(''); // State to track selected menu item

  const closeMenu = () => {
    setShowMenu(false);
  };

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // Set the active menu
  };

  return (
    <div className="flex items-center justify-between text-sm py-3 md:py-4 mb-5 border-b m-10 border-b-gray-400">
      {/* Logo */}
      <img
        onClick={() => {
          navigate('/');
          closeMenu();
          setActiveMenu(''); // Clear activeMenu when navigating to home via logo
        }}
        className="w-32 md:w-44 cursor-pointer"
        src={assets.raicare_logo}
        alt="Logo"
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-2 font-medium">
        <NavLink to={'/'}>
          <li className="py-1 text-xs md:text-base" onClick={() => handleMenuClick('HOME')}>
            HOME
          </li>
          {activeMenu === 'HOME' ? <hr className="border-none h-0.5 w-2/5 m-auto bg-primary" /> : ""}
        </NavLink>

        <NavLink to={'/doctors'}>
          <li className="py-1 text-xs md:text-base" onClick={() => handleMenuClick('ALL DOCTORS')}>
            ALL DOCTORS
          </li>
          {activeMenu === 'ALL DOCTORS' ? <hr className="border-none h-0.5 w-2/5 m-auto bg-primary" /> : ""}
        </NavLink>

        <NavLink to={'/about'}>
          <li className="py-1 text-xs md:text-base" onClick={() => handleMenuClick('ABOUT')}>
            ABOUT
          </li>
          {activeMenu === 'ABOUT' ? <hr className="border-none h-0.5 w-2/5 m-auto bg-primary" /> : ""}
        </NavLink>

        <NavLink to={'/contact'}>
          <li className="py-1 text-xs md:text-base" onClick={() => handleMenuClick('CONTACT')}>
            CONTACT
          </li>
          {activeMenu === 'CONTACT' ? <hr className="border-none h-0.5 w-2/5 m-auto bg-primary" /> : ""}
        </NavLink>
      </ul>

      {/* Profile or Login Button and Menu Toggle */}
      <div className="flex items-center gap-2">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer relative group">
            <img className="w-8 rounded-full" src={userData.image} alt="Profile" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />

            {/* Dropdown menu shown on hover */}
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-400 z-20 hidden group-hover:flex">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-2 p-2">
                <p
                  onClick={() => {
                    navigate('myprofile');
                    setActiveMenu(''); // Clear activeMenu on profile click
                  }}
                  className="hover:text-black cursor-pointer text-xs"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate('myappoinments');
                    setActiveMenu(''); // Clear activeMenu on appointment click
                  }}
                  className="hover:text-black cursor-pointer text-xs"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer text-xs">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate('/login');
              closeMenu();
              setActiveMenu(''); // Clear activeMenu on login click
            }}
            className="bg-primary text-white py-1 px-3 rounded-full font-light text-xs md:py-2 md:px-0.5 md:text-sm lg:py-3 lg:px-6"
          >
            CREATE ACCOUNT
          </button>
        )}

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-2xl ml-2" onClick={() => setShowMenu(!showMenu)}>
          <FaBars />
        </button>
      </div>

      {/* Conditional Menu for Mobile */}
      {showMenu && (
        <ul className="flex flex-col items-start gap-2 font-medium md:hidden bg-white p-3 absolute top-14 left-0 right-0 z-20">
          <button className="absolute top-2 right-10 text-xl" onClick={closeMenu}>
            <FaTimes />
          </button>
          <NavLink to={'/'}>
            <li className="py-1 text-xs" onClick={() => { handleMenuClick('HOME'); closeMenu(); }}>
              HOME
            </li>
            {activeMenu === 'HOME' && <hr className="border-none h-0.5 w-2/5 m-auto bg-primary" />}
          </NavLink>
          <NavLink to={'/doctors'}>
            <li className="py-1 text-xs" onClick={() => { handleMenuClick('ALL DOCTORS'); closeMenu(); }}>
              ALL DOCTORS
            </li>
            {activeMenu === 'ALL DOCTORS' && <hr className="border-none h-0.5 w-2/5 m-auto bg-primary" />}
          </NavLink>
          <NavLink to={'/about'}>
            <li className="py-1 text-xs" onClick={() => { handleMenuClick('ABOUT'); closeMenu(); }}>
              ABOUT
            </li>
            {activeMenu === 'ABOUT' && <hr className="border-none h-0.5 w-2/5 m-auto bg-primary" />}
          </NavLink>
          <NavLink to={'/contact'}>
            <li className="py-1 text-xs" onClick={() => { handleMenuClick('CONTACT'); closeMenu(); }}>
              CONTACT
            </li>
            {activeMenu === 'CONTACT' && <hr className="border-none h-0.5 w-2/5 m-auto bg-primary" />}
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
