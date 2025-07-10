import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {

    const [state,setState] = useState('Admin')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const {setAToken,backendUrl} =useContext(AdminContext)

    const {setDToken} = useContext(DoctorContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            
            if (state === 'Admin') {
                
                const {data} =await axios.post(backendUrl+'/api/admin/login', {email,password})
                if (data.success) {
                    localStorage.setItem('aToken',data.token)
                    setAToken(data.token)
                }
                else
                {
                    toast.error(data.message)
                }
            }
            else
            {
                const {data} =await axios.post(backendUrl+'/api/doctor/login', {email,password})
                if (data.success) {
                    localStorage.setItem('dToken',data.token)
                    setDToken(data.token)
                    console.log(data.token);
                    
                }
                else
                {
                    toast.error(data.message)
                }
            }

        } catch (error) {
            
        }
    }


  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-white">
      <form onSubmit={onSubmitHandler} className="w-full max-w-md flex justify-center">
        <div className="flex flex-col gap-3 m-auto items-start p-6 min-w-[300px] bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl text-zinc-700 text-sm shadow-2xl">
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 mb-2 m-auto">
            <span>{state}</span> Login
          </p>
          <div className='w-full'>
            <p>Email</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-zinc-300 rounded w-full p-2 mt-1 bg-white/80' type="email" required/>
          </div>
          <div className='w-full'>
            <p>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-zinc-300 rounded w-full p-2 mt-1 bg-white/80' type="password" required/>
          </div>
          <button className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white w-full py-2 rounded-md text-base font-semibold shadow-md hover:scale-105 transition-transform'>Login</button>
          {
            state === 'Admin'
              ? <p>Doctor Login? <span className='text-blue-500 underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>
              : <p>Admin Login? <span className='text-blue-500 underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
          }
        </div>
      </form>
    </div>
  )
}

export default Login