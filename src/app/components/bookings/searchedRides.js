import { HiOutlineHome,HiOutlineHomeModern  } from "react-icons/hi2";
import { BiTrip } from "react-icons/bi";
import { FcCalendar } from "react-icons/fc";
import { FcClock } from "react-icons/fc";
import { SiToll } from "react-icons/si";
import { FcMoneyTransfer } from "react-icons/fc";
import { GiPathDistance } from "react-icons/gi";
import { GoChevronRight } from "react-icons/go";
import { FaCircleExclamation } from "react-icons/fa6";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useEffect, useState,useContext } from "react";
import {BookingContext} from './bookingsMain';
import { useRouter } from 'next/navigation';
export default function  SearchedRides () {
    const Router = useRouter();
  const { BookingFareDetails, tripDetails, detailsofBokkingandfare } = useContext(BookingContext);

const [activeBadge, setActiveBadge] = useState(null); // Tracks the currently active badge



  const toggleBadge = (index) => {
    setActiveBadge((prevIndex) => (prevIndex === index ? null : index));
  };


const returnDate = tripDetails.ReturnPickupDate;

  if (!detailsofBokkingandfare || !BookingFareDetails || BookingFareDetails.length === 0) {
    return null; // Do not render if no details are available
}


const CaptureSelectionInfo=(index)=>{
console.log(BookingFareDetails[index]);
console.log(tripDetails);
localStorage.setItem('RidesSearched', 'true');
localStorage.setItem("BookingData",JSON.stringify({Fare:(BookingFareDetails[index]),Trip:tripDetails}));
Router.push('/user')

}
  return (
    <section className="container px-4 mx-auto">
    <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="w-full p-5">
                        <thead>
                            <tr className="px-4 text-left text-sm border-b border-gray-700 ">
                            <th scope="col" className="font-normal border-r-gray-600 border-r  py-2 px-10 w-32">Vehicle</th>
                            <th scope="col" className="font-normal border-r-gray-600 border-r  py-2 px-16 w-24 text-center">From</th>
                            <th scope="col" className="font-normal border-r-gray-600 border-r  py-2 px-16 w-20 text-center">To</th>
                            <th scope="col" className="font-normal border-r-gray-600 border-r  py-2 px-2 w-28  text-center ">Trip</th>
                            <th scope="col" className="font-normal border-r-gray-600 border-r  py-2 px-2 w-24   text-center ">Date</th>
                            <th scope="col" className="font-normal border-r-gray-600 border-r  py-2 px-6 w-28  text-center">Time</th>
                          {returnDate &&  <th scope="col" className="font-normal border-r-gray-600 border-r  py-2 px-2 w-24  text-center">Return</th>}
                            <th scope="col" className="font-normal border-r-gray-600 border-r  py-2 px-10 w-32  text-center">Toll</th>
                            <th scope="col" className="font-normal border-r-gray-600 border-r  p-2 px-6 w-36 text-center">Fare</th>
                            <th scope="col" className="font-normal border-r-gray-600 border-r  py-2 px-6 w-36 text-center">Book</th>
                            </tr>
                            
                        </thead>
                        
                        <tbody>

                             {/* ========================================================== Vehicle and Fare Information 1 */}
                                    {BookingFareDetails?.map((e, index) => ( 
                                  <tr key={index} >
                                      <td   className="p-2 flex flex-col items-center relative"> <FaCircleExclamation className="w-4 h-4 text-amber-500 shadow-sm absolute left-2 top-2 animate-pulse cursor-pointer" 
                                      onClick={() => toggleBadge(index)}
                                      />
                                          <img className="w-16 h-16 rounded-full " src={e.imagelink} />
                                          <p className="pt-2 font-medium table">{e.vehicle}</p> <span className="text-xs text-gray-500 ">Or Equilant</span>

                                          {activeBadge === index &&<div className={`bg-[--bglight] dark:bg-[--bgdark] w-60 shadow-xl  rounded-lg absolute left-6 top-5 text-xs z-10 `}>
                                              <ul className="list-disc p-3 ml-3 relative">
                                                  <IoCloseCircleSharp className="w-5 h-5 absolute right-1 top-1 hover:text-gray-200  " 
                                                  onClick={() => toggleBadge(index)} />
                                                  <br />
                                                  <li>Pay {e.perkmCharge} rupees/Km after {e.calculatedBaseKM} Km</li>
                                                  <li>Parking is payable by Passanger</li>
                                                  <li>Night Charges starts after 07:00 PM</li>
                                                  <li>Night Charges {e.nightCharge} INR till 08:00 AM</li>
                                                  <li>Pay {e.perHourCharge} INR per/Hr after 4Hr </li>
                                              </ul>
                                          </div>}
                                      </td>
                                      {/* =======================================   From */}
                                      <td className="p-2 text-center place-items-center "> <div className="w-full flex-col items-center flex justify-center">
                                          < HiOutlineHome className="text-lg p-1 bg-green-200 mb-1 text-green-700  rounded-full block w-6 h-6 text-center" />
                                          <p className="pt-2 font-normal table text-xs text-wrap text-gray-500 dark:text-gray-400">{tripDetails.OriginInformation.address}</p> </div>
                                      </td>
                                      {/* =======================================   To */}

                                      <td className="p-2 text-center place-items-center "> <div className="w-full flex-col items-center flex justify-center">
                                          < HiOutlineHomeModern className="mb-1 text-lg p-1 bg-blue-300 text-blue-600  rounded-full block w-6 h-6 text-center" />
                                          <p className="pt-2 font-normal table text-xs text-wrap text-gray-500 dark:text-gray-400">{tripDetails.Destinationformation.address}</p> </div>
                                      </td>
                                      {/* =======================================   Trip Type */}
                                      <td className="pr-2 text-center place-items-center "> <div className="w-full flex justify-center">
                                          <BiTrip className="mb-1 w-9 h-9 p-1  text-green-600  block " /> </div>
                                          <span className=" px-2 py-1 bg-green-300 text-green-800 rounded-full text-xs font-semibold ">{tripDetails.tripType}</span></td>

                                      {/* =======================================   Trip Date */}
                                      <td className="pr-2 place-items-center text-center"> <div className="w-full flex justify-center">
                                          <FcCalendar className="mb-1 w-9 h-9 p-1 block  " /></div>
                                          <span className=" px-2 py-1 bg-blue-300 text-blue-600 rounded-full text-xs font-semibold shadow-sm">{tripDetails.TripDate}</span></td>


                                      {/* =======================================   Trip Time */}
                                      <td className="pr-2  place-items-center text-center"> <div className="w-full flex justify-center">
                                          <FcClock className="mb-1 w-9 h-9 p-1    block  " /></div>
                                          <span className=" px-2 py-1 bg-purple-300 text-purple-600 rounded-full text-xs font-semibold shadow-sm">{tripDetails.pickupTime}</span></td>


                                      {/* =======================================   Trip Return Date */}
                                      {returnDate &&
                                          <td className="pr-2   place-items-center text-center"> <div className="w-full flex justify-center">
                                              <FcCalendar className="mb-1 w-9 h-9 p-1  text-blue-600   block " /></div>
                                              <span className=" px-2 py-1 bg-blue-300 text-blue-600 rounded-full text-xs font-semibold shadow-sm">{returnDate}</span></td>
                                      }

                                      {/* =======================================   Tolls */}
                                      <td className="pr-2  place-items-center text-center"> <div className="w-full flex justify-center">
                                          <SiToll className="mb-1 w-10 h-10 p-1  text-green-600   block " /></div>
                                          <span className=" px-2 py-1 bg-blue-300 text-blue-600 rounded-full text-xs font-semibold shadow-sm">{e.tollCharge}</span></td>

                                      {/* =======================================   Fare */}
                                      <td className="pr-2  place-items-center text-center"> <div className="w-full flex flex-col items-center justify-center">
                                          <FcMoneyTransfer className=" w-6 h-6 p-1  text-green-600   block " />

                                          <span className="font-semibold text-sm line-through">{e.fare}</span>
                                          <span className="text-xs">Discount {e.discount}</span>
                                          <span className=" px-2 py-1 text-2xl  font-semibold">{e.fare - e.discount}</span></div></td>

                                      {/* =======================================   Book */}
                                      <td className="  place-items-center text-center"> <div className="w-full flex flex-col items-center justify-center">
                                          <GiPathDistance className="w-5 h-5 text-center" />
                                          <p className="text-xs font-semibold flex gap-3">{e.calculatedBaseKM} Km </p>
                                          <button className="shadow-md px-4 py-2  mt-2 cursor-pointer bg-[--c1] capitalize transition-colors duration-300 transform bg-green-300  text-black rounded-md text-2xl font-semibold hover:bg-green-400 hover:scale-95 flex items-center justify-center " onClick={()=>CaptureSelectionInfo(index)}>BOOK<GoChevronRight /></button></div></td>

                                  </tr> )) }
                        </tbody>
                    </table>
                                   


                </div>
            </div>
        </div>

    </div>

       
        

    
</section>
  );
};


// <tr>
//                                       <td className="p-2 flex flex-col items-center relative"> <FaCircleExclamation className="w-4 h-4 text-amber-500 shadow-sm absolute left-2 top-2 animate-pulse cursor-pointer" onClick={() => setKmInfoBadge((prev) => !prev)} />
//                                           <img className="w-16 h-16 rounded-full " src="https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/Wagon-R-tour/9442/1675922710720/front-left-side-47.jpg" />
//                                           <p className="pt-2 font-medium table">Innova-Crysta</p> <span className="text-xs text-gray-500 ">Or Equilant</span>

//                                           <div className={`bg-[--bglight] dark:bg-[--bgdark] w-60 shadow-xl  rounded-lg absolute left-6 top-5 text-xs ${kmInfoBadge === true ? "block" : "hidden"}`}>
//                                               <ul className="list-disc p-3 ml-3 relative">
//                                                   <IoCloseCircleSharp className="w-5 h-5 absolute right-1 top-1 hover:text-gray-200 " onClick={() => { setKmInfoBadge(false) }} />
//                                                   <br />
//                                                   <li>Pay 15rupees/Km after 254 Km</li>
//                                                   <li>Parking is payable by Passanger</li>
//                                                   <li>Night Charges starts after 07:00 PM</li>
//                                                   <li>Night Charges 600 INR till 08:00 AM</li>
//                                               </ul>
//                                           </div>


//                                       </td>



//                                       {/* =======================================   From */}
//                                       <td className="p-2 text-center place-items-center "> <div className="w-full flex-col items-center flex justify-center">
//                                           < HiOutlineHome className="text-lg p-1 bg-green-200 mb-1 text-green-700  rounded-full block w-6 h-6 text-center" />
//                                           <p className="pt-2 font-normal table text-xs text-wrap text-gray-500 dark:text-gray-400">G.T. Road Samalkha, Near Bus Stand , Machrolli, Samalkha Panipat</p> </div>
//                                       </td>
//                                       {/* =======================================   To */}

//                                       <td className="p-2 text-center place-items-center "> <div className="w-full flex-col items-center flex justify-center">
//                                           < HiOutlineHomeModern className="mb-1 text-lg p-1 bg-blue-300 text-blue-600  rounded-full block w-6 h-6 text-center" />
//                                           <p className="pt-2 font-normal table text-xs text-wrap text-gray-500 dark:text-gray-400">G.T. Road Samalkha, Near Bus Stand , Machrolli, Samalkha Panipat</p> </div>
//                                       </td>
//                                       {/* =======================================   Trip Type */}
//                                       <td className="pr-2 text-center place-items-center "> <div className="w-full flex justify-center">
//                                           <BiTrip className="mb-1 w-9 h-9 p-1  text-green-600  block " /> </div>
//                                           <span className=" px-2 py-1 bg-green-300 text-green-800 rounded-full text-xs font-semibold ">OneWay</span></td>

//                                       {/* =======================================   Trip Date */}
//                                       <td className="pr-2 place-items-center text-center"> <div className="w-full flex justify-center">
//                                           <FcCalendar className="mb-1 w-9 h-9 p-1 block  " /></div>
//                                           <span className=" px-2 py-1 bg-blue-300 text-blue-600 rounded-full text-xs font-semibold shadow-sm">23/01/2025</span></td>


//                                       {/* =======================================   Trip Time */}
//                                       <td className="pr-2  place-items-center text-center"> <div className="w-full flex justify-center">
//                                           <FcClock className="mb-1 w-9 h-9 p-1    block  " /></div>
//                                           <span className=" px-2 py-1 bg-purple-300 text-purple-600 rounded-full text-xs font-semibold shadow-sm">12:35 PM</span></td>


//                                       {/* =======================================   Trip Return Date */}
//                                       {returnDate &&
//                                           <td className="pr-2   place-items-center text-center"> <div className="w-full flex justify-center">
//                                               <FcCalendar className="mb-1 w-9 h-9 p-1  text-blue-600   block " /></div>
//                                               <span className=" px-2 py-1 bg-blue-300 text-blue-600 rounded-full text-xs font-semibold shadow-sm">{returnDate}</span></td>
//                                       }

//                                       {/* =======================================   Tolls */}
//                                       <td className="pr-2  place-items-center text-center"> <div className="w-full flex justify-center">
//                                           <SiToll className="mb-1 w-10 h-10 p-1  text-green-600   block " /></div>
//                                           <span className=" px-2 py-1 bg-blue-300 text-blue-600 rounded-full text-xs font-semibold shadow-sm">as per Actual</span></td>

//                                       {/* =======================================   Fare */}
//                                       <td className="pr-2  place-items-center text-center"> <div className="w-full flex flex-col items-center justify-center">
//                                           <FcMoneyTransfer className=" w-6 h-6 p-1  text-green-600   block " />

//                                           <span className="font-semibold text-sm line-through">6540</span>
//                                           <span className="text-xs">Discount 10%</span>
//                                           <span className=" px-2 py-1 text-2xl  font-semibold">5886</span></div></td>

//                                       {/* =======================================   Book */}
//                                       <td className="  place-items-center text-center"> <div className="w-full flex flex-col items-center justify-center">
//                                           <GiPathDistance className="w-5 h-5 text-center" />
//                                           <p className="text-xs font-semibold flex gap-3">254 Km </p>
//                                           <button className="shadow-md px-4 py-2  mt-2 cursor-pointer bg-[--c1] capitalize transition-colors duration-300 transform bg-green-300  text-black rounded-md text-2xl font-semibold hover:bg-green-400 hover:scale-95 flex items-center justify-center ">BOOK<GoChevronRight /></button></div></td>

//                                   </tr>