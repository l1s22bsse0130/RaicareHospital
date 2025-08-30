import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/Appcontext';
import axios from 'axios'
import { toast } from 'react-toastify';


const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfile } = useContext(DoctorContext)
  const { backendUrl, Currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        avaliable: profileData.avaliable
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfile();

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message);
      console.log(error);

    }
  }
  useEffect(() => {
    if (dToken) {
      getProfile();

    }

  }, [dToken])
  return profileData && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/80 w-full rounded-lg sm:max-w-64' src={profileData.image} alt="" />
        </div>
        <div className='flex-1 border border-stone-100 py-7 p-8 rounded-lg bg-white '>
          {/* doctor info name degree experience  */}
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1  text-gray-500'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 rounded-full border text-sm'>{profileData.experience}</button>
          </div>
          {/* about doctor  */}
          <div>
            <p className='flex items-center text-sm  gap-1 mt-3 font-medium text-neutral-900'>About:</p>
            <p className='text-sm text-gray-700 mt-1 max-w-[700px]'>{profileData.about}</p>
          </div>
          <p className='text-gray-700 font-medium mt-4'>Appointment fee: <span className='text-gray-800'>{Currency}{isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}</span>  </p>
          <div className=' flex gap-2 py-2 '>
            <p>Address:</p>
            <p className='text-sm'>
              {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
              <br />
              {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
            </p>
          </div>
          <div className='flex gap-1 pt-2'>
            <input onChange={() => isEdit && setProfileData(prev => ({ ...prev, avaliable: !prev.avaliable }))} checked={profileData.avaliable} type="checkbox" name="" id="" />
            <label htmlFor="">Avaliable</label>
          </div>
          {
            isEdit
              ? <button onClick={updateProfile} className='py-1 px-4 border border-primary text-sm mt-5 rounded-full hover:bg-primary hover:text-white transition-all'>Save</button>
              : <button onClick={() => setIsEdit(true)} className='py-1 px-4 border border-primary text-sm mt-5 rounded-full hover:bg-primary hover:text-white transition-all'>Edit</button>
          }


        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
