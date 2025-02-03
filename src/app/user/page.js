'use client'

import React from 'react';

import FinalBookingInfo from '../components/bookings/finalBookingInfo'
import { useState } from 'react';


const UserRegistration = () => {

    const [isNewUser, setIsNewUser] = useState(true);






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
                  <FinalBookingInfo/>
                </div>


            </div>

            <div className="mt-8 lg:w-1/2 lg:mx-6">
            <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-gray-900 lg:max-w-xl shadow-gray-300/50 dark:shadow-black/50">
                <h1 className="text-lg font-medium text-gray-700">`{isNewUser ? "Register & Book Now" : "Login & Book Now"}` </h1>
                
                {/* Tabs for New User and Existing User */}
                <div className="flex justify-around mt-4">
                    <button 
                        onClick={() => setIsNewUser(true)} 
                        className={`px-4 py-2 w-1/2 ${isNewUser ? 'bg-[--c1] text-white' : ' bg-gray-600 text-gray-300'} rounded-l-lg  focus:outline-none`}
                    >
                        New User
                    </button>
                    <button 
                        onClick={() => setIsNewUser(false)} 
                        className={`px-4 py-2 w-1/2   ${!isNewUser ? 'bg-[--c1] text-white' : ' bg-gray-600 text-gray-300'} rounded-r-lg focus:outline-none`}
                    >
                        Existing User
                    </button>
                </div>

                <form className="mt-6">
                    {isNewUser ? (
                        <>
                            <div className="flex-1">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="John Doe" 
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                />
                            </div>

                            <div className="flex-1 mt-6">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                                <input 
                                required
                                    type="email" 
                                    placeholder="johndoe@example.com" 
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                />
                            </div>

                            <div className="flex-1 mt-6 ">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Phone Number 
                                    <span className='text-xs text-green-500 ml-3' >Required for Pickup</span>
                                </label>
                                <input 
                                required
                                    type="phone" 
                                    placeholder="98xxxxxxxxx" 
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex-1">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Phone Number / Email</label>
                                <input 
                                    type="text" 
                                    placeholder="Phone or Email" 
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                />
                            </div>

                            <div className="flex-1 mt-6">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Your Password" 
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                />
                            </div>
                        </>
                    )}

                    <button className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[--c1] rounded-md hover:bg-green-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"> 
                        {isNewUser ? 'Register & Book' : 'Log In & Book'}
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


