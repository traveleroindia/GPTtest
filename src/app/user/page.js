'use client'

import React from 'react';
import { useState, useEffect } from 'react';
import { GoLocation } from "react-icons/go";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { WiTime4 } from "react-icons/wi";
import { BiTrip } from "react-icons/bi";
import { GiPathDistance } from "react-icons/gi";
import { IoCarSportOutline } from "react-icons/io5";
import { GrMoney } from "react-icons/gr";
import { BsExclamationLg } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";


const UserRegistration = () => {

    const [Fare, setFare] = useState({});
    const [Trip, setTrip] = useState({});
    console.log(Trip,Fare);


    useEffect(() => {
        const BookingData = localStorage.getItem("BookingData");
         console.log("Raw BookingData:", BookingData); // Logs the raw string from localStorage
        if (BookingData) {
            const parsedData = JSON.parse(BookingData);
            // console.log("Parsed BookingData:", parsedData); // Logs the parsed object
            let fare = parsedData.Fare;
            let booking = parsedData.Trip;
            setFare(fare || {});
            setTrip(booking || {});
        } else {
            console.warn("No BookingData found in localStorage.");
        }
    }, []);





    return (
        <div>
           <section className="bg-white dark:bg-gray-900">
    <div className="container px-6 py-12 mx-auto">
        <div className="lg:flex lg:items-center lg:-mx-6">
            <div className="lg:w-1/2 lg:mx-6">
                <h1 className="text-2xl font-semibold text-gray-800 capitalize dark:text-white lg:text-3xl">
                    Your Ride Informations
                </h1>

                <div className="mt-6 space-y-8 md:mt-8">
                    {/* ===================================================================  Data Map */}
                    <ul className="text-gray-700 truncate w-72 dark:text-gray-400">
                        <li className='mb-3'><GoLocation className="w-4 h-4 mx-2 text-[--c1] inline-block"  /><strong>From</strong> : {Trip.OriginInformation?.address || 'N/A'}</li>
                        <li className='mb-3'><GoLocation className="w-4 h-4 mx-2 text-[--c1] inline-block"  /><strong>To</strong> : {Trip.Destinationformation?.address || 'N/A'}</li>
                        <li className='mb-3'><HiOutlineCalendarDateRange className="w-4 h-4 mx-2 text-[--c1] inline-block"  /><strong>Pickup</strong> : {Trip.TripDate}</li>
                        <li className='mb-3'><WiTime4 className="w-4 h-4 mx-2 text-[--c1] inline-block"  /><strong>Time</strong> : {Trip.pickupTime}</li>
                        {Trip.ReturnPickupDate && <li className='mb-3'><HiOutlineCalendarDateRange className="w-4 h-4 mx-2 text-[--c1] inline-block"  /><strong>Return</strong>: {Trip.ReturnPickupDate}</li>}
                        <li className='mb-3'><BiTrip className="w-4 h-4 mx-2 text-[--c1] inline-block"  /><strong>Trip</strong> : {(Trip.RideTypeOption === "")? Trip.tripType : Trip.RideTypeOption} </li>
                        <li className='mb-3'><GiPathDistance className="w-4 h-4 mx-2 text-[--c1] inline-block"  /><strong>Distance</strong> : {Fare.baseKM} Km.</li>
                        <li className='mb-3'><IoCarSportOutline className="w-4 h-4 mx-2 text-[--c1] inline-block"  /><strong>Vehicle</strong> : {Fare.vehicle } </li>
                        <li className='mb-3 pr-2 text-center inline-block '><GrMoney className="w-4 h-4 mx-2 text-[--c1] inline-block"  /><strong>Fare</strong> : <strong className='text-2xl font-bold'>{Fare.fare }</strong></li>
                        <li>more info.</li>
                        <li className='mt-4 py-2 px-4 inline-block border border-[--c1] rounded-lg cursor-pointer'><BsSearch className="w-4 h-4 mx-2 text-[--c1] inline-block"/>Search Again</li>
                    </ul>
                </div>


            </div>

            <div className="mt-8 lg:w-1/2 lg:mx-6">
                <div
                    className="w-full px-8 py-10 mx-auto overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-gray-900 lg:max-w-xl shadow-gray-300/50 dark:shadow-black/50">
                    <h1 className="text-lg font-medium text-gray-700">What do you want to ask</h1>

                    <form className="mt-6">
                        <div className="flex-1">
                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full Name</label>
                            <input type="text" placeholder="John Doe" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div className="flex-1 mt-6">
                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                            <input type="email" placeholder="johndoe@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                       

                        <button className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            get in touch
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
        </div>
    );
}

export default UserRegistration;


