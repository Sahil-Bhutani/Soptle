import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false)
  const [filteredData,setFilteredData]=useState([])
  const [apiData, setApiData] = useState([]);
  const [fieldData, setFieldData] = useState({
    fromData: [],
    toData: [],
    departData: [],
  });
  const[flightData,setFlightData]=useState({
    from:"",
    to:"",
    depart:""
  })

  const getAllData = () => {
    axios
      .get("http://localhost:3001/fromCountry")
      .then((res) => {
        setApiData(res.data);
        console.log(res.data);
        setLoading(true)
      })
      .catch((error) => {
        console.log("error is", error);
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    if (apiData.length > 0) {
      const uniqueFromData = [...new Set(apiData.map((item) => item.from))];
      setFieldData((prevState) => ({
        ...prevState,
        fromData: uniqueFromData,
      }));
  
      // Extract unique 'to' values
      const uniqueToData = [...new Set(apiData.map((item) => item.to))];
      setFieldData((prevState) => ({ ...prevState, toData: uniqueToData }));
  
      // Extract unique 'timing' values
      const uniqueDepartData = [...new Set(apiData.map((item) => item.timing))];
      setFieldData((prevState) => ({
        ...prevState,
        departData: uniqueDepartData,
      }));
    }
  }, [apiData]);

  const { fromData,toData,departData} = fieldData;

  const handleChange=(e)=>{
    setFlightData({...flightData,[e.target.name]:e.target.value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    const newData = apiData.filter((value) => {
      if (value.from === flightData.from && value.to === flightData.to) {
        return true;
      }
      return false;
    });
    setFilteredData(newData)
  }

  const navigation = (item,index)=>{
    navigate('/booking_seats', { state: { item } });
  }
  console.log("FieldDTA",fieldData)

  return (
    <>
      <section>
        {fieldData &&   <div className="max-w-7xl mx-auto bg-white flex justify-center my-10">
          <form onSubmit={handleSubmit}>
            <h1 className="my-10  font-medium text-lg">Enter The Details:-</h1>
            <div className="grid gap-6 mb-6 md:grid-cols-3">
              <div>
                
                <select
                  name="from"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  onChange={handleChange}
                >
                  <option selected disabled>
                    From
                  </option>
                  {fromData.map((item,index)=>(
                  <option value={item} >{item}</option>))}
                </select>
              </div>
              <div>
             
                <select
                  name="to"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  onChange={handleChange}
                >
                  <option selected disabled>
                    Destination
                  </option>
                  {toData.map((item,index)=>(
                  <option value={item}>{item}</option>))}
                </select>
              </div>
              <div>
              
                <select
                  name="depart"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  onChange={handleChange}
                >
                  <option selected disabled>
                    Depart Date
                  </option>
                  {departData.map((item,index)=>(
                  <option value={item}>{item}</option>))}
                </select>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
              <h1 className='bg-red-500 p-2 cursor-pointer text-sm font-medium text-white ml-5' onClick={()=>navigate('/')}>Log Out</h1>
            </div>
          </form>
        </div> }
       
        {filteredData.length > 0 ?  
       <div className="flex space-x-10 max-w-7xl mx-auto">
       {filteredData.map((item, index) => (
         <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden md:w-[300px]">
           <div className="p-6">
            <div className=" w-full flex justify-start space-x-5">
             <h1 className="text-lg font-medium mb-2">{item.from}</h1>
             <h1 className="text-sm font-medium mb-2 mt-1">to</h1>
             <h1 className="text-lg font-medium mb-2">{item.to}</h1></div>
             <h1 className="text-gray-600 mb-4">{item.timing}</h1>
             <h1 className="text-blue-700 font-medium text-lg mb-4">Price:- {item.ticket_price} Rs</h1>
             <div className="flex justify-start ">
               <button className="bg-blue-700 text-white rounded-lg px-4 py-2 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={()=>navigation(item,index)}>
                 Book Now
               </button>
              
             </div>
           </div>
         </div>
       ))}
     </div>
     : ""}
      </section>
    </>
  );
};

export default Main;
