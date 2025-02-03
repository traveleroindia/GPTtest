import React from 'react';
import { GoLocation } from "react-icons/go";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { WiTime4 } from "react-icons/wi";
import { BiTrip } from "react-icons/bi";
import { GiPathDistance } from "react-icons/gi";
import { IoCarSportOutline } from "react-icons/io5";
import { GrMoney } from "react-icons/gr";
import { BsExclamationLg } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';



const FinalBookingInfo = () => {


    const router = useRouter();
    const [Fare, setFare] = useState({});
    const [Trip, setTrip] = useState({});
    console.log(Trip,Fare);

   const goBAcktoHomepage=()=>{
    router.push('/'); // Navigate to the homepage
    localStorage.setItem("BookingData","");
    localStorage.setItem("RidesSearched",'');
     console.log("Bck btn Pushed");
   }
 
   useEffect(() => {
    const RIdeSearched =  localStorage.getItem("RidesSearched")
    if (!RIdeSearched) {
        // Redirect to the homepage if RidesSearched is not found
        router.push('/');
        console.log("Redirecting to homepage because no rides were searched.");
    } else {
        const BookingData = localStorage.getItem("BookingData");
        if (BookingData) {
            try {
                const parsedData = JSON.parse(BookingData);
                setFare(parsedData.Fare || {});
                setTrip(parsedData.Trip || {});
            } catch (e) {
                console.error("Error parsing BookingData", e);
            }
        }
     }   
   
}, []);


    return (
        <div>
              <ul className="text-gray-700 truncate w-72 dark:text-gray-400">
                        <li className='mb-3'><GoLocation className="w-4 h-4 mx-2 text-[--c1] inline-block"  /><strong>From</strong> : {Trip.OriginInformation?.address || 'N/A'}</li>
                        <li className='mb-3'><GoLocation className="w-4 h-4 mx-2 text-[--c1] inline-block"  /><strong>To</strong> : {Trip.Destinationformation?.address || 'N/A'}</li>
                        <li className='mb-3'><HiOutlineCalendarDateRange className="w-4 h-4 mx-2 text-[--c1] inline-block"  /><strong>Pickup</strong> : {Trip.TripDate}</li>
                        <li className='mb-3'><WiTime4 className="w-4 h-4 mx-2 text-[--c1] inline-block"  /><strong>Time</strong> : {Trip.pickupTime}</li>
                        {Trip.ReturnPickupDate && <li className='mb-3'><HiOutlineCalendarDateRange className="w-4 h-4 mx-2 text-[--c1] inline-block"  /><strong>Return</strong>: {Trip.ReturnPickupDate}</li>}
                        <li className='mb-3'><BiTrip className="w-4 h-4 mx-2 text-[--c1] inline-block"  /><strong>Trip</strong> : {Trip.Booking} </li>
                        <li className='mb-3'><GiPathDistance className="w-4 h-4 mx-2 text-[--c1] inline-block"  /><strong>Distance</strong> : {Fare.fareDistance} Km.</li>
                        <li className='mb-3'><IoCarSportOutline className="w-4 h-4 mx-2 text-[--c1] inline-block"  /><strong>Vehicle</strong> : {Fare.vehicle } </li>
                        <li className='mb-3 pr-2 text-center inline-block '><GrMoney className="w-4 h-4 mx-2 text-[--c1] inline-block"  /><strong>Fare</strong> : <strong className='text-2xl font-bold'>{Fare.finalFare }</strong> Discount : {Fare.discount}</li>
                        <li>more info.</li>
                        <li className='mt-4 py-2 px-4 inline-block border border-[--c1] rounded-lg cursor-pointer hover:scale-95 transition-all' onClick={goBAcktoHomepage}><BsSearch className="w-4 h-4 mx-2 text-[--c1] inline-block" />Search Again</li>
                    </ul>
        </div>
    );
}

export default FinalBookingInfo;
