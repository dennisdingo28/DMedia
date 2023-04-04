import React from 'react'

const NotLogged = () => {
  return (
    <div>
      <div className='font-Karla font-medium'>
        <a href='/auth'>
          <div className='cursor-pointer hover:text-[rgb(117,79,205)] flex items-center'>
            <p>Login</p>
            <small className='mx-2'>|</small>
            <p>Sign Up</p>
          </div>
        </a>
      </div>
    </div>
  )
}

export default NotLogged