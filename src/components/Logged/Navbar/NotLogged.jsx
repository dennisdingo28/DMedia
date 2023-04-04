import React from 'react'

const NotLogged = () => {
  return (
    <div>
      <div className='flex items-center font-Karla font-medium'>
        <a href='/auth' className='cursor-pointer hover:text-[rgb(117,79,205)]'>Login</a>
        <small className='text-[1em] mx-2'>|</small>
        <a href='/auth' className='cursor-pointer hover:text-[rgb(117,79,205)]'>Sign Up</a>
      </div>
    </div>
  )
}

export default NotLogged