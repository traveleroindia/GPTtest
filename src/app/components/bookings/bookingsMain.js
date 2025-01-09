"use client"


import TripSelector from './tripSelector';
import BookingForm from './bookingForm';
import {createContext} from 'react';
export const BookingContext = createContext();
import { useState } from 'react';
import Map from '../mapAPI/map';

// =========================================================
export default function BookingsMain() {

const [tripType, setTripType] = useState("One Way")
const [Lat,setLat] = useState(28.501368)
const [Long,setLong] = useState(77.034035)


const trip=tripType;



const Trip=(e)=>{   // Contect function to recive the trip type
    setTripType(e)
    console.log(e);
    
}

const getLatLong=(Lat,Long)=>{
    setLat(Lat)
    setLong(Long)
    // console.log(Lat,Long);
    
}

return(
<BookingContext.Provider value={{Trip:Trip, Lat:Lat,Long:Long,TripType:trip, getLatLong:getLatLong}}>
{/* <MapProvider> */}
  
<TripSelector/>
<BookingForm />
<Map/>
</BookingContext.Provider>
)
}