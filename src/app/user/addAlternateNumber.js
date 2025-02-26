import React from 'react';
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useState } from 'react';
import {useAuth } from '../components/providers/userProvider';
import { FaPhoneFlip } from "react-icons/fa6";
  
const AddAlternateNumber = () => {
    const [state, setstate] = useState(false);
    const [alternateNumber, setalternateNumber] = useState()
    const [confirmednumber, setconfirmednumber] = useState()
    const [error, seterror] = useState("")
  const {userDetails} = useAuth();


const handleClick=()=>{
    setstate(true);
    setalternateNumber('')
    
}

const getinput=(e) => {
    setalternateNumber(e.target.value);
    console.log(e.target.value);
    console.log(userDetails.userId);
}

const handleAlternateNumber = async () => {
    const data = {
        alt_phone: alternateNumber,
        id: userDetails.userId // replace with the actual user ID
    };

    try {
        // Making the POST request
        const response = await fetch('API/users/add_alternate_number', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify that the content is JSON
            },
            body: JSON.stringify(data), // Convert your data to JSON format
        });

        // Check if the response is OK
        if (!response.ok) {
            const errorData = await response.json(); // Await the JSON parsing
            throw new Error(errorData.error || 'Network response was not ok'); // Conditional error message
        }

        // Parse and return the JSON from the response
        setconfirmednumber(data.alt_phone)
        setstate(false)
        return await response.json(); // Await the JSON parsing for successful response
    } catch (error) {
        seterror(error.message)
        console.log(error.message);
        
    }
};


    return (
        <>
             {(!state) && <>
           
            {confirmednumber ? (
                <>
                <FaPhoneFlip className="h-6 w-6 fill-current"/>
                 <h1 className="px-2 text-sm" onClick={handleClick}> {confirmednumber} <span className='text-green-700 ml-3'> Added</span></h1>
               </>
                ):
                <>
                <MdOutlineModeEdit className="h-6 w-6 fill-current" />
          <h1 className="px-2 text-sm" onClick={handleClick}> <span className='font-bold cursor-pointer text-[--c1]' >Click Here </span> to Add Alternate Number </h1>
          </>  }</> }

           {(state)&&
           <>
           
           <div className='relative'>
           
           <input type="phone" placeholder="Enter alternate number" onChange={getinput} className=" mb-6 block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
          <p className='absolute bottom-0 text-red-500 text-xs'>{error}</p>
          </div> 
          <div className='flex flex-col items-center justify-between h-fit '>
          <IoMdCloseCircle className='pl-1 w-8 h-8 font-semibold text-red-500' onClick={() => {setstate(false), seterror('')}} />
          <IoCheckmarkCircle className='pl-1 w-8 h-8 font-semibold text-green-700' onClick={handleAlternateNumber}/>
          </div>
          
           </>
           } 
        </>

    );
}

export default AddAlternateNumber;
