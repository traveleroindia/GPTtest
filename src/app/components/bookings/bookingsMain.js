import Testing from "../testing";

import { createContext, useRef, useEffect, useState } from "react";
import TripSelector from './tripSelector';
import BookingForm from './bookingForm';
import SearchedRides from './searchedRides';
import DistanceAPIcall from '../mapAPI/distanceAPIcall';
import DirectionMapPopup from '../mapAPI/directionMapPopup';
import TripCalculator from '../bookings/tripCalculator';
export const BookingContext = createContext();

export default function BookingsMain() {
    const [TripType, setTripType] = useState("One Way");
    const [OriginInformation, setOriginInformation] = useState({ lat: 0, lng: 0, address: '' });
    const [Destinationformation, setDestinationformation] = useState({ lat: 0, lng: 0, address: '' });
    const [Distance, setDistance] = useState(null);
    const [Time, setTime] = useState(null);
    const [BookingFareDetails, setBookingFareDetails] = useState([]);
    const [TripDate, setTripDate] = useState(null);
    const [pickupTime, setPickupTime] = useState(null);
    const [ReturnPickupDate, setReturnPickupDate] = useState(null);
    const [RideTypeOption, setRideTypeOption] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [detailsofBokkingandfare, setDetailsofBokkingandfare] = useState(false);
    const [Booking, setBooking] = useState();
    const [tripDetails, setTripDetails] = useState({});


    
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

    //   //============================================================= Set & Update trip time ,date,return date
    //   const TripDateTimeReturnSet = (tripDate,PickupTime,ReturnDate) => {
    //     setTripDate (tripDate);
    //     setPickupTime (PickupTime);
    //     setReturnPickupDate (ReturnDate);
    // };
    
    //============================================================= Update distance and call function

    const DistanceandTime = (distance, time) => {                            // Function is called from DistanceAPICall
        console.log("Distance and Time:", distance, time);
        setDistance(Math.ceil(parseFloat(distance))); // Corrected variable name and parentheses
        setTime(time); // This remains the same
    };
    

    //============================================================================ Get fare details

    const getFareDetails = (fareDetails) => {                                // funcion called from Trip calculator
 
        setBookingFareDetails(fareDetails); // Update state
    };
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${OriginInformation.lat},${OriginInformation.lng}&destination=${Destinationformation.lat},${Destinationformation.lng}&travelmode=driving`;

 
// =============================================================================== OnSUbmit set all states from all otehrcomponents into one
useEffect(() => {
    let newBooking;
    if (TripType === "Airport") {
        newBooking =RideTypeOption;
    } else {
        newBooking = TripType;
    }
    setBooking(newBooking);
}, [RideTypeOption, TripType]);

// =============================================================================== Set all states from all otehr components into one

useEffect(() => {
    setTripDetails({
        OriginInformation,
        Destinationformation,
        googleMapsUrl,
        Booking,
        Time,
        TripDate: TripDate ? TripDate.toLocaleDateString() : null,
        pickupTime,
        ReturnPickupDate: ReturnPickupDate ? ReturnPickupDate.toLocaleDateString() : null,
    });
}, [OriginInformation, Destinationformation, googleMapsUrl, TripType, Time, Distance, TripDate, pickupTime, ReturnPickupDate, RideTypeOption]);


// =============================================================================== OnSUbmit set all states from all otehr components into one


const HandleSearchedRides = () => {   // Function called from bookingForm component
    // Validate inputs

    if (!tripDetails.OriginInformation || tripDetails.OriginInformation.lat === 0) {
        setErrorMessage('Fill Origin Address');
        return;
    }
    if (tripDetails.TripType !== "Rental" && (!tripDetails.Destinationformation || tripDetails.Destinationformation.lat === 0)) {
        setErrorMessage('Fill Destination Address');
        return;
    }
    if (!tripDetails.TripDate) {
        setErrorMessage('Choose your trip Date');
        return;
    }
    if (!tripDetails.pickupTime) {
        setErrorMessage('Choose your Pickup Time');
        return;
    }
    if (tripDetails.TripType === "Round Trip" && !tripDetails.ReturnPickupDate) {
        setErrorMessage('Choose your Return Date');
        return;
    }

    setErrorMessage('');
    console.log("Info received on submit", BookingFareDetails);
    console.log("Trip Details are", tripDetails);
    setDetailsofBokkingandfare(true);

    return BookingFareDetails, tripDetails;
};


// ========================================================================

    return (
        <BookingContext.Provider
            value={{
                setTripType,
                Booking,
                TripType,
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
                BookingFareDetails,tripDetails,
                HandleSearchedRides,
                setTripDate,
                TripDate,
                setPickupTime,
                setReturnPickupDate,
                ReturnPickupDate,
                setRideTypeOption,
                errorMessage, setErrorMessage,detailsofBokkingandfare,setDetailsofBokkingandfare
            }}
        >
            <TripSelector />
            <BookingForm /> 
            <DistanceAPIcall />
            <SearchedRides />
            <DirectionMapPopup />
            <TripCalculator />
            {/* <Testing/> */}
        </BookingContext.Provider>
    );
}
