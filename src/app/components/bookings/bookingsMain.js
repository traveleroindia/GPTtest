import { createContext, useRef, useEffect, useState } from "react";
import TripSelector from './tripSelector';
import BookingForm from './bookingForm';
import Map from '../mapAPI/map';
import SearchedRides from './searchedRides';
import DistanceAPIcall from '../mapAPI/distanceAPIcall';
import DirectionMapPopup from '../mapAPI/directionMapPopup';
import TripCalculator from '../bookings/tripCalculator';

export const BookingContext = createContext();

export default function BookingsMain() {
    const [tripType, setTripType] = useState("One Way");
    const [OriginInformation, setOriginInformation] = useState({ lat: 0, lng: 0, address: '' });
    const [Destinationformation, setDestinationformation] = useState({ lat: 0, lng: 0, address: '' });
    const [Distance, setDistance] = useState(null);
    const [Time, setTime] = useState(null);
    const [BookingFareDetails, setBookingFareDetails] = useState([]); // Use state here
    const [TripDate, setTripDate] = useState(null);
    const [pickupTime, setPickupTime] = useState(null);
    const [ReturnPickupDate, setReturnPickupDate] = useState(null);
    const [RideTypeOption, setRideTypeOption] = useState('')
  const [errorMessage, setErrorMessage] = useState(null);


        
    
    //========================================================== Origin info


       const GetOriginInfo = (Lat, Lng, Address) => {
        updateOriginLocation({ lat: Lat, lng: Lng, address: Address });
    };

    const updateOriginLocation = (newData) => {
        setOriginInformation((prevState) => ({ ...prevState, ...newData }));
    };

    //========================================================== Destination info

    const GetDestinationInfo = (Lat, Lng, Address) => {
      updateDestinationformation({ lat: Lat, lng: Lng, address: Address });
  };

    const updateDestinationformation = (newData) => {
        setDestinationformation((prevState) => ({ ...prevState, ...newData }));
    };

      //============================================================= Set & Update trip time ,date,return date
      const TripDateTimeReturnSet = (tripDate,PickupTime,ReturnDate) => {
        setTripDate (tripDate);
        setPickupTime (PickupTime);
        setReturnPickupDate (ReturnDate);
    };
    
    //============================================================= Update distance and call function
    const DistanceandTime = (distance, time) => {
        setDistance(distance);
        setTime(time);
       
    };

    //============================================================================ Get fare details
    const getFareDetails = (fareDetails) => {

        setBookingFareDetails(fareDetails); // Update state
    };

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${OriginInformation.lat},${OriginInformation.lng}&destination=${Destinationformation.lat},${Destinationformation.lng}&travelmode=driving`;

    // useEffect(() => {
    //     if (OriginInformation.lat === 0 || Destinationformation.lat === 0) {
    //         return;
    //     }
    //     console.log("Origin:", OriginInformation);
    //     console.log("Destination:", Destinationformation);
    // }, [OriginInformation, Destinationformation]);
// =============================================================================== OnSUbmit set all states from all otehrcomponents into one
let tripDetails =[]
useEffect(() => {

    tripDetails = {
        OriginInformation,
        Destinationformation,
        googleMapsUrl,
        tripType,
        Distance,
        TripDate,
        pickupTime,
        ReturnPickupDate,
        RideTypeOption,
      };

}, [tripDetails]);



const HandleSearchedRides = () => {
    // Check Origin Information
    if (tripDetails.OriginInformation.lat === 0) {
        setErrorMessage('Fill Origin Address');
        console.log(tripDetails.Destinationformation.lat);
        return; // Exit if condition is not met
    }


    // Check Destination Information for Round Trip
    if (tripDetails.Destinationformation.lat === 0 && tripDetails.tripType !== "Rental") {
        setErrorMessage('Fill Destination Address');
        console.log('Destination address is missing for Round Trip');
        return; // Exit if condition is not met
    }

     // Check Trip date is empty
     if (tripDetails.TripDate === null) {
        setErrorMessage('Choose your trip Date');
        console.log('Trip date empty');
        return; // Exit if condition is not met
    }

     // Check pickupTime is empty
     if (tripDetails.pickupTime === null) {
        setErrorMessage('Choose your Pickup Time');
        console.log('pickupTime  empty');
        return; // Exit if condition is not met
    }


      // Check Destination Information for Round Trip
      if (tripDetails.ReturnPickupDate === null && tripDetails.tripType === "Round Trip") {
        setErrorMessage('Choose your Return Date');
        console.log('Return date is missing for Round Trip');
        return; // Exit if condition is not met
    }

    // Reset error message if Destination is valid
    setErrorMessage('');

    // Proceed with handling the ride search
    console.log("Info received on submit", BookingFareDetails);
    console.log("Trip Details are", tripDetails);
};


    return (
        <BookingContext.Provider
            value={{
                Trip: setTripType,
                TripType: tripType,
                GetOriginInfo,
                GetDestinationInfo,
                OriginLat: OriginInformation.lat,
                OriginLng: OriginInformation.lng,
                DestinationLat: Destinationformation.lat,
                DestinationLng: Destinationformation.lng,
                DistanceandTime,
                mapURL: googleMapsUrl,
                getFareDetails,
                Distance,
                BookingFareDetails,
                HandleSearchedRides,
                setTripDate,
                TripDate,
                setPickupTime,
                setReturnPickupDate,
                ReturnPickupDate,
                setRideTypeOption,
                errorMessage, setErrorMessage
            }}
        >
            <TripSelector />
            <BookingForm />
            <DistanceAPIcall />
            {/* <SearchedRides /> */}
            <DirectionMapPopup />
            <TripCalculator />
        </BookingContext.Provider>
    );
}
