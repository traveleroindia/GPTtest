"use client"

export const BookingContext = createContext();
import TripSelector from './tripSelector';
import BookingForm from './bookingForm';
import {createContext,useRef,useEffect } from 'react';
import { useState } from 'react';
import Map from '../mapAPI/map';
import SearchedRides from './searchedRides'

// clearDestinationField
// clearOriginField
// =========================================================
export default function BookingsMain() {

const [tripType, setTripType] = useState("One Way")

const trip=tripType; // sending this value to results


// =========================================================  Setting and Updating Origin Information

const [OriginInformation, setOriginInformation] = useState({
    lat: null,
    lng: null,
    address: null,
  });
  const updateOriginLocation = (newData) => {
      setOriginInformation((prevState) => ({
      ...prevState, // Spread the previous state to retain other values
      ...newData,   // Overwrite with the new data
    }));
  };
  const GetOriginInfo=(Lat,Lng,Address)=>{
    updateOriginLocation({lat:Lat})
    updateOriginLocation({lng:Lng})
    updateOriginLocation({address:Address})
   }
// =========================================================  Setting and Updating Destination Information
  const [Destinationformation, setDestinationformation] = useState({
    lat: null,
    lng: null,
    address: null,
  });  
  const updateDestinationformation = (newData) => {
    setDestinationformation((prevState) => ({
      ...prevState, // Spread the previous state to retain other values
      ...newData,   // Overwrite with the new data
    }));

  };

  const GetDestinationInfo=(Lat,Lng,Address)=>{
    updateDestinationformation({lat:Lat})
    updateDestinationformation({lng :Lng})
    updateDestinationformation({address : Address})
}

// =============================================================================


const Trip=(e)=>{   // Contect function to recive the trip type
    setTripType(e)
    console.log(e);
  console.log(Destinationformation);
  console.log(OriginInformation);
}
// ======================================================  Restting Form FIelds on Changing Trip Type or Submit Btn pressed

 


// ============================================================================================================================  

return(
<BookingContext.Provider value={{Trip:Trip, TripType:trip, GetOriginInfo:GetOriginInfo ,GetDestinationInfo:GetDestinationInfo}}>
<TripSelector/>
<BookingForm />
<SearchedRides/>
{/* <Map/> */}
</BookingContext.Provider>
)};