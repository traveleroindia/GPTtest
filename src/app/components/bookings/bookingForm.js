import { useState, useEffect, useContext,useRef } from "react";
import PlaceSearchOrigin from "../mapAPI/placeSearchOrigin";
import PlaceSearchDestination from "../mapAPI/placeSearchDestination";
import { BookingContext } from "../bookings/bookingsMain";
import { BiError } from "react-icons/bi";
export default function BookingForm(props) {
  const [airportFrom, setAirportFrom] = useState("From");
  const [airportTo, setAirportTo] = useState("To");
  const tripDateRef = useRef();
  const timeRef = useRef();
  const returnDateRef = useRef();

  const {
    TripType,
    HandleSearchedRides,
    setTripDate,
    TripDate,
    setPickupTime,
    setReturnPickupDate,
    setRideTypeOption,
    errorMessage, setErrorMessage,setDetailsofBokkingandfare,detailsofBokkingandfare
  } = useContext(BookingContext);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set the current date to midnight

  const onchangeSetDateTimeReturn = (e) => {
    const { name, value } = e.target;

    if (name === "tripDate") {
      const tripDate = new Date(tripDateRef.current.value);
      if (tripDate < today) {
        resetFields(); // Reset fields if the trip date is invalid
        console.log("Trip date cannot be in the past."); // Alert user
        setErrorMessage("Trip date cannot be in the past.")
      } else {
        setTripDate(tripDate);
        console.log(tripDateRef.current.value);
        
        localStorage.setItem('TripDate',tripDateRef.current.value)
        setErrorMessage(null)

      }
    } else if (name === "pickupTime") {
      setPickupTime(timeRef.current.value);
    } else if (name === "returnDate") {
      const returnDate = new Date(returnDateRef.current.value);
      if (returnDate < TripDate) {
        resetFields(); // Reset fields if the return date is invalid
        console.log("Return date cannot be before the trip date."); // Alert user
        setErrorMessage("Return date cannot be before the trip date.")
      } else {
        setReturnPickupDate(returnDate);
        localStorage.setItem('ReturnPickup',returnDateRef.current.value)
        setErrorMessage(null)
      }
    }
  };

  const resetFields = () => {
    tripDateRef.current.value= '';
timeRef.current.value= '';
returnDateRef.current.value= '';
    setTripDate(null);
    setPickupTime(null);
    setReturnPickupDate(null);
    console.log("Fields reset.");
    setDetailsofBokkingandfare(false)  // Will reset and hide the information bar below the form
    console.log(detailsofBokkingandfare);


  };

  useEffect(() => {
    if (TripType) {
      resetFields();
    }
  }, [TripType]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(""); // Clear the error message
      }, 2500);

      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [errorMessage]);




  const SetAirportSelectionTExt = (e) => {
    const value = e.target.value;

    if (value === "From Airport") {
      setAirportFrom("From Airport");
      setAirportTo("To");
      setRideTypeOption("Airport Pickup");
      console.log(TripType);
      
    } else {
      setAirportFrom("From");
      setAirportTo("To Airport");
      setRideTypeOption("Airport Drop");
    }
  };

  useEffect(() => {
    if (TripType !== "Airport") {
      setAirportFrom("From");
      setAirportTo("To");
    } else {
      setAirportFrom("From Airport");
      setAirportTo("To");
      setRideTypeOption("Airport Pickup");
    }
  }, [TripType]);

  const getGridColsClass = () => {
    if (TripType === "Round Trip" || TripType === "Airport")
      return "md:grid-cols-4 xl:grid-cols-7";
    if (TripType === "Rental") return "xl:grid-cols-4";
    return "md:grid-cols-4 grid-cols-2 xl:grid-cols-6";
  };

 
  return (
    <>
    
      <div
        className={`my-10 md:px-10 grid-cols-2 w-[90%] gap-0 grid transition ${getGridColsClass()}`}
      >
        {/* Airport pickDrop Choice */}
        <div
          className={`grid col-span-1 xl:col-span-1 md:col-span-2 gap-2 content-end ${
            TripType === "Airport" ? "block" : "hidden"
          }`}
        >
          <label className="px-2 text-sm">Trip Type</label>
          <select
            onChange={SetAirportSelectionTExt}
            value={airportFrom === "From Airport" ? "From Airport" : "To Airport"}
            name="RideTypeOption"
            className="px-2 h-[48px] text-sm rounded-md focus:outline focus:outline-[--c1] py-3 m-1"
          >
            <option value="From Airport">Airport Pickup</option>
            <option value="To Airport">Airport Drop</option>
          </select>
        </div>

        {/* From */}
        <div className="grid col-span-2 gap-2 mt-3 relative">
          <label className="px-2 text-sm ">{airportFrom}</label>
          <PlaceSearchOrigin />
        </div>

        {/* To */}
        <div
          className={`grid mt-3 col-span-2 gap-2 ${
            TripType === "Rental" ? "hidden" : ""
          }`}
        >
          <label className="px-2 text-sm">{airportTo}</label>
          <PlaceSearchDestination />
        </div>

        {/* Trip Date */}
        <div className="grid col-span-1 gap-2 mt-3">
          <label className="px-2 text-sm">Date</label>
          <input
            type="date" ref={tripDateRef}
            name="tripDate"
            onChange={onchangeSetDateTimeReturn}
            className="px-2 text-sm py-3 m-1 rounded-md focus:outline focus:outline-[--c1]"
          />
        </div>

        {/* Pickup Time */}
        <div className="grid col-span-1 gap-2 mt-3">
          <label className="px-2 text-sm">Pickup Time</label>
          <input
            type="time" ref={timeRef}
            name="pickupTime" 
            onChange={onchangeSetDateTimeReturn}
            className="px-2 text-sm py-3 m-1 rounded-md focus:outline focus:outline-[--c1]"
          />
        </div>

        {/* Return Date */}
        <div
          className={`grid col-span-1 mt-3 gap-2 ${
            TripType === "Round Trip" ? "block" : "hidden"
          }`}
        >
          <label className="px-2 text-sm">Return Date</label>
          <input ref={returnDateRef}
            type="date"
            name="returnDate"
            onChange={onchangeSetDateTimeReturn}
            className="px-2 text-sm py-3 m-1 rounded-md focus:outline focus:outline-[--c1]"
          />
        </div>
      </div>
      <div className="relative flex flex-col items-center ">
         {/* Tooltip */}
      {errorMessage && (
      <div className=" min-w-max bg-red-600 text-white text-sm px-3 py-1 rounded  animate-bounce absolute -top-8  mb-3 flex items-center gap-2">
   <BiError /> {errorMessage}
  </div>)}
      <button
        onClick={HandleSearchedRides}
        className="py-3 px-5 w-52 mb-5 text-black shadow-sm rounded-md bg-[--c1] transition outline-transparent hover:outline hover:outline-1 hover:outline-[--c1] hover:bg-[--c1hover] hover:text-white mx-auto"
      >
        Search Rides
      </button>
     </div>
    </>
  );
}
