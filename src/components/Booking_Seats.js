import React,{useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';

const Booking_Seats = () => {
    const navigate=useNavigate()
    const { state } = useLocation();
    const [value,setValue]=useState(state.item.booking_seats);
    const [ trueCount,setTrueCount]=useState(0);
    const ticket_price=state.item.ticket_price;
    const [id,setId]=useState(state.item.id);
    const [flightData,setFlightData]=useState([]);
    const [book,setBook]=useState('Book Now')

    const handleSeatClick = (index) => {
        const updatedSeats = [...value];
        updatedSeats[index].status = !updatedSeats[index].status;
        setValue(updatedSeats);
      };

      useEffect(() => {
        const trueSeats = value.filter((seat) => seat.status);
        setTrueCount(trueSeats.length);
      }, [value]);

      const getAllFlightData = () => {
        axios
          .get("http://localhost:3001/fromCountry")
          .then((res) => {
            setFlightData(res.data)
          })
          .catch((error) => {
            console.log("error is", error);
          });
      };

      useEffect(()=>{
        getAllFlightData();
      },[])

      const bookTicket = () => {
        for(var i=0;i<=flightData.length;i++){
          if(flightData[i]?.id == state?.item?.id){
            flightData[i] = state.item
          }
        }
        setFlightData(flightData);
        axios.put(`http://localhost:3001/fromCountry/${state.item.id}`,state.item).then((res)=>{
          console.log(res.data)
        }).catch((error)=>{
          console.log("Error",error)
        })
        getAllFlightData();
        setBook('Booked')
      };
      const logOut=()=>{
        navigate("/");
        localStorage.removeItem('register')
      }
      

  return (
    <div className='flex flex-col  max-w-7xl mx-auto items-center justify-center '>
      <div className='my-10'>
      <h1 className='font-medium'>Book Ticket for this flight Below</h1>
      </div>
    <div className=' flex justify-center items-center'>
      
        {value.map((item,index)=>{
          return  <div key={index}>
            <div className={`p-[14px]  m-[5px] cursor-pointer ${item.status ?  "bg-gray-500 pointers-event-none" : "bg-blue-200"}`} onClick={()=>handleSeatClick(index)}>{item.value}</div>
          </div>
        })}</div>
        <div className='flex justify-center my-10'>
            <h1 className={` text-white rounded-lg px-4 py-2 ${book == 'Book Now' ? "bg-blue-700 hover:bg-blue-800" : "bg-green-500"} cursor-pointer text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-blue-500`} onClick={bookTicket}>{book} {trueCount == 0 || book =='Booked' ? "" : 
            <span>{trueCount * ticket_price} Rs</span>}
            </h1>
        </div>
        <div className='flex space-x-5 w-full justify-center'>
            <h1 className='bg-red-500 p-2 cursor-pointer text-sm font-medium text-white' onClick={logOut}>Log Out</h1>
            <h1 className='bg-indigo-500 p-2 cursor-pointer text-sm font-medium text-white' onClick={()=> navigate("/booking")}>Go Back</h1>
            </div>
    </div>
  )
}

export default Booking_Seats