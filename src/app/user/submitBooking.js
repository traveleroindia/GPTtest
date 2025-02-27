import React, { useState,useEffect } from 'react';
import {useAuth } from '../components/providers/userProvider';
import { FaSpinner } from 'react-icons/fa';

const SubmitBooking = () => {
    const [booking , setBooking] = useState(false);
    const [TripData, setTripData] = useState({});
    const [FareData, setFareData] = useState({});
    const {userDetails} = useAuth();
    const [bookingConfirm , setBookingConfirm] = useState()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

useEffect(() => {
    const bookingData = localStorage.getItem("BookingData");

if(bookingData && userDetails){
    setBooking(localStorage.getItem("RidesSearched"));
    const PickupDate = localStorage.getItem("TripDate");
    const returnPick = localStorage.getItem("ReturnPickup");
    const parsedData = JSON.parse(bookingData);
    setFareData(parsedData.Fare || {});
const Booking = parsedData.Trip || {}
                setTripData({
                    booking_type : Booking.Booking,
                    time_duration : Booking.Time,
                    trip_date : PickupDate,
                    pickup_time : Booking.pickupTime,
                    return_pickup_date: returnPick,
                    user_id : userDetails.userId ,
                    google_maps_url : Booking.googleMapsUrl,
                    destination_address:Booking.Destinationformation?.address || 'N/A',
                    destination_lat:Booking.Destinationformation?.lat || 'N/A',
                    destination_lng : Booking.Destinationformation?.lng || 'N/A',
                    origin_address:Booking.OriginInformation?.address || 'N/A',
                    origin_lat : Booking.OriginInformation?.lat || 'N/A',
                    origin_lng :Booking.OriginInformation?.lng || 'N/A',

                });
            }
  
}, [userDetails]);


const PostBooking = async () => {
    // Log trip data (for debugging)
    console.log(TripData);

    const data = {
        userId: userDetails.userId,
        bookingDetails: TripData,
        fareDetails: FareData,
    };

    try {
        setLoading(true); // Start loading
        // Making the POST request
        const response = await fetch('/API/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify that the content is JSON
            },
            body: JSON.stringify(data), // Convert your data to JSON format
        });

        // Check if the response is OK
        if (!response.ok) {
            const errorData = await response.json(); // Await the JSON parsing
            throw new Error(errorData.error || 'Network response was not ok'); // Conditional error message
        }

        if (response.status === 201) {
            setBookingConfirm('Your Booking has been created. You will receive a confirmation email from us on your registered E-mail Address.');
            // localStorage.clear('BookingData');
            // localStorage.clear("RidesSearched");
        }
        
        return await response.json(); // Await the JSON parsing for successful response
    } catch (error) {
        setError(error.message);
        console.log(error.message);
    } finally {
        setLoading(false); // Stop loading
    }
};






    return (
        (userDetails && booking === 'Yes') &&
        <div className='flex justify-center p-4 flex-col items-center '>
            <button className='w-max p-3 md:px-16 md:text-xl shadow-md md:py-4 bg-[--c1] rounded-md text-[--dark] font-semibold uppercase hover:dark:bg-gray-200 hover:dark:text-gray-800 hover:bg-slate-800 hover:text-gray-200 transition duration-500' 
            onClick={PostBooking} 
            disabled={loading} // Disable button during loading
            >{loading ? (
                <p className='flex items-center justify-center'>
                    <FaSpinner className="animate-spin" /> {/* Spinner Icon */}
                    <span className="ml-2">Please Wait...</span> {/* Optional loading text */}
                </p> ) : (
                "Submit Booking Request" )}</button>
            {bookingConfirm && <span className='text-[--c1] text-xs mt-3'>{bookingConfirm}</span>}
        </div>
    
    );
}

export default SubmitBooking;
