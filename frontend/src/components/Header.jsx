import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='bg-gradient-to-r from-blue-200 via-blue-400 to-purple-400 rounded-lg flex flex-col md:flex-row flex-wrap px-6 md:px-10 lg:px-20'>
        {/* {Left side}  */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <p className='text-3xl md:text-4xl lg:text-5xl text-purple-800 font-bold leading-tight md:leading-tight lg:leading-tight drop-shadow'>
                Book Appointment <br/>
                <span className='text-blue-700 font-extrabold'>With Trusted Doctors</span>
            </p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-blue-900 text-sm font-light'>
                <img className='w-20' src={assets.group_profiles} alt="" />
                <div className='flex flex-col'>
                  <span>Simply browse through our extensive list of trusted doctors,</span>
                  <span>schedule your appointment hassle-free.</span>
                </div>
            </div>
            <a href="#speciality" className='flex items-center gap-2 bg-purple-600 px-8 py-3 rounded-full text-white text-sm m-auto md:m-0 hover:bg-blue-500 hover:scale-105 transition-all duration-300 shadow-lg'>
                Book appointment <img className='w-3' src={assets.arrow_icon} alt="" />
            </a>
        </div>
        {/* {Right side} */}
        <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg shadow-xl' src={assets.header_img} alt="" />
        </div>
    </div>
  )
}

export default Header