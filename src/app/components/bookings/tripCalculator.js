import { useState, useEffect,useMemo,useContext } from "react";
import vehiclefare from "/vehiclefare.json";
import { BookingContext } from "./bookingsMain";

export default function TripCalculator() {
    const {Distance,getFareDetails,AvailableVehicles,callfunction,TripType} = useContext(BookingContext)
    const [fareDetails, setFareDetails] = useState([]);

    const distanceStr = Distance; // The input string
    const distanceNumber = Math.ceil(parseFloat(distanceStr)); // Convert to a number and round up
    // console.log(distanceNumber); // Output: 363
    

  useEffect(() => {
    if(callfunction === 0){ return}

    const result = TripFareCalculate(AvailableVehicles, TripType, distanceNumber); // Caling the function by passing arguments and state
    setFareDetails(result); // Store the results in state
    console.log('Checking if anything running here' ,callfunction,TripType,Distance);
      }, [callfunction]); // Runs only when this state changes




  function TripFareCalculate(Vehiclefilter, tripType, km) {
    const FilteredVehicles = vehiclefare.filter((vehicles) =>
      Vehiclefilter.includes(vehicles.id)
    );

    let fareDetails = []; // Array to hold the fare details

    if (tripType === "One Way") {
      if (km <= 20) {
        FilteredVehicles.forEach((arg) => {
          fareDetails.push({
            fare: arg.baseFare,
            vehicle: arg.vehicle,
            imagelink: arg.imagelink,
            baseKM: arg.baseKM,
            perkmCharge: arg.perkmCharge,
            perHourCharge: arg.perHourCharge,
            nightCharge: arg.nightCharge,
            passanger: arg.passanger,
            tollCharge: arg.tollCharge,
          });
        });
      } else if (km <= 40) {
        FilteredVehicles.forEach((arg) => {
          const calculatedFare = (km / arg.baseKM) * arg.baseFare;
          const calculatedKm = 40;
          fareDetails.push({
            fare: calculatedFare,
            vehicle: arg.vehicle,
            imagelink: arg.imagelink,
            baseKM: calculatedKm,
            perkmCharge: arg.perkmCharge,
            perHourCharge: arg.perHourCharge,
            nightCharge: arg.nightCharge,
            passanger: arg.passanger,
            tollCharge: arg.tollCharge,
          });
        });
      } else {
        FilteredVehicles.forEach((arg) => {
          const calculatedFare = (km / arg.baseKM) * arg.baseFare;
          const calculatedKm = km;

          fareDetails.push({
            fare: calculatedFare,
            vehicle: arg.vehicle,
            imagelink: arg.imagelink,
            baseKM: calculatedKm,
            perkmCharge: arg.perkmCharge,
            perHourCharge: arg.perHourCharge,
            nightCharge: arg.nightCharge,
            passanger: arg.passanger,
            tollCharge: arg.tollCharge,
          });
        });
      }
    }
    getFareDetails(fareDetails)
    // console.log(fareDetails);
    
    return fareDetails;
  }


}
