import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvaliability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className='w-full'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='overflow-y-auto  flex flex-wrap gap-4 pt-5'>
        {
          doctors.map((item, index) => (
            <div className='border border-indigo-100 rounded-xl max-w-56 cursor-pointer group' key={index}>
              <img className='bg-indigo-100 group-hover:bg-primary transition-all duration-500' src={item.image} alt={item.name} />
              <div className='p-4'>
                <p className='text-neutral-900 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-700 text-sm'>{item.speciality}</p>
                <div className='mt-2 flex items-center text-sm gap-1'>
                  <input 
                    onChange={() => changeAvaliability(item._id)} 
                    type="checkbox" 
                    checked={item.avaliable} 
                  />
                  <p>Avaliable</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default DoctorList;
