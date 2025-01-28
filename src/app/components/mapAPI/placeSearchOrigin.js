import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import useOnclickOutside from "react-cool-onclickoutside";
  import { useState, useEffect, useContext, useRef } from "react";
  import { BookingContext } from "../bookings/bookingsMain";
  import { RiResetLeftLine } from "react-icons/ri";
  
  export default function PlaceSearchOrigin(props) {
    const { GetOriginInfo,TripType } = useContext(BookingContext);
  
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        componentRestrictions: { country: "in" },
      },
      debounce: 300,
    });
  
    const [inputValue, setInputValue] = useState(value); // State to track input value
    const inputRef = useRef();

    
    const clearOriginField = () => {
      setValue(""); // Clear the input value
      setInputValue(""); // Update state to hide "Clear" button
      GetOriginInfo(0,0,'');  {/* Passing Lat,Lng and Address to Context Method*/}
      if (inputRef.current) {
        inputRef.current.focus(); // Focuses the input element
      }
    };
  useEffect(() => {
    clearOriginField();
  }, [TripType]);


  
    const ref = useOnclickOutside(() => {
      clearSuggestions(); // Dismiss suggestions when clicking outside
    });
  

    const handleInput = (e) => {
      setValue(e.target.value); // Update controlled input value
      setInputValue(e.target.value); // Update state
    };
  
    const handleSelect =
      ({ description }) =>
      () => {
        setValue(description, false);
        clearSuggestions();
  
        getGeocode({ address: description }).then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          const address = inputRef.current.value
          console.log(address);
          
          GetOriginInfo(lat,lng,address);  {/* Passing Lat,Lng and Address to Context Method*/}
          
          
        });
      };
  

  
    const renderSuggestions = () =>
      data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;
  
        return (
          <li
            key={place_id}
            onClick={handleSelect(suggestion)}
            className="mb-1 hover:border-y hover:border-[--c1] cursor-pointer"
          >
            <p className="text-sm font-medium">{main_text}</p>{" "}
            <small className="text-xs">{secondary_text}</small>
          </li>
        );
      });
  
    return (
      <div ref={ref} className="w-full relative">
        {inputValue && (
          <span
            className="flex items-center gap-2 absolute right-0 top-[-20px] pr-6 text-sm cursor-pointer hover:text-red-600"
            onClick={clearOriginField}
          >
            <RiResetLeftLine />
            Clear
          </span>
        )}
 {!ready ? (
  <div className="animate-pulse m-1 px-3 py-3 text-gray-600 bg-[--light] rounded-md dark:bg-[--foreground] "> Please wait Loading ...</div>
) : (
  <input
    required
    value={value}
    onChange={handleInput}
    disabled={!ready}
    ref={inputRef}
    placeholder="Search your Origin"
    className="w-webkitfill py-3 m-1 px-2 rounded-md focus:outline focus:outline-[--c1]"
  />
)}
        {status === "OK" && (
          <ul className="min-w-[95%] absolute top-14 left-0 m-2  border border-[--c1] p-3 rounded z-10 bg-[--light] dark:bg-[--dark]">
            {renderSuggestions()}
          </ul>
        )}
      </div>
    );
  }
  