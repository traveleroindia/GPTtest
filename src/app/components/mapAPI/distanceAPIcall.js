import { useEffect,useContext } from 'react';
import { BookingContext } from '../bookings/bookingsMain';
export default function DistanceAPIcall() {
 const { OriginLat,OriginLng ,DestinationLat,DestinationLng,DistanceandTime} = useContext(BookingContext);

const Olat = Number(OriginLat)
const Olng = Number(OriginLng)
const Dlat = Number(DestinationLat)
const Dlng = Number(DestinationLng)

  useEffect(() => {
    if (!OriginLat || !DestinationLng) {
        // If either OriginLat or DestinationLng is blank, do not run the hook
        return;
      }
    if (typeof window !== 'undefined' && window.google) {
      initMap();
    }
  }, [OriginLat,DestinationLng]);

  function initMap() {
    const bounds = new google.maps.LatLngBounds();
    let markersArray = [];

    // const origin1 = { lat: 28.7040592, lng: 77.10249019999999 };
    // const destinationB = { lat: 29.3909464, lng: 76.9635023 };

    const origin1 = { lat:Olat, lng:Olng };
    const destinationB = { lat:Dlat, lng:Dlng };

    const request = {
      origins: [origin1],
      destinations: [destinationB],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };

    const service = new google.maps.DistanceMatrixService();
    service
      .getDistanceMatrix(request)
      .then((response) => {
    const distance = response.rows[0]?.elements[0]?.distance?.text;
    const time = response.rows[0]?.elements[0]?.duration?.text;

    DistanceandTime(distance,time)

        // console.log(`Distance Matrix Response:',${distance}`);
        // console.log(`Distance Matrix Response:',${time}`);
        console.log(response.rows[0]);

      })
      .catch((error) => {
        console.error('Error fetching Distance Matrix:', error);
      });

  }
}
