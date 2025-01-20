import { useState, useEffect, useContext } from "react";
import vehiclefare from "/vehiclefare.json";
import { BookingContext } from "./bookingsMain";

export default function TripCalculator() {
    const { Distance, getFareDetails,  TripType } = useContext(BookingContext);
    
    const distanceNumber = Math.ceil(parseFloat(Distance) || 0);
    const AvailableVehicles = [3, 4, 5];

   

    // console.log(Distance," recived distance");
    
    // console.log("Calculated Distance Number:", distanceNumber);
    
    let fareDetails = [];

    useEffect(() => {
        if(!Distance) return // will return if distance is not set
       
       TripFareCalculate(AvailableVehicles, TripType, distanceNumber);  // input arguments
       getFareDetails(fareDetails); // sending parent updated fare details

    }, [Distance]);

    function TripFareCalculate(Vehiclefilter, tripType, km) {
        const FilteredVehicles = vehiclefare.filter((vehicles) =>
            Vehiclefilter.includes(vehicles.id)
        );


        if (tripType === "One Way") {
            FilteredVehicles.forEach((arg) => {
                if (km <= 20) {
                    fareDetails.push({
                        fare: arg.baseFare,
                        vehicle: arg.vehicle,
                        imagelink: arg.imagelink,
                        baseKM: arg.baseKM, // Keep original baseKM
                        perkmCharge: arg.perkmCharge,
                        perHourCharge: arg.perHourCharge,
                        nightCharge: arg.nightCharge,
                        passanger: arg.passanger,
                        tollCharge: arg.tollCharge,
                        basefare: arg.baseFare,
                        discount : (arg.baseFare*.5),
                    });
                } else if (km <= 40) {
                    const calculatedFare = (km / arg.baseKM) * arg.baseFare;
                    fareDetails.push({
                        fare: Math.round(calculatedFare),
                        vehicle: arg.vehicle,
                        imagelink: arg.imagelink,
                        baseKM: arg.baseKM, // Use original baseKM
                        calculatedBaseKM: 40, // Add this if you want to store the calculated distance
                        perkmCharge: arg.perkmCharge,
                        perHourCharge: arg.perHourCharge,
                        nightCharge: arg.nightCharge,
                        passanger: arg.passanger,
                        tollCharge: arg.tollCharge,
                        basefare: arg.baseFare,
                        discount : (arg.baseFare*.5),
                    });
                } else {
                    const calculatedFare = (km / arg.baseKM) * arg.baseFare;
                    fareDetails.push({
                        fare: Math.round(calculatedFare),
                        vehicle: arg.vehicle,
                        imagelink: arg.imagelink,
                        baseKM: arg.baseKM, // Use original baseKM
                        calculatedBaseKM: km, // Add this if needed for calculated distance
                        perkmCharge: arg.perkmCharge,
                        perHourCharge: arg.perHourCharge,
                        nightCharge: arg.nightCharge,
                        passanger: arg.passanger,
                        tollCharge: arg.tollCharge,
                        basefare: arg.baseFare,
                        discount : (arg.baseFare*.7),
                    });
                }
            });
            
        }
            // console.log(tripType);
            
        if (tripType === "Round Trip") {
            FilteredVehicles.forEach((arg) => {
                if (km <= 20) {
                    const calculatedKm = km * 2;
                    const doubleFare = (calculatedKm/arg.baseKM) * arg.baseFare;
                    const calculatedFare = doubleFare - doubleFare * 0.10; // 10% discount
                    fareDetails.push({
                        fare: Math.round( calculatedFare),
                        vehicle: arg.vehicle,
                        imagelink: arg.imagelink,
                        baseKM: calculatedKm,
                        perkmCharge: arg.perkmCharge,
                        perHourCharge: arg.perHourCharge,
                        nightCharge: arg.nightCharge,
                        passanger: arg.passanger,
                        tollCharge: arg.tollCharge,
                        tollIncluded : arg.tollIncluded,
                        discount : (arg.baseFare*.10),
                    });
                }

                else if (km <= 40) {
                    const calculatedKm = km * 2;
                    const doubleFare = (calculatedKm/arg.baseKM)  * arg.baseFare;
                    const calculatedFare = doubleFare - doubleFare * 0.10; // 10% discount
                    fareDetails.push({
                        fare: Math.round( calculatedFare),
                        vehicle: arg.vehicle,
                        imagelink: arg.imagelink,
                        baseKM: calculatedKm,
                        perkmCharge: arg.perkmCharge,
                        perHourCharge: arg.perHourCharge,
                        nightCharge: arg.nightCharge,
                        passanger: arg.passanger,
                        tollCharge: arg.tollCharge,
                        tollIncluded : arg.tollIncluded,

                        discount : (arg.baseFare*.10),
                    });
                }
                else {
                    const calculatedKm = km * 2;
                    const doubleFare = (calculatedKm/arg.baseKM)  * arg.baseFare;
                    const calculatedFare = doubleFare - doubleFare * 0.10; // 10% discount
                    fareDetails.push({
                        fare: Math.round( calculatedFare),
                        vehicle: arg.vehicle,
                        imagelink: arg.imagelink,
                        baseKM: calculatedKm,
                        perkmCharge: arg.perkmCharge,
                        perHourCharge: arg.perHourCharge,
                        nightCharge: arg.nightCharge,
                        passanger: arg.passanger,
                        tollCharge: 200,
                        tollIncluded : 'included',

                        discount : (arg.baseFare*.10),
                    });
                }
            });
        }

    }

    return <></>;
}
