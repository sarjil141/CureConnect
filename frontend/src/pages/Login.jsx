import React, { useState } from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const {backendUrl,token,setToken} = useContext(AppContext)
  const navigate = useNavigate()

const [state,setState]= useState('Sign Up');

const [email,setEmail] = useState('')
const [password,setPassword] =useState('')
const [name,setName]= useState('')

const onSubmitHandler = async (event) => {
  event.preventDefault()
  try {
    
    if (state === 'Sign Up') {
        const {data} = await axios.post(backendUrl+ '/api/user/register', {name,password,email})

        if(data.success)
        {
          localStorage.setItem('pendingEmail', email);
        toast.success('Signup successful! Please verify your email.');
         navigate('/otp-verification');
        }
        else
        {
          toast.error(data.message)
        }

    }
    else
    {
      const {data} = await axios.post(backendUrl+ '/api/user/login', {password,email})

        if(data.success)
        {
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }
        else
        {
          toast.error(data.message)
        }
      }

  } catch (error) {
    toast.error(error.message)
  }
}

  useEffect(()=>{
    if(token)
    {
      navigate('/')
    }
  },[token])

  return (
   <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-white">
    <form onSubmit={onSubmitHandler} className="w-full flex justify-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl text-zinc-700 text-sm shadow-2xl">
        <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 mb-2">{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p className="mb-2">Please {state === 'Sign Up' ? 'create account' : 'log in'} to book appointment</p>
        {
          state === 'Sign Up' &&
          <div className='w-full'>
          <p>Full Name</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1 bg-white/80' type="text" onChange={(e)=>setName(e.target.value)} value={name} required/>
          </div>
        }
        
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1 bg-white/80' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1 bg-white/80' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required/>
        </div>
        {
          state === 'Login' && (
            <p className="w-full text-right">
              <span
                className="text-blue-500 underline cursor-pointer"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </span>
            </p>
          )
        }
        <button type='submit' className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white w-full py-2 rounded-md text-base font-semibold shadow-md hover:scale-105 transition-transform'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
        {
          state === 'Sign Up'
          ? <p>Already have an account? <span onClick ={()=>setState('Login')} className='text-blue-500 underline cursor-pointer'>Login here</span> </p>
          : <p>Create an new account? <span onClick ={()=>setState('Sign Up')} className='text-blue-500 underline cursor-pointer'>Click here</span> </p>
        }
      </div>
    </form>
   </div>
  )
}

export default Login