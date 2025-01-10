
import { useState,useEffect,useContext,useRef } from "react";
import PlaceSearchOrigin from "../mapAPI/placeSearchOrigin";
import PlaceSearchDestination from '../mapAPI/placeSearchDestination'
import { BookingContext } from "../bookings/bookingsMain";

export default function BookingForm(props) {

          const {TripType} = useContext(BookingContext);
  


    const [AirportFrom, setAirportFrom] = useState('From');
    const [AirportTo, setAirportTo] = useState('To');




    const SetAirportSelectionTExt = (e) => {
    //   console.log(e.target.value);
       (e.target.value === 'From Airport') ? (setAirportFrom('From Airport'), setAirportTo('To')) : 
       (setAirportFrom('From'), setAirportTo('To Airport'))

        }


        useEffect(() => {
          // {getLatLong(originLong,originLat)}

            if (TripType !== "Airport") {
              setAirportFrom("From");
              setAirportTo("To");
            }
            else{
                setAirportFrom('From Airport')
                setAirportTo('To')
                
            }

          }, [TripType]);



          const getGridColsClass = () => {
            if (TripType === 'Round Trip' || TripType === 'Airport') return 'md:grid-cols-4 xl:grid-cols-7';
            if (TripType === 'Rental') return 'xl:grid-cols-4';
            return 'md:grid-cols-4 grid-cols-2 xl xl:grid-cols-6';
          };


    return (
        <>
        <div className={`my-10 md:px-10 grid-cols-2 w-[90%] gap-0    grid  transition  ${getGridColsClass()}`} >
           
           
              {/* ===============================================================  Airport pickDrop Choice*/}
              <div className={`grid col-span-1 xl:col-span-1 md:col-span-2  gap-2 content-end  ${TripType === "Airport" ? "block" : "hidden"}`}>
            <label className="px-2 text-sm">Trip Type</label>
           <select onChange={SetAirportSelectionTExt} name="Airport RideType" type="dropdown" placeholder="choose date" className="px-2 h-[48px] text-sm  rounded-md   focus:outline focus:outline-[--c1] py-3 m-1 ">
         <option value={'From Airport'}>Airport Pickup</option>
         <option value={'To Airport'} >Airport Drop</option>

         </select>

           </div>
           
           {/* ===============================================================  From*/}
            <div className="grid col-span-2  gap-2 mt-3 relative">
            <label className="px-2 text-sm "> {AirportFrom}</label>

            
            <PlaceSearchOrigin
         
          />
           </div> 
           {/* ===============================================================  To*/}
           <div className={`grid  mt-3 col-span-2 gap-2 ${TripType === 'Rental'?'hidden':''} `}>
            <label className="px-2 text-sm">{AirportTo}</label>
            <PlaceSearchDestination
         
              />


           </div>

             {/* ===============================================================  Trip Date*/}
             <div className="grid col-span-1  gap-2 mt-3">
            <label className="px-2 text-sm">Date</label>
           <input type="date" placeholder="choose date" className="px-2 text-sm  py-3 m-1 rounded-md   focus:outline focus:outline-[--c1] " />
           </div>

           
             {/* ===============================================================  Trip Time*/}
             <div className="grid col-span-1  gap-2 mt-3">
            <label className="px-2 text-sm">Pickup Time</label>
           <input type="time" placeholder="choose date" className="px-2 text-sm  py-3 m-1 rounded-md   focus:outline focus:outline-[--c1] " />
           </div>


            {/* ===============================================================  Return Date*/}
            <div className={`grid col-span-1  mt-3 gap-2 ${TripType === "Round Trip" ? "block" : "hidden"}`}>
            <label className="px-2 text-sm">Return Date</label>
           <input type="date" placeholder="choose date" className="px-2 text-sm  py-3 m-1 rounded-md   focus:outline focus:outline-[--c1] " />
           </div>


           

        </div>
        <button className=" py-3 px-5 w-52 mb-5 shadow-sm  rounded-md bg-[--c1] transition outline-transparent hover:outline hover:outline-1 hover:outline-[--c1] hover:bg-[--c1hover] hover:text-white mx-auto">Book Now</button>
       
        </>
        )};  