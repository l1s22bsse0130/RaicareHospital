import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify'; // Correct import
import 'react-toastify/dist/ReactToastify.css'; // Import styles for toast notifications
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { token, setToken, backendUrl } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message); // Show error message with toast
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message); // Show error message with toast
        }
      }
    } catch (error) {
      toast.error(error.message); // Show error message with toast
    }
  };
  useEffect(() => {
    if(!token){
      navigate('/login');
    }else{
      navigate('/')
    }
  
  
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='flex min-h-[80vh] items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === "Sign Up" ? "Create Account" : "Login"}</p>
        <p>Please {state === "Sign Up" ? "sign up" : "log in"} to book appointment</p>
        {state === 'Sign Up' && (
          <div className='w-full'>
            <p>Full Name</p>
            <input
              className='border border-zinc-300 w-full rounded p-2 mt-1'
              type="text"
              onChange={(e) => setName(e.target.value)} // Fix onChange
              value={name}
            />
          </div>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input
            className='border border-zinc-300 w-full rounded p-2 mt-1'
            type="email"
            onChange={(e) => setEmail(e.target.value)} // Fix onChange
            value={email}
          />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input
            className='border border-zinc-300 w-full rounded p-2 mt-1'
            type="password"
            onChange={(e) => setPassword(e.target.value)} // Fix onChange
            value={password}
          />
        </div>
        <button type='submit' className='bg-primary text-white py-2 w-full text-base rounded-md'>
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>Already have an account? 
            <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>
              Login here
            </span>
          </p>
        ) : (
          <p>Don't have an account? 
            <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>
              Create one here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
