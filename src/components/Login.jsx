import React, { useState } from 'react'
import Logo from './Logo'

const Login = () => {
  const [showPassword,setShowPassword] = useState(false);
  return (
    <div className='min-h-[100vh] bg-darkColor text-white'>
      <div className='contentWrapper parent-container flex flex-col min-h-screen'>

        <div className='navbar flex items-center justify-between py-4'>
          <div className='cursor-pointer'>
            <Logo/>
          </div>
          <div>
            <i className="bi bi-chevron-down"></i>
          </div>
        </div>
        <h1 className='welcomeMessage text-center text-[2.3em] mt-10 font-medium'>Welcome to the most modern social media application.</h1>
        <div className='hero flex-1 flex items-center justify-center'>
          <div className='loginForm w-[100%] flex flex-col'>
            <div className='loginWrapper bg-[#090909] rounded-md p-3 flex flex-col'>
             <h2 className='font-Open mb-4 text-[1.4em] font-bold text-start'>Log in and start exploring</h2>
              <div className='loginForm flex flex-col gap-5'>
                <div className='emailForm flex items-center gap-3'>
                  <i className="bi bi-envelope-at"></i>                
                  <input type="email" className='bg-transparent w-[100%] outline-none' placeholder='email'/>
                </div>
                <div className='passwordForm flex items-center gap-3'>
                  <i className="bi bi-shield-lock-fill"></i>                
                  <input type={!showPassword ? "password":"text"} className='bg-transparent w-[100%] outline-none' placeholder='password'/>
                  {!showPassword ? <i className="bi bi-eye-slash cursor-pointer hover:bg-gray-800 rounded-sm px-1 duration-[.25s]" onClick={e=>setShowPassword(true)}></i>:<i className="bi bi-eye cursor-pointer hover:bg-gray-800 rounded-sm px-1 duration-[.25s]" onClick={e=>setShowPassword(false)}></i>}
                </div>
              </div>
              <div className='mt-6 text-center'>
                <button className='bg-darkPurple px-3 py-1 rounded-sm hover:shadow-[0px_0px_5px_#4b2cb0] font-medium font-Open lowercase duration-[.10s] active:scale-[.90]'>Login Me</button>
              </div>
            </div>
          </div>
        </div>

        <div className='footer'>
          <p>Footer here</p>
        </div>

      </div>
      
    </div>
  )
}

export default Login
