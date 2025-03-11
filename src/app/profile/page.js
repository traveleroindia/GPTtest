'use client'

import React from 'react';
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { BsFillPhoneFill } from "react-icons/bs";
import { BsCalendarDateFill } from "react-icons/bs";
import { IoPhonePortrait } from "react-icons/io5";
import { IoMdArrowRoundUp } from "react-icons/io";
import { IoMdArrowRoundDown } from "react-icons/io";
import { PiClockCountdownFill } from "react-icons/pi";
import { HiHome } from "react-icons/hi2";
import { HiHomeModern } from "react-icons/hi2";
import { ImLocation2 } from "react-icons/im";
import { PiRoadHorizonFill } from "react-icons/pi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { RiDiscountPercentFill } from "react-icons/ri";
import { BiSolidTrafficBarrier } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import { IoCloseCircle } from "react-icons/io5";
import useOnclickOutside from "react-cool-onclickoutside";
import { useState,useRef } from 'react';

import { useAuth } from '../components/providers/userProvider';


const dateClass = ' flex items-center gap-2 bg-blue-200 px-4 py-2 rounded-full mr-4 font-semibold text-gray-800  text-md shadow-xl w-fit'

const Page = () => {
    const [show,setShow]=useState(false);    
    const ref = useRef();  

   let { userDetails } = useAuth();
   console.log(userDetails);
        

   
const menuref = useOnclickOutside(()=>{
    setShow(false)
    console.log(show);
    
})


    return (
        <div className='w-full dark:bg-[--dark] flex items-start justify-center flex-col md:flex-row   '>
            {/* =========================================================== Profile Sidebar */}
            <div className=' md:w-1/3 md:h-[90vh]  border-r border-gray-600'>
                <div> <img src="https://random-image-pepebigotes.vercel.app/api/random-image" alt="" /> </div>
                <h2 className='text-4xl font-bold uppercase  text-center pt-4'>{userDetails.name}</h2>
                <div className='flex justify-center gap-10 py-3 text-xl border-b  border-gray-600 '><span className='flex justify-start w-max items-center'><FaUser className='mr-2  ' />User ID : </span><p>{userDetails.userId}</p></div>

                <div className='px-4 py-10 text-base border-b  border-gray-600'>
                    <div className='flex justify-between gap-10 pt-3 '><span className='flex justify-start w-max items-center'><MdEmail className='mr-2 ' />Email : </span><p className=' whitespace-nowrap'>{userDetails.email}</p></div>
                    <div className='flex justify-between gap-10 pt-3 '><span className='flex justify-start w-max items-center'><BsFillPhoneFill className='mr-2 ' />Phone : </span><p>{userDetails.phone}</p></div>
                    <div className='flex justify-between gap-10 pt-3 '><span className='flex justify-start w-max items-center'><BsCalendarDateFill className='mr-2 ' />Member Since : </span><p>20/01/2024</p></div>
                    <div className='flex justify-between gap-10 pt-3 '><span className='flex justify-start w-max items-center'><IoPhonePortrait className='mr-2 ' />Alternate Number : </span><p>{userDetails.alt_phone}</p></div>

                </div>
            </div>

            {/* =========================================================== Booking Details */}
            <div className='w-full flex-col flex align-top justify-start  antialiased  '>
                <h2 className='text-2xl md:py-10 border-b border-gray-600 p-5 ' >Your Bookings</h2>
                <div className='flex flex-col border-b border-gray-600'>
                    <div className=' my-6 flex items-center md:flex-row flex-col '>
                        <img width={400} src="https://shivamautozone.com/wp-content/uploads/2024/09/wagonr-black-bluise-1.png" alt="booked vehicle" />
                       {/* ==============================  Trip Date Time */}
                       <div className="flex flex-col">
                        

                        <div className='flex flex-col relative'> 
                            <p className='font-bold text-xl flex md:flex-row  relative flex-col items-center gap-3'>Booking Date : 28/02/2025 <span className={ `text-xs bg-teal-200 ${dateClass}`}> Booking ID : 34</span> <span className={ `text-xs bg-amber-200 ${dateClass}`}>One Way Trip</span>
                            <span className={ `text-xs bg-green-200 ${dateClass}`}>Confirmed</span><CiMenuKebab className='p-2 absolute right-0   top-11 md:top-0 w-11 h-11 rounded-md bg-neutral-300 shadow-sm cursor-pointer dark:bg-neutral-700 hover:bg-neutral-500 dark:hover:bg-neutral-900 hover:text-white transition duration-500' onClick={() => setShow(!show)}/>
                           </p>
                            <p className= {`text-3xl mt-4 ${dateClass}`}><RiMoneyRupeeCircleFill/>Fare : 2,500</p>
                            <div className='flex gap-4 mt-4 flex-col md:flex-row'><p className= {dateClass}><IoMdArrowRoundUp/>Pickup Date : 01/03/2025</p> <p className={`${dateClass} bg-pink-200`}><PiClockCountdownFill/>Pickup Time: 11:45</p>
                            <p className= {dateClass}><IoMdArrowRoundDown/>Return Date : 04/03/2025</p>
                             </div>
                             {show &&
                             <ul className='absolute right-0 top-0 dark:bg-[--dark]  p-4  shadow-xl dark:border border-gray-600 rounded-lg bg-[--light]  transition duration-500' ref={menuref}>
                                <IoCloseCircle className='absolute -right-4 -top-4 w-7 h-7' onClick={()=>setShow(false)}/>
                                <li className='hover:scale-95 border-gray-500 cursor-pointer bg-blue-300 shadow-xl rounded-full mb-2 px-3 py-1 text-center transition-all duration-400  text-gray-800 border border-transparent'>Make Advance Payment</li>
                                <li className='hover:scale-95 border-gray-500 cursor-pointer bg-orange-300 shadow-xl rounded-full mb-2 px-3 py-1 text-center transition-all duration-400  text-gray-800 border border-transparent'>Request Changes</li>
                                <li className='hover:scale-95 border-gray-500 cursor-pointer bg-red-300 shadow-xl rounded-full mb-2 px-3 py-1 text-center transition-all duration-400  text-gray-800 border border-transparent'>Cancel Ride</li>

                             </ul>
}
                        </div>
                       {/* ==============================  Trip Route and Fares */}
                            <div className='flex  justify-between mt-5 md:flex-row flex-col'>
                            <div>
                                <p className='font-bold text-lg mb-2 gap-2 flex items-center'><HiHome/>Form : <span className='font-light text-gray-600 '>Delhi , IGI Airport terminal 3</span></p> 
                               <p className='font-bold text-lg mb-2 gap-2 items-center flex'><HiHomeModern/>To : <span className='font-light text-gray-600 '>Delhi , IGI Airport terminal 3</span></p> 
                               <p className='font-bold text-lg mb-2 gap-2 items-center flex'><PiRoadHorizonFill/>Distance : <span className='font-light text-gray-600 '>250km</span></p> 
                               <p className={`font-bold text-lg mb-2 gap-2 items-center flex w-fit`}><ImLocation2 />Route : <span className='font-light text-gray-600 '>Click to View your Route</span></p> 
                                </div>
                                <div>
                                <p className='font-bold text-lg mb-2 gap-2 flex items-center'><RiMoneyRupeeCircleFill/>Fare : <span className=' text-xl text-gray-600 '>3,000</span></p> 
                               <p className='font-bold text-lg mb-2 gap-2 items-center flex'><RiDiscountPercentFill/>Discount : <span className='font-light text-gray-600 '>230</span></p> 
                               <p className={`font-bold text-lg mb-2 gap-2 items-center flex w-fit`}><BiSolidTrafficBarrier />Tolls : <span className='font-light  text-gray-600 '>Free</span></p> 
                                </div>
                              
                            </div>
                       </div>

                    </div>
                </div>

            </div>

        </div>
    )
};


export default Page;
