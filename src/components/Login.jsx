import React from 'react'
import Logo from './Logo'

const Login = () => {
  return (
    <div className='h-screen bg-darkColor text-white'>
      <div className='contentWrapper parent-container flex flex-col h-[100%]'>

        <div className='navbar flex items-center justify-between py-3'>
          <div className='cursor-pointer'>
            <Logo/>
          </div>
          <div>
            <i className="bi bi-chevron-down"></i>
          </div>
        </div>

        <div className='hero'>
            <h2 className='font-Open text-[1.4em] font-bold'>Log in and start exploring</h2>
        </div>

        <div className='footer'>
          <p>Footer here</p>
        </div>

      </div>
      
    </div>
  )
}

export default Login
