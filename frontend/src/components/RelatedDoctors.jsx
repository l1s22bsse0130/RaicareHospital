import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ docId, speciality }) => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);
    const [relDoc, setRelDoc] = useState([]);

    useEffect(() => {
        if (doctors.length > 0 && speciality) { // Corrected "length" typo
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId); // Corrected the ID comparison
            setRelDoc(doctorsData);
        }
    }, [doctors, speciality, docId]);

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>Book your appointment easily with trusted doctors.</p>
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {relDoc.slice(0, 5).map((item, index) => (
                    <div 
                        onClick={() => {navigate(`/appoinment/${item._id}` ); scrollTo(0,0) }} 
                        className='border border-blue-200 overflow-hidden rounded-xl cursor-pointer hover:translate-y-[-10px] transition-all duration-500' 
                        key={index}>
                        <img className='bg-blue-50 h-5 w-5' src={item.image} alt={item.name} />
                        <div className='p-4'>
                        <div className='flex items-center text-center gap-2 text-sm '>
                                <p className={`w-2 h-2 rounded-full ${item.avaliable?'bg-green-500':'bg-gray-600'}`}></p>
                                {
                                    item.avaliable
                                    ? <p className='text-green-500'>Available</p>
                                    :<p className='text-gray-600'>Not avaliable</p>
                                }
                               
                            </div>
                            <p className='text-gray-900 font-medium text-lg'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => { navigate(`/doctors`); window.scrollTo(0, 0); }} className='bg-blue-50 text-gray-600 px-12 py-3 text-lg font-medium rounded-full mt-10 hover:scale-105 transition-all duration-200'>
                more
            </button>
        </div>
    );
};

export default RelatedDoctors;
