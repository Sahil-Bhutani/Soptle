import React,{useState} from 'react';
import { mockData } from './common/mockData';
import { useNavigate } from 'react-router-dom';

const Login_Admin = () => {

    const navigate = useNavigate();
    const[field,setField]=useState({
        id:'',
        email:"",
        password:"",
    })
    const [message,setMessage]=useState('')

    const handleChange=(event)=>{
        setField({...field,[event.target.name]:event.target.value})
    }

    const handleSubmit = (e) => {
        console.log("Reached")
        e.preventDefault();
        const user = mockData.find(
          (userData) => userData.email == field.email && userData.password == field.password
        );
        if (user) {
            setMessage('User logged in successfully')
            navigate("/dashboard");
            setField({
                id:'',
                email:"",
                password:"",
            })
        } else {
            setMessage('Invalid username or password')
        }
      };

  return (
      <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Log In to Dashboard
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" value={field.email} onChange={handleChange} />
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={field.password}  onChange={handleChange} />
                  </div>
                  <button type="submit" className="w-full text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] dark:focus:ring-primary-800">Acess Dashboard</button>
                 <h1 className='text-center'>OR</h1>
                  <p className='w-full text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] dark:focus:ring-primary-800 cursor-pointer' onClick={()=>navigate("/")}>Register Here</p>
                  <p className='text-center'>{message}</p>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default Login_Admin