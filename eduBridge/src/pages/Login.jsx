import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {NavLink} from 'react-router-dom'
import img1 from '../assets/loginimg.png'
import Button from '../components/Button'
import { FaFacebook } from "react-icons/fa";

const Login = () => {

   const navigate = useNavigate();
   const[username, setUserName] = useState("");
   const[password, setPassword] = useState('');

   const handleLogin = async(e)=>{
    e.preventDefault();
    if(!username || !password){
      alert("Username and Password Required");
      return;
    }
    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username: username.toLowerCase(),
          password: password})
      });
      const data = await res.json();

      if(res.status === 200){
        localStorage.setItem("username",data.username)
        localStorage.setItem("token",data.token);
        alert("Login Succesfull");
        navigate(`/profile/${data.userId}`);
      }
      else{
        alert(`${data.message || "Login failed"}`);
      }
    }
    catch(err){
     console.log("Error :", err);
    alert("Server error")
    }
   }

  return (
    <div className='bg-black h-[100vh]'>
      <div className='bg-black h-[90vh] flex justify-center items-center'>
      <div className='flex justify-center '>
        <div className='flex justify-center item-center h-[50vh]'>
          <img src={img1} alt="" />
        </div>
        <div className='flex-cols ml-12 justify-center items-center h-[50vh] w-[30vw]'>
          <h1 className='text-7xl text-white font-soul font-bold '>Edugram</h1>

          <input  className='p-1 w-64 bg-transparent border mt-6 text-white' type="text" placeholder='Email or Username ' value={username} onChange={(e)=>setUserName(e.target.value.toLowerCase())} />
          <br />
          <input className='p-1 w-64 bg-transparent border mt-2 text-white' type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
          <Button text='Login' className='w-64 mt-3 'onClick={handleLogin} />
          <div className="flex w-64 items-center justify-center my-6">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>
          <div className='mx-8'>
            <button className='flex space-x-4' ><FaFacebook className="text-blue-600 text-2xl hover:text-blue-800 transition" />
            <h5 className='text-blue-600 hover:text-blue-800 transition' >
            Login with Facebook
              </h5></button>
          </div>
          <div className='mx-16 mt-3'>
            <a href=""><h2 className='text-gray-300'>Forgot password?</h2></a>
          </div>
          <div className='text-[15px] mx-6 mt-6'>
            <span className='text-gray-300'>Don't have any account? <NavLink className="text-blue-600 hover:text-blue-800 transition" to='/register' >Sign Up</NavLink></span>
          </div>
        </div>
      </div>
    </div>
    <div className='text-gray-300 text-center font-thin text-[15px] p-5 bg-black'>
      <ul className='space-x-8'>
        <NavLink to="">Meta</NavLink>
        <NavLink to="">About</NavLink>
        <NavLink to="">Jobs</NavLink>
        <NavLink to="">Help</NavLink>
        <NavLink to="">API</NavLink>
        <NavLink to="">Privacy</NavLink>
        <NavLink to="">Terms</NavLink>
        <NavLink to="">Locations</NavLink>
        <NavLink to="">Contact</NavLink>
        <NavLink to="">Meta Verified</NavLink>
      </ul>
      <h1 className='mt-3'>2025 Edugram From Meta</h1>
    </div>
    </div>
  )
}
export default Login