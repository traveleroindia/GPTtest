import React, { useState } from 'react';
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaPhoneFlip } from "react-icons/fa6";
import { useAuth } from '../components/providers/userProvider';
import { ClipLoader } from "react-spinners"; // Import spinner

const AddAlternateNumber = () => {
    const [state, setState] = useState(false);
    const [alternateNumber, setAlternateNumber] = useState("");
    const [confirmedNumber, setConfirmedNumber] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
    const { userDetails } = useAuth();

    const handleClick = () => {
        setState(true);
        setAlternateNumber('');
    };

    const getInput = (e) => {
        setAlternateNumber(e.target.value);
    };

    const handleAlternateNumber = async () => {
        setLoading(true); // Start loading
        setError("");

        const data = {
            alt_phone: alternateNumber,
            id: userDetails.userId // replace with the actual user ID
        };

        try {
            const response = await fetch('API/users/add_alternate_number', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Network response was not ok');
            }

            setConfirmedNumber(data.alt_phone);
            setState(false);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };


    return (
        <>
             {(!state) && <>
           
            {confirmedNumber ? (
                <>
                <FaPhoneFlip className="h-6 w-6 fill-current"/>
                 <h1 className="px-2 text-sm" onClick={handleClick}> {confirmedNumber} <span className='text-green-700 ml-3'> Added</span></h1>
               </>
                ):
                <>
                <MdOutlineModeEdit className="h-6 w-6 fill-current" />
          <h1 className="px-2 text-sm" onClick={handleClick}> <span className='font-bold cursor-pointer text-[--c1]' >Click Here </span> to Add Alternate Number </h1>
          </>  }</> }

           {(state)&&
           <>
           
           <div className='relative'>
           
           <input type="phone" placeholder="Enter alternate number" onChange={getInput} className=" mb-6 block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
          <p className='absolute bottom-0 text-red-500 text-xs'>{error}</p>
          </div> 
          <div className='flex flex-col items-center justify-between h-fit '>
          <IoMdCloseCircle className='pl-1 w-8 h-8 font-semibold text-red-500' onClick={() => {setState(false), setError('')}} />
             {loading ? <ClipLoader size={20} color="#fff" /> : 
          <IoCheckmarkCircle className='pl-1 w-8 h-8 font-semibold text-green-700' onClick={handleAlternateNumber}/> }
          </div>
          
           </>
           } 
        </>

    );
}

export default AddAlternateNumber;
