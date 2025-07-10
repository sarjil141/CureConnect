import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="w-full py-8 mt-8 bg-gradient-to-r from-blue-100 via-blue-200 to-purple-100 rounded-lg px-6 md:px-10 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-6 my-4 text-sm'>

            {/* ------- left section -------- */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-0 mb-1">
                  <img src={assets.logo_1} alt="App Logo" className="w-10 h-10" />
                  <span className="text-xl font-extrabold text-blue-900">CureConnect</span>
                </div>
                <p className='w-full md:w-2/3 text-gray-600 leading-6 mt-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
            {/* ------- center section -------- */}
            <div className="flex flex-col gap-1">
                <p className='text-xl font-medium mb-1 mt-0'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            {/* ------- right section -------- */}
            <div className="flex flex-col gap-1">
                <p className='text-xl font-medium mb-1 mt-0'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91-234-567-8900</li>
                    <li>sarjil@gmail.com</li>
                </ul>
            </div>
        </div>
           
          
        
    </footer>
  )
}

export default Footer