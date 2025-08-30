import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
    const [docImage, setDocImage] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fees, setFees] = useState('');
    const [about, setAbout] = useState('');
    const [speciality, setSpeciality] = useState('General physician');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [avaliable, setAvaliable] = useState(false);

    const { backendUrl, aToken } = useContext(AdminContext);


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (!docImage) {
                return toast.error("Image not selected")
            }
            const formData = new FormData()
            formData.append('image', docImage)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('avaliable', JSON.stringify(avaliable));
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))
            formData.forEach((value, key) => {
                console.log(`${key}:${value}`)

            })
            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message);
                setDocImage(false)
                setName('')
                setEmail('')
                setPassword('')
                setExperience('')
                setAbout('')
                setSpeciality('')
                setFees('')
                setDegree('')
                setAvaliable(false)
                setAddress1('')
                setAddress2('')
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message)
            console.log(error)

        }

    }
    return (
        <form onSubmit={submitHandler} className='w-full'>
            <p className='font-medium mb-3 text-lg'>Add Doctor</p>
            <div className='bg-white px-8  py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-auto'>
                <div className='flex items-center gap-4 mb-8 text-gray-600'>
                    <label htmlFor="doc-img">
                        <img className='bg-gray-100 w-16 rounded-full cursor-pointer' src={docImage ? URL.createObjectURL(docImage) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setDocImage(e.target.files[0])} type="file" id='doc-img' hidden />
                    <p>Upload doctor <br />picture</p>
                </div>
                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-700'>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2 ' type="text" required placeholder='Name' />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2 ' type="email" required placeholder='Email' />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor password</p>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2 ' type="password" required placeholder='Password' />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Experience</p>
                            <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2 ' name="" id="">
                                <option value="1 Year">1</option>
                                <option value="2 Year">2</option>
                                <option value="3 Year">3</option>
                                <option value="4 Year">4</option>
                                <option value="5 Year">5</option>
                                <option value="6 Year">6</option>
                                <option value="7 Year">7</option>
                                <option value="8 Year">8</option>
                                <option value="9 Year">9</option>
                                <option value="10 Year">10</option>
                            </select>
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Fees</p>
                            <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2 ' type="number" required placeholder='Fees' />
                        </div>
                    </div>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Speciality</p>
                            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2 ' name="" id="">
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                            </select>
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Education</p>
                            <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2 ' type="text" required placeholder='Education' />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Address</p>
                            <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2 ' type="text" required placeholder='address 1' />
                            <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2 ' type="text" required placeholder='address 2' />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor Available</p>
                            <select onChange={(e) => setAvaliable(e.target.value === 'true')} value={avaliable} className='border rounded px-3 py-2'>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                    </div>
                </div>

                <div>
                    <p className='mt-4 mb-2'>About Doctor</p>
                    <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full border rounded px-4 pt-2' required placeholder='write about doctor' rows={5} />
                </div>
                <button type='submit' className='bg-primary px-10 py-3 mt-4 border rounded-full text-white'>Add doctor</button>
            </div>

        </form>
    )
}

export default AddDoctor
