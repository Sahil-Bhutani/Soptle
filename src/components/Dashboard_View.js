import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Dashboard_View = () => {
    const navigate=useNavigate()
    const { state } = useLocation();
    const [value,setValue]=useState(state.item.booking_seats)
  return <>
    <div className='flex flex-col max-w-7xl mx-auto flex justify-center items-center h-[100vh] space-y-10'>
    <div className=' flex justify-center items-center  '>
        {value.map((item,index)=>{
          return  <div key={index}>
            <div className={`p-[14px]  m-[5px] text-white cursor-pointer ${item.status ?  "bg-gray-500 pointers-event-none" : "bg-blue-500"}`}>{item.value}</div>
          </div>
        })}</div>
        <div className='flex flex-col w-[350px] text-center font-medium'>
            <h1>Available seats representing <span className='text-blue-500'>Blue color</span></h1>
            <h1>Booked Seats representing <span className='text-gray-500'>Gray color</span></h1>
            <h1 className='bg-indigo-500 text-white p-3 my-5 cursor-pointer' onClick={()=>navigate('/dashboard')}>Go Back</h1>
        </div>
    </div>
  </>
}

export default Dashboard_View