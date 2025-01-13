"use client"

export const BookingContext = createContext();
import TripSelector from './tripSelector';
import BookingForm from './bookingForm';
import {createContext,useRef,useEffect } from 'react';
import { useState } from 'react';
import Map from '../mapAPI/map';
import SearchedRides from './searchedRides'
import DistanceAPIcall from '../mapAPI/distanceAPIcall'
import DirectionMapPopup from '../mapAPI/directionMapPopup'
import TripCalculator from '../bookings/tripCalculator'
// =========================================================
export default function BookingsMain() {

const [tripType, setTripType] = useState("One Way")

const trip=tripType; // sending this value to results
const[callfunction, setcallfunction] = useState(0) // using this state to call TripFareCalculate function


// =========================================================  Setting and Updating Origin Information

const [OriginInformation, setOriginInformation] = useState({
    lat: 0,
    lng: 0,
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
    lat: 0,
    lng: 0,
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
}
// ======================================================  Pass lat long and get Distance and TIme
const OriginLat = OriginInformation.lat;
const OriginLng = OriginInformation.lng;

const DestinationLat = Destinationformation.lat;
const DestinationLng = Destinationformation.lng;

//============================================================= All info in one
const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${OriginInformation.lat},${OriginInformation.lng}&destination=${Destinationformation.lat},${Destinationformation.lng}&travelmode=driving`;


useEffect(() => {
  if(OriginInformation.lat === 0  || Destinationformation.lat === 0  ){
    return;
  }
  console.log(tripType);
  console.log(OriginInformation);
  console.log(Destinationformation);
  
}, [OriginInformation,Destinationformation]);

//=============================================================== Setting and getting distance from distanceAPIcall
const [Distance, setDistance] = useState(null) 
const DistanceandTime=(distance,time)=>{  // Get distacne and time 
console.log(time);
setDistance(distance)
console.log(Distance);
setcallfunction(callfunction+1) // Changing the state will call the function 
console.log(`${callfunction} Calling fare function`);

}

// =========================================================== Get fare Details

const getFareDetails=(arg)=>{
console.log(arg);

}


//===================================================== Available vehicles

const AvailableVehicles = [1,3,5]

// ============================================================================================================================  

return(
<BookingContext.Provider value={{Trip:Trip, TripType:trip, GetOriginInfo:GetOriginInfo ,
  GetDestinationInfo:GetDestinationInfo,OriginLat:OriginLat,OriginLng:OriginLng,
  DestinationLat:DestinationLat,DestinationLng:DestinationLng,DistanceandTime:DistanceandTime,
  mapURL:googleMapsUrl,getFareDetails:getFareDetails,Distance:Distance,AvailableVehicles:AvailableVehicles,tripType:tripType,callfunction:callfunction }}>
<TripSelector/>
<BookingForm />
<SearchedRides/>
<DistanceAPIcall/>
<DirectionMapPopup/>
<TripCalculator/>
{/* <Map/> */}
</BookingContext.Provider>
)};