import { useContext } from "react";
import { BookingContext } from "../bookings/bookingsMain";

export default function DirectionMapPopup(){
              const {mapURL} = useContext(BookingContext);
                // console.log(mapURL);
                
              const openMapPopup = () => {
                // Customize the URL to the Google Maps link with the coordinates
                const googleMapsUrl = mapURL; // Replace with dynamic coordinates if needed
              
                // Set custom window size (width, height)
                const width = 600;
                const height = 400;
              
                // Calculate the position of the popup on the screen (optional)
                const left = (window.innerWidth - width) / 2;
                const top = (window.innerHeight - height) / 2;
              
                // Open the popup window
                const popupWindow = window.open(
                  googleMapsUrl,
                  "_blank",
                  `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
                );
              
                // Focus on the popup window (optional)
                if (popupWindow) popupWindow.focus();
              };
              



    
    return(

    <div>

        <button onClick={openMapPopup}>openMapPopup</button>
      </div>


    )
}