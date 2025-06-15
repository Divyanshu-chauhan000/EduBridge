import React from 'react'
import img1 from '../assets/loginimg.png'
import Button from '../components/Button'
const Login = () => {
  return (
    <div className='bg-black h-[90vh] flex justify-center items-center'>
      <div className='flex justify-center '>
        <div className='flex justify-center item-center h-[50vh]'>
          <img src={img1} alt="" />
        </div>
        <div className='flex-cols ml-12 justify-center item-center h-[50vh] w-[30vw]'>
          <h1 className='text-7xl text-white font-soul text-bold '>Edugram</h1>

          <input className='p-1 w-64 bg-transparent border mt-6 text-white' type="text" placeholder='Email or Username ' />
          <br />
          <input className='p-1 w-64 bg-transparent border mt-2 text-white' type="password" placeholder='Password' />
          <Button text='Login' className='w-64 mt-3 ' />
          <div className="flex w-64 items-center justify-center my-6">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login