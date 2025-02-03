import { useState, useEffect, useContext } from "react";
import vehiclefare from "/vehiclefare.json";
import { BookingContext } from "./bookingsMain";

export default function TripCalculator() {
    const { Distance, getFareDetails,  TripType } = useContext(BookingContext);
    
    // const distanceNumber = Math.ceil(parseFloat(Distance) || 0);
    const AvailableVehicles = [1, 2, 6];

   
    
    let fareDetails = [];

    useEffect(() => {
        if(!Distance) return // will return if distance is not set
       
       TripFareCalculate(AvailableVehicles, TripType, Distance);  // input arguments
       getFareDetails(fareDetails); // sending parent updated fare details

    }, [Distance]);

    function TripFareCalculate(Vehiclefilter, TripType, km) {
        const FilteredVehicles = vehiclefare.filter((vehicles) =>
            Vehiclefilter.includes(vehicles.id)
        );


        if (TripType === "One Way") {
            FilteredVehicles.forEach((arg) => {
                 let RoundKM = Math.ceil(km / 20) * 20;
                    const fare = ((RoundKM / arg.km) * arg.baseFare);
                    const discount = Math.round(fare*.1); // 10% Discount on One way trip
                    const fareWithAddedDiscount = fare + discount
                    const finalFare = fare;

                    fareDetails.push({
                        fare: Math.round(fareWithAddedDiscount),
                        discount : Math.round(discount),
                        finalFare : Math.round(finalFare),
                        vehicle: arg.vehicle,
                        imagelink: arg.imagelink,
                        km : km, // Actual Distance to destination
                        fareDistance : RoundKM, // Round of to near 20 for calculation
                        perkmCharge: arg.perkmCharge,
                        perHourCharge: arg.perHourCharge,
                        nightCharge: arg.nightCharge,
                        passanger: arg.passanger,
                        tollCharge: "free",
                    });
                
            });
            
        }
            
        if (TripType === "Round Trip") {
            FilteredVehicles.forEach((arg) => {
                let RoundKM = (Math.ceil(km / 10) * 10)*2;
                    const fare = ((RoundKM / arg.km) * arg.baseFare);
                    const discount = Math.round(fare*.15); // 15% Discount on round trip
                    const fareWithAddedDiscount = fare + discount
                    const finalFare = fare;

                    fareDetails.push({
                        fare: Math.round(fareWithAddedDiscount),
                        discount : Math.round(discount),
                        finalFare : Math.round(finalFare),
                        vehicle: arg.vehicle,
                        imagelink: arg.imagelink,
                        km : km*2, // Actual Distance to destination
                        fareDistance : RoundKM, // Round of to near 20 for calculation
                        perkmCharge: arg.perkmCharge,
                        perHourCharge: arg.perHourCharge,
                        nightCharge: arg.nightCharge,
                        passanger: arg.passanger,
                        tollCharge: arg.tollCharge,
                    });
            });
        }

    }

    return <></>;
}
