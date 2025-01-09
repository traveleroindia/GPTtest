import React from 'react';
import { GoogleMap, useJsApiLoader,MarkerF } from '@react-google-maps/api'
import { BookingContext } from "../bookings/bookingsMain";
import { useContext } from 'react';

const containerStyle = {
    width: '100%',
    height: '300px',
  }
  
  const center = {  
    lat: 28.501368,
    lng: 77.034035,
  }
  
// This is Map Feed Function which feeds the map 

const Map = (props) => {

        const {Lat,Long} = useContext(BookingContext);

    // console.log(Lat,Long);
    
  
        const { isLoaded } = useJsApiLoader({
            id: 'google-map-script',
            googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
          })
        
      const options = {
        // mapID : '7f123a9c619ae39f',
        mapTypeId:'roadmap',
        disableDefaultUI:true,
        scrollwheel:true,
      }
      const icon = {
        scaledSize:{width:80,  height:80},
        url: 'images/gps.png',
    }

    const markerClicked = (e) => {
        console.log(e.latLng.lat(), e.latLng.lng());
            }

        
          return isLoaded ? (
            <div className="container"> 
            <GoogleMap
            options={options}
              mapContainerStyle={containerStyle}
              center=
            //   {center}
              {{ lat: Lat, lng: Long }}
              zoom={13}
 
            >
                <MarkerF position={
                    // center
                    {lat: Lat, lng: Long}
                } 
                draggable
                onDragEnd={(e) => console.log(e.latLng.lat(), e.latLng.lng())}
                 icon={icon}
                 onClick={markerClicked}

                label={{text:'This is my marker',
                    className:"text-2xl bg-white text-white p-2 rounded-lg margin-2 absolute left-4 top-0 shadow-lg hidden"
                }}
                
                />
              {/* Child components, such as markers, info windows, etc. */}
              <></>
            </GoogleMap>
            </div>
          ) : (
            <></>
            
          )
        }

export default Map;
