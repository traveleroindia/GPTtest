

import { useState,useContext } from "react"
import { BookingContext } from "./bookingsMain";


export default function TripSelector() {

    const [tripType, setTripType] = useState("One Way")
    const options = ["One Way", "Round Trip", "Rental", "Airport"];
    const {Trip} = useContext(BookingContext);


    function handleClick(arg) {
        setTripType(arg)
        Trip(arg)
    }


    return (

        <>
            <div className="px-10 pt-14 pb-5 text-center ">
                <h1 className="text-2xl md:text-5xl font-bold py-7 antialiased">Travel Smart, Ride Easy</h1>
                <p className="text-xl md:text-2xl text-[--c1]">Choose your ride type !</p>
            </div>

            <div className="flex relative items-center justify-evenly w-full md:w-3/4 border-2 border-[--c1] rounded-full cursor-pointer">
                <div
                    className="absolute bg-[--c1]  h-9 rounded-full transition-all duration-1000 ease-in-out shadow-2xl shadow-[--c1]"
                    style={{
                        width: "25%",
                        left: `${options.indexOf(tripType) * 25}%`,
                    }}
                ></div>
                {options.map((e) => (
                    <div className={`p-1 z-10 text-xs md:text-lg text-center w-1/4 transition-all duration-1000 ease-in-out
                        hover:bg-[--c1] hover:text-[--dark] rounded-full
                        ${tripType === e ? "text-[--light] font-semibold" : ''}`}
                        key={e}
                        // onClick={() => {setTripType(e); }}
                        onClick={() => handleClick(e)}
                    >
                        {e}
                    </div>
                ))}


            </div>

        </>
    )

}