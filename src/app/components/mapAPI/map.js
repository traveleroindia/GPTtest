import React from 'react';
import { GoogleMap, useJsApiLoader,MarkerF } from '@react-google-maps/api'
import { BookingContext } from "../bookings/bookingsMain";
import { useContext } from 'react';

const containerStyle = {
    width: '100%',
    height: '300px',
  }

  
// This is Map Feed Function which feeds the map 

const Map = () => {

  const {Lat,Long} = useContext(BookingContext);
  
  const OriginCenter = {
    lat: Lat !== null && Lat !== undefined ? Lat : 28.501368,
    lng: Long !== null && Long !== undefined ? Long : 77.034035,
  };

  const DestinationCenter = {
    lat: 29.2405272 ,
    lng:77.0117647,
  };
    
  
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

          const marker2Clicked = (e) => {
            console.log(e.latLng.lat(), e.latLng.lng());
                }

        
          return isLoaded ? (
            <div className="container"> 
            <GoogleMap
            options={options}
              mapContainerStyle={containerStyle}
              center={OriginCenter}
              zoom={13}
 
            >
{/* ======================================================  From Marker */}

                <MarkerF position={OriginCenter} 
                draggable
                onDragEnd={(e) => console.log(e.latLng.lat(), e.latLng.lng())}
                 icon={icon}
                 onClick={markerClicked}

                label={{text:'This is my marker',
                    className:"text-2xl bg-white text-white p-2 rounded-lg margin-2 absolute left-4 top-0 shadow-lg hidden"
                }}
                
                />
{/* ======================================================  To Marker */}
                <MarkerF position={DestinationCenter} 
                draggable
                onDragEnd={(e) => console.log(e.latLng.lat(), e.latLng.lng())}
                 icon={icon}
                 onClick={marker2Clicked}

                label={{text:'This is my marker 1',
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
