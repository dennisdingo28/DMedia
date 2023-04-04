import React from 'react'
import Logo from './Logo'
import errorImage from "../../imgs/404.png";
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

  return (
    <div className='bg-dark min-h-[100vh] text-white'>
      <div className='parent-container py-2 flex flex-col min-h-[100vh]'>
        <div className='errorHeader flex items-center justify-between'>
            <div>
                <Logo/>
            </div>
            <div>
                <p className='font-Open tracking-widest font-medium text-[1.1em]
                '>Status:<span className='text-darkPurple'>4</span>0<span className='text-darkPurple'>4</span></p>
            </div>
        </div>
        <div className='errorBody flex-1 flex items-center justify-center flex-col sm:flex-row sm:gap-12'>
            <div className='flex items-center justify-center flex-col gap-6'>
                <img className='max-w-[300px] max-h-[300px]' src={errorImage} alt='error'/>
                <h1 className='font-bold text-[1.6em] tracking-wider'><span className='text-darkPurple'>4</span>0<span className='text-darkPurple'>4</span> - Not Found</h1>
            </div>
            <div>
                <button onClick={()=>{
                    navigate('/')
                }} className='bg-darkBlue mt-4 w-[100%] py-2 rounded-sm font-Karla font-semibold text-[1.3em] hover:bg-blue-700 duration-100 max-w-[300px] px-4'>Take Me Home</button>
            </div>
            
        </div>
        <p className='text-center font-medium font-Open text-[1.1em]'>Copyright 2023.All rights reserved.</p>
      </div>
    </div>
  )
}

export default NotFoundPage
