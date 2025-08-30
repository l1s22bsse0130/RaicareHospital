import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctor from './pages/Doctor'
import Login from './pages/Login'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppoinments from './pages/MyAppoinments'
import About from './pages/About'
import Appoinments from './pages/Appoinments'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div className='m-2'>
      <ToastContainer/>
      <Navbar/>
      <div className='m-10'>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/doctors' element={<Doctor/>}></Route>
        <Route path='/doctors/:speciality' element={<Doctor/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/myprofile' element={<MyProfile/>}></Route>
        <Route path='/myappoinments' element={<MyAppoinments/>}></Route>
        <Route path='/appoinment/:docId' element={<Appoinments/>}></Route>
      </Routes>
      </div>
    
      <Footer/>
      
    </div>
  )
}

export default App
