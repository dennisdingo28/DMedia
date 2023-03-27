import React from 'react'
import Logo from './Logo'

const Login = () => {
  return (
    <div className='bg-darkColor min-h-[100vh] text-white'>
      <div className='navbar flex items-center justify-between'>
        <div>
          <Logo/>
        </div>
        <div>
          <i className="bi bi-chevron-down"></i>
        </div>
      </div>
    </div>
  )
}

export default Login
