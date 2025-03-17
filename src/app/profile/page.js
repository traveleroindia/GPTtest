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
import { useState, useRef, useEffect } from 'react';
import { ImSpinner } from "react-icons/im";
import { useAuth } from '../components/providers/userProvider';
import { useRouter } from 'next/navigation';
import { MdDirectionsCar } from "react-icons/md";
import useFetchBookings from './fetchBookings';


const dateClass = ' flex items-center gap-2  px-4 py-2 rounded-full mr-4 font-semibold text-gray-800  text-md shadow-xl w-fit'

const Page = () => {

    const {bookings, user,loading, error} = useFetchBookings();
    // console.log(bookings);

    const router = useRouter();
    const [show, setShow] = useState(false);
    const ref = useRef();

    let { userDetails } = useAuth();
    console.log(bookings);



    const menuref = useOnclickOutside(() => {
        setShow(false)
        console.log(show);

    })
    
    useEffect(() => {
        if(userDetails === null){
            router.push('/user'); // Redirect to the user page if the cookie is not present

        }
    }, [userDetails]); // Run this effect on component mount only

    // Show loading spinner while checking userDetails
    if (loading === true) {
        return (
            <div className='w-screen h-screen flex items-center justify-center'> 
                <ImSpinner className='animate-spin text-3xl mr-2'/> Loading...
            </div> 
        );
    }
    return (
        <div className='w-full dark:bg-[--dark] flex items-start justify-center flex-col xl:flex-row   '>
            {/* =========================================================== Profile Sidebar */}
            <div className=' xl:w-1/3 xl:h-[90vh]  '>
                <div> <img src="https://random-image-pepebigotes.vercel.app/api/random-image" alt="" /> </div>
                <h2 className='text-4xl font-bold uppercase  text-center pt-4'>{user.name}</h2>
                <div className='flex justify-center gap-10 py-3 text-xl border-b  border-gray-600 '><span className='flex justify-start w-max items-center'><FaUser className='mr-2  ' />User ID : </span><p>{user.userId}</p></div>

                <div className='px-4 py-10 text-base border-b  border-gray-600'>
                    <div className='flex justify-between gap-10 pt-3 '><span className='flex justify-start w-max items-center'><MdEmail className='mr-2 ' />Email : </span><p className=' whitespace-nowrap'>{user.email}</p></div>
                    <div className='flex justify-between gap-10 pt-3 '><span className='flex justify-start w-max items-center'><BsFillPhoneFill className='mr-2 ' />Phone : </span><p>{user.phone}</p></div>
                    <div className='flex justify-between gap-10 pt-3 '><span className='flex justify-start w-max items-center'><BsCalendarDateFill className='mr-2 ' />Member Since : </span><p>{user.created_at}</p></div>
                    <div className='flex justify-between gap-10 pt-3 '><span className='flex justify-start w-max items-center'><IoPhonePortrait className='mr-2 ' />Alternate Number : </span><p>{user.alt_phone}</p></div>

                </div>
            </div>

            {/* =========================================================== Booking Details */}
            <div className='w-full flex-col flex align-top justify-start  antialiased '>
                <h2 className='text-2xl xl:py-10 border-b border-gray-600 p-5 ' >Your Bookings</h2>
               
               {bookings.map((booking,index) => (
                <div key={index}>
               
                <div className='flex flex-col border-b border-gray-600'>
                    <div className=' my-6 flex items-center xl:flex-row flex-col '>
                        <img width={300} src={booking.imagelink} alt="booked vehicle" />
                        {/* ==============================  Trip Date Time */}
                        <div className="flex flex-col w-full px-7">
                            <div className='flex flex-col relative'>
                                <p className='font-bold text-lg flex xl:flex-row  justify-between relative flex-col items-center gap-3'>Booking Date : {booking.BookingDate} 
                                  
                                    <CiMenuKebab className='p-2 absolute right-0 xl:relative  top-11 xl:top-0 w-11 h-11 rounded-md bg-neutral-300 shadow-sm cursor-pointer dark:bg-neutral-700 hover:bg-neutral-500 dark:hover:bg-neutral-900 hover:text-white transition duration-500' onClick={() => setShow(!show)} />
                                </p>
                                <p className={`text-3xl mt-2 bg-orange-200 ${dateClass}`}><RiMoneyRupeeCircleFill />Fare : {booking.fare}</p>
                                   <div className="flex items-center justify-start mt-4"> 
                                <span className={`text-xs bg-teal-200 ${dateClass}`}> Booking ID : {booking.bookingID}</span> 
                                    <span className={`text-xs bg-amber-200 ${dateClass}`}>{booking.booking_type}</span>
                                    <span className={`text-xs bg-green-200 ${dateClass}`}>{booking.status}</span>
                                    </div>

                                
                                <div className='flex gap-4 mt-4 flex-col xl:flex-row text-md '><p className={`bg-blue-100 ${dateClass}`}><IoMdArrowRoundUp />Pickup Date : {booking.trip_date}</p> <p className={`${dateClass} bg-pink-200`}><PiClockCountdownFill />Pickup Time: 11:45</p>
                                   {(booking.return_pickup_date !== null)&& <p className={dateClass}><IoMdArrowRoundDown />Return Date : {booking.return_pickup_date}</p>}
                                </div>
                                {show &&
                                    <ul className='absolute right-0 top-0 dark:bg-[--dark]  p-4  shadow-xl dark:border border-gray-600 rounded-lg bg-[--light]  transition duration-500' ref={menuref}>
                                        <IoCloseCircle className='absolute -right-4 -top-4 w-7 h-7' onClick={() => setShow(false)} />
                                        <li className='hover:scale-95 border-gray-500 cursor-pointer bg-blue-300 shadow-xl rounded-full mb-2 px-3 py-1 text-center transition-all duration-400  text-gray-800 border border-transparent'>Make Advance Payment</li>
                                        <li className='hover:scale-95 border-gray-500 cursor-pointer bg-orange-300 shadow-xl rounded-full mb-2 px-3 py-1 text-center transition-all duration-400  text-gray-800 border border-transparent'>Request Changes</li>
                                        <li className='hover:scale-95 border-gray-500 cursor-pointer bg-red-300 shadow-xl rounded-full mb-2 px-3 py-1 text-center transition-all duration-400  text-gray-800 border border-transparent'>Cancel Ride</li>
                                    </ul>
                                }
                            </div>
                            {/* ==============================  Trip Route and Fares */}
                            <div className='flex  justify-start mt-5 xl:flex-row flex-col'>
                                <div className="mr-5">
                                    <p className='font-bold text-sm mb-2 gap-2 flex items-center'><HiHome />Form : <span className='font-light  '>{booking.origin_address}</span></p>
                                    <p className='font-bold text-sm mb-2 gap-2 items-center flex'><HiHomeModern />To : <span className='font-light  '>{booking.destination_address}</span></p>
                                    <p className='font-bold text-sm mb-2 gap-2 items-center flex'><PiRoadHorizonFill />Distance : <span className='font-light  '>{booking.km}</span></p>
                                    <p className={`font-bold text-sm mb-2 gap-2 items-center flex w-fit`}><ImLocation2 />Route : <span className='font-light  '> <a href={booking.google_maps_url}></a> Click to View your Route</span></p>
                                </div>
                                <div>
                                <p className='font-bold text-sm mb-2 gap-2 flex items-center'><MdDirectionsCar />Vehicle : <span className=' font-light  '>{booking.vehicle} or Equivalent</span></p>
                                <p className='font-bold text-sm mb-2 gap-2 flex items-center'><RiMoneyRupeeCircleFill />Fare : <span className=' text-xl  '>{booking.fare}</span></p>
                                    <p className='font-bold text-sm mb-2 gap-2 items-center flex'><RiDiscountPercentFill />Discount : <span className='font-light  '>{booking.discount}</span></p>
                                    <p className={`font-bold text-sm mb-2 gap-2 items-center flex w-fit`}><BiSolidTrafficBarrier />Tolls : <span className='font-light   '>{booking.tollCharge}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                </div>
               ))}


            </div>
        </div>
    )
};


export default Page;
