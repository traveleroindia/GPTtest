'use client';
import LoggedInUser from './loggedInUser';
import React, { useState, useEffect } from 'react';
import FinalBookingInfo from '../components/bookings/finalBookingInfo';
import { useAuth } from '../components/providers/userProvider';
import SubmitBooking from './submitBooking'

const UserRegistration = () => {
    const { userDetails } = useAuth();

    const [isNewUser, setIsNewUser] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formFilled, setFormFilled] = useState(null);

    useEffect(() => {
        setFormFilled(localStorage.getItem("RidesSearched"));

    }, []);




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const apiUrl = isNewUser ? '/API/users/addUser' : '/API/users/userlogin'; // Adjust according to your API routes

        const payload = isNewUser ? {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password
        } : {
            email: formData.email, // Assuming email or phone is used for login
            password: formData.password
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                // Handle response errors
                const errorData = await response.json();

                throw new Error(`${errorData.error}`);
                console.log(errorData.error);
            }
            const data = await response.json();
            console.log(data);

        } catch (error) {

            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-12 mx-auto">
                    <div className="lg:flex lg:items-center justify-center lg:-mx-6">
                        <div className="lg:w-1/2 lg:mx-6">
                            <div className="mt-6 space-y-8 md:mt-8">
                                {/* Info Section */}
                                {formFilled === 'Yes' ? (
                                    <div className='p-4'>
                                        <h1 className="text-2xl font-semibold text-gray-800 capitalize dark:text-white lg:text-3xl mb-5">
                                            Your Ride Informations
                                        </h1>
                                        <FinalBookingInfo />
                                    </div>
                                ) : (
                                    <img src="images/login.png" alt="Login" width={400} height={400} />
                                )}
                            </div>
                        </div>

                        {userDetails !== null ? <LoggedInUser /> :

                            <div className="mt-8 lg:w-1/2 lg:mx-6  ">
                                <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-gray-900 lg:max-w-xl shadow-gray-300/50 dark:shadow-black/50">
                                    <h1 className="text-lg font-medium text-gray-700">{isNewUser ? "Register & Book Now" : "Login & Book Now"} </h1>

                                    {/* Tabs for New User and Existing User */}
                                    <div className="flex justify-around mt-4 ">
                                        <button
                                            onClick={() => setIsNewUser(true)}
                                            className={`px-4 py-2 w-1/2 ${isNewUser ? 'bg-[--c1] text-white shadow-inner' : 'shadow-md bg-gray-600 text-gray-300'} rounded-l-lg  focus:outline-none`}
                                        >
                                            New User
                                        </button>
                                        <button
                                            onClick={() => setIsNewUser(false)}
                                            className={`px-4 py-2 w-1/2 ${!isNewUser ? 'bg-[--c1] text-white shadow-inner' : 'bg-gray-600 text-gray-300 shadow-md'} rounded-r-lg focus:outline-none`}
                                        >
                                            Existing User
                                        </button>
                                    </div>

                                    <form className="mt-6 transition-transform duration-1000" onSubmit={handleSubmit}>
                                        {isNewUser ? (
                                            <>
                                                <div className="flex-1">
                                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        placeholder="John Doe"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                                        required
                                                    />
                                                </div>

                                                <div className="flex-1 mt-6">
                                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                                                    <input
                                                        required
                                                        type="email"
                                                        name="email"
                                                        placeholder="johndoe@example.com"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                                    />
                                                </div>

                                                <div className="flex-1 mt-6 ">
                                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Phone Number
                                                        <span className='text-xs text-green-500 ml-3'>Required for Pickup</span>
                                                    </label>
                                                    <input
                                                        required
                                                        type="tel"
                                                        name="phone"
                                                        placeholder="98xxxxxxxxx"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                                    />
                                                </div>

                                                <div className="flex-1 mt-6 ">
                                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password

                                                    </label>
                                                    <input
                                                        required
                                                        type="password"
                                                        name="password"
                                                        placeholder="xxxxxxxx"
                                                        value={formData.password}
                                                        onChange={handleInputChange}
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
                                                        name="email"
                                                        placeholder="Phone or Email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                                    />
                                                </div>

                                                <div className="flex-1 mt-6">
                                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        placeholder="Your Password"
                                                        value={formData.password}
                                                        onChange={handleInputChange}
                                                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                                        required
                                                    />
                                                </div>
                                            </>
                                        )}

                                        <button
                                            type="submit"
                                            className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[--c1] rounded-md hover:bg-green-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                            disabled={loading}
                                        >
                                            {loading ? 'Loading...' : (isNewUser ? 'Register' : 'Log-In')}
                                        </button>

                                        {error && <p className="mt-4 text-red-500">{error}
                                            <span className='ml-2 cursor-pointer' onClick={() => {
                                                setIsNewUser(false);
                                                setFormData({
                                                    name: '',
                                                    email: '',
                                                    phone: '',
                                                    password: ''
                                                });
                                            }}> Try Login or Call Ghodu</span>
                                        </p>}
                                    </form>
                                </div>
                            </div>
                        }

                        {/* <Testing/> */}
                    </div>
                    <SubmitBooking/>
                </div>
            </section>
        </div>
    );
}

export default UserRegistration;