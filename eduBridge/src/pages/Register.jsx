import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Register = () => {
  const navigate = useNavigate();
  const [ username , setUserName] = useState("");
  const [password , setPassword] = useState("");
  const [otp , setotp] = useState("");
  const [otpSent , setOtpSent] = useState(false);
  const [ email , setemail] = useState("");


  const handlesendOtp = async () => {
  if (!email || !username || !password) {
    alert("Please fill all fields before sending OTP");
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("OTP sent to your email");
      setOtpSent(true)
      navigate('/verify-otp', {
        state: {
          email,
          username,
          password,
        },
      });
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert("Failed to send OTP");
  }
};

  const handleverifying = async ()=>{
    if(!username || !password || !otp){
      alert("Please Fill the details");
      return;
    }

    try{
      console.log("Sending OTP verify request with:", { email, otp });
      const otpRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/verify-otp`,{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({email,otp})
      });

      const otpData = await otpRes.json();

      if(otpRes.ok){
        console.log("OTP Verified ✅, Now Registering:", { username, password, email });
        const regRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`,{
          method : "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({username: username.toLowerCase(),password,email: email.toLowerCase()})
          
        });
        
        const regData = await regRes.json();

        if(regRes.ok){
          alert("Registration successfull. Please Login");
          console.log("New save user ", username, password, email)
          navigate("/");
        }
        else{
          alert(regData.message);
        }
      }
      else{
        alert(otpData.message);
      }
    }
    catch(err){
       console.log(err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Server error during registration");
    }
  };

  return (
   <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[350px]">
        <h2 className="text-2xl font-bold mb-4 text-center">Register to Edugram</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-3"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!otpSent ? (
          <button
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            onClick={handlesendOtp}
          >
            Send OTP
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border p-2 mt-3 mb-3"
              value={otp}
              onChange={(e) => setotp(e.target.value)}
            />
            <button
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
              onClick={handleverifying}
            >
              Verify & Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};
  

export default Register