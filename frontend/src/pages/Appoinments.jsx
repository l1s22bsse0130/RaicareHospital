import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointments = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, currencySymbol, token, backendUrl, getDoctorData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = () => {
    const foundDoc = doctors.find(doc => doc._id === docId);
    setDocInfo(foundDoc);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  const getAvaliableSlots = () => {
    setDocSlots([]);
    
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;
        
        const isSlotAvaliable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

        // Check if the slot is expired
        const isExpired = currentDate < new Date(); // Compare with current time
        if (isSlotAvaliable && !isExpired) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
            day: daysOfWeek[currentDate.getDay()],
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppoinment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate('/login');
    }
    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(backendUrl + '/api/user/book-appoinment', { docId, slotDate, slotTime }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getDoctorData();
        navigate('/myappoinments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (docInfo) {
      getAvaliableSlots();
    }
  }, [docInfo]);

  return docInfo && (
    <div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          {/* Doctor details */}
          <img className="bg-primary w-full sm:w-72 rounded-lg" src={docInfo.image} alt="" />
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white sm:mx-0 mt-[-80px] sm:mt-0">
          {/* Doctor info degree experience */}
          <p className="flex items-center gap-2 font-medium text-gray-900 text-2xl">
            {docInfo.name} <img className="w-5" src={assets.verified_icon} alt="" />
          </p>
          <div className="flex text-center gap-2 mt-1 text-gray-600">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className="py-0.5 px-2 border rounded-full text-xs">{docInfo.experience}</button>
          </div>
          <div>
            {/* doctor about */}
            <p className="flex text-center gap-1 text-sm mt-3 font-medium text-gray-900">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-700 max-w-[700] mt-1">{docInfo.about}</p>
          </div>
          <p className="font-medium text-gray-600 mt-5">
            Appointment fee: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>
      
      {/* ------- Booking slots -------- */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-600 m-4">
        <p className="font-medium text-2xl">Booking slots</p>
        <div className="flex gap-3 items-center w-full mt-4 overflow-x-scroll">
          {
            docSlots.length && docSlots.map((item, index) => {
              return (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center cursor-pointer min-w-16 py-6 rounded-full ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}
                  key={index}
                >
                  <p>{item[0] && item[0].day}</p> {/* Only show day if the slot is not expired */}
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              );
            })
          }
        </div>
        <div className="flex gap-3 items-center w-full mt-4 overflow-x-scroll">
          {docSlots.length && docSlots[slotIndex].map((item, index) => {
            return (
              <p
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}
                key={index}
              >
                {item.time.toLowerCase()}
              </p>
            );
          })}
        </div>
        <button onClick={bookAppoinment} className="bg-primary text-white text-sm font-light rounded-full px-14 py-3 my-6">
          Book an appointment
        </button>
      </div>
      {/* ---- listing related doctors ------ */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointments;
