import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate=useNavigate();
    const [totalCount,setTotalCount]=useState(0);
    const [value,setValue]=useState([]);
    const [show,setShow]=useState(false)
    function geTotalBookingToday(){
        axios.get("http://localhost:3001/fromCountry")
        .then((res) => {
            setValue(res.data)
            console.log(res.data)
        })
        .catch((error) => {
          console.log("error is", error);
        });
    }

    useEffect(() => {
        if(value.length>0){
            const trueSeatsCount = value.reduce((count, obj) => {
                const trueSeats = obj.booking_seats.filter(seat => seat.status === true);
                return count + trueSeats.length;
              }, 0);
              setTotalCount(trueSeatsCount)
        
            }
      }, [value]);

    useEffect(()=>{
        geTotalBookingToday();
    },[])

    const navigation = (item,index)=>{
        navigate('/dashboard-view', { state: { item } });
      }

  return (
   <section className='max-w-7xl mx-auto'>
    <div className='w-[300px] m-auto'>
    <div className='flex justify-center items-center my-10 bg-gray-100 py-5 flex-col '>
        <h1 className='font-medium text-lg'>Total Tickets Booked Today :- {totalCount}</h1>
    </div>
    <div>
    <p className='bg-indigo-500 text-white text-lg p-2 cursor-pointer font-medium ' onClick={()=>setShow(!show)}>Show Flight Wise Booked Tickets</p>
    <p className='bg-red-500 text-white text-lg p-2 cursor-pointer my-5 text-center font-medium' onClick={()=>navigate("/loginadmin")}>Log Out</p>
    </div>
    </div>
    {show?  
    <div>  
<div className="relative overflow-x-auto my-5 h-[500px] border-2 border-black">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 text-center">
                    FROM
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    To Destination
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Timings
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Tickets Booked
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    See Detailed List
                </th>
            </tr>
        </thead>
        <tbody className=''>
            {value.map((item,index)=>(
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 text-center">
                   {item.from}
                </td>
                <td className="px-6 py-4 text-center">
                {item.to}
                </td>
                <td className="px-6 py-4 text-center">
                {item.timing}
                </td>
                <td className="px-6 py-4 text-center">
                {item?.booking_seats?.filter(data => data.status === true).length}
                </td>
                <td className="px-6 py-4 text-center" onClick={()=>navigation(item)}>
               <h1 className='bg-green-500 p-2 text-white text-lg cursor-pointer'>View</h1>
                </td>
            </tr>))}
        </tbody>
    </table>
</div>
    </div>: ""}
   </section>
  )
}

export default Dashboard