import React, { useState } from 'react'
import Button from '../components/Button'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const VerifyOtp = () => {
  const location = useLocation();
  const email = location.state?.email;
  const[otp,setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async ()=>{
    if(otp.length !==6){
      alert("Enter a 6-digit OTP");
      return;
    }
    try{
      const res = await fetch("http://localhost:5000/api/verify-otp",{
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({email,otp})
      });
      const data = await res.json();

      if(res.status=== 200){
        alert("OTP Verified");
        navigate("/");
      }
      else{
        alert(data.message || "Invalid OTP");
      }
    }
    catch(err){
      alert("Server Error");
      console.log(err)
    }
  }

  return (
    <div className="bg-black h-[100vh] flex justify-center items-center">
      <div className="bg-gray-900 p-8 rounded-md shadow-lg w-[90vw] md:w-[30vw] text-white">
        <h1 className="text-4xl font-soul font-bold text-center mb-6">Edugram</h1>

        <p className="text-center text-gray-300 mb-4">
          We’ve sent a 6-digit OTP to your email:
          <br />
          <span className="text-blue-400 font-medium">{email}</span>
        </p>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full text-center text-2xl tracking-widest p-2 bg-transparent border text-white rounded"
        />

        <Button text="Verify & Continue" className="w-full mt-4" onClick={handleVerify} />

        <div className="text-center text-gray-400 mt-4 text-sm">
          Didn't receive OTP? <span className="text-blue-400 cursor-pointer hover:underline">Resend</span>
        </div>
      </div>
    </div>
  )
}

export default VerifyOtp