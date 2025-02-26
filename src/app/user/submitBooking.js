import React, { useState,useEffect } from 'react';
import {useAuth } from '../components/providers/userProvider';

const SubmitBooking = () => {
    const [booking , setBooking] = useState(false);
    const {userDetails} = useAuth();
useEffect(() => {
 setBooking(localStorage.getItem("RidesSearched"));
   
}, []);


    return (
        (userDetails && booking === 'Yes') &&
        <div className='flex justify-center p-4'>
            <button className='p-3 md:px-16 md:text-xl shadow-md md:py-4 bg-[--c1] rounded-md text-[--dark] font-semibold uppercase hover:dark:bg-gray-200 hover:dark:text-gray-800 hover:bg-slate-800 hover:text-gray-200 transition duration-500'>Submit Booking Request</button>
        </div>
    
    );
}

export default SubmitBooking;
