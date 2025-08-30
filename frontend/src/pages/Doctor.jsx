import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctor = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const applyFilterDoc = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilterDoc();
  }, [speciality, doctors]);

  return (
    <div className='m-4'>
      <p className='text-gray-600 text-xl mx-3'>Browse through the doctors by speciality</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        {/* Speciality List */}
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        <div className={`flex flex-col text-sm text-gray-600 gap-4 ${showFilter ? "flex" : "hidden sm:flex"}`}>
          <p onClick={() => speciality === 'Dermatologist' ? navigate("/doctors") : navigate("/doctors/Dermatologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
          <p onClick={() => speciality === 'General physician' ? navigate("/doctors") : navigate("/doctors/General physician")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>General physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate("/doctors") : navigate("/doctors/Gynecologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate("/doctors") : navigate("/doctors/Pediatricians")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate("/doctors") : navigate("/doctors/Neurologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate("/doctors") : navigate("/doctors/Gastroenterologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>
        </div>

        {/* Doctor Cards */}
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
            <div onClick={() => navigate(`/appoinment/${item._id}`)} className='border border-blue-200 overflow-hidden rounded-xl cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
              <img className='bg-blue-50' src={item.image} alt={item.name} />
              <div className='p-4'>
                <div className='flex items-center text-center gap-2 text-sm '>
                  <p className={`w-2 h-2 rounded-full ${item.avaliable ? 'bg-green-500' : 'bg-gray-600'}`}></p>
                  {
                    item.avaliable
                      ? <p className='text-green-500'>Available</p>
                      : <p className='text-gray-600'>Not avaliable</p>
                  }

                </div>
                <p className='text-gray-900 font-medium text-lg'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctor;
