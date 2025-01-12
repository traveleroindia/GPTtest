// vahicle image & name, base fare, discount, tolls(included,excluded),  from, to, distance,date,pickup time

import Image from 'next/image';
import desire from '../../../../public/images/desire.png';
import toll from '../../../../public/images/toll.png';
import { FaRoadBarrier } from "react-icons/fa6";
import { PiCurrencyInr } from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";
import { RiHome4Line } from "react-icons/ri";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { GiRoad } from "react-icons/gi";
import { BiTime } from "react-icons/bi";
export default function SearchedRides() {
    const textContent = 'Included';
    const amount = textContent.includes('Included') ? 0 : 250;



    return (
        <div className="container w-11/12 p-5 rounded-sm mb-5">
<div className="w-full p-4 mx-2 flex flex-col justify-between shadow-sm ">
               
               <div className='grid grid-cols-9 justify-between items-center text-base  p-2 border-b border-slate-500 font-semibold text-center  '>
               <p ></p>
               <p >Vehicle</p>
                <p>Fare & Discount</p>
                <p >Toll</p>
                <p>From</p>
                <p>To</p>
                <p>Date</p>
                <p>Pickup at</p>
                <p className='text-right'></p>
               </div>
               
               <div className='grid xl:grid-cols-9 md:grid-cols-1 mt-3  items-start text-lg font-bold h-36 shadow-lg rounded-md '>
               <div className=' flex  justify-center place-items-center h-full relative   '>
                    <Image src={desire} alt='vehicleImage' className='w-5/6 h-5/6 object-contain rounded-lg  shadow-sm ' />
                                    </div>

               <div className=' flex  justify-center place-items-center h-full relative  '>
                    <div className='text-center'>
                    <h3 className='text-2xl'>Desire</h3>
                    <span className='text-xs font-thin'>or Equilant</span> </div>
                </div>

                <div className='flex flex-col justify-center place-items-center h-full  '>
                    <div className='text-center'>
                    <h3 className='line-through '>3500</h3>
                    <span className='text-xs flex items-center text-[--c1hover]'>Discount <PiCurrencyInr />250 </span>
                    <h2 className='text-3xl bottom-4  text-[--dark] mt-2 bg-[--c1] rounded '>3250</h2>

                </div></div>

                    <div className=' flex flex-col justify-center place-items-center h-full   '>
                        <div className='flex flex-col justify-center items-center'>
                            <FaRoadBarrier className='w-6 h-auto' />
                            <span className='text-xs  flex items-center text-[--c1hover]'>{textContent} <PiCurrencyInr />{amount}</span>
                            <h2 className='text-2xl '>Free</h2>
                        </div>
                    </div>


                    <div className=' flex flex-col justify-center place-items-center h-full relative   '>
                        <RiHome4Line className='w-6 h-auto'/>
                        <div className='flex text-xs font-light justify-center items-center text-center mt-2'>Street no 5, Shiv Mandir Road, Palam Vihar Ext. Gurgaon 122017</div>
                    
                    </div>

                    <div className=' flex flex-col justify-center place-items-center h-full   '>
                        <MdOutlineMapsHomeWork className='w-6 h-auto'/>
                        <div className='flex text-xs font-light justify-center items-center text-center mt-2'>Street no 5, Shiv Mandir Road, Palam Vihar Ext. Gurgaon 122017</div>
                    </div>

                    <div className=' flex flex-col justify-center place-items-center h-full   '><IoCalendarOutline /> <div className='mt-2'>20/3/2025</div> </div>
                    <div className=' flex flex-col justify-center place-items-center h-full   '><BiTime /> <div className='mt-2'>12:35:PM</div> </div>

                    <div className=' flex flex-col justify-center place-items-end h-full   '>
                    <div className='flex flex-col justify-center items-center'>
                            <GiRoad className='w-6 h-auto' />
                            <h2 className='text-xl   text-[--dark] mt-2  text-nowrap'>550 km</h2>
                            <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 
                    hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg
                     shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-9 py-2.5 text-center me-2 mb-2">Book</button>

                        </div>
                    
                    
                    
                   
                     </div>
</div>

</div>

        </div>
    )
};