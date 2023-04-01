
import React from 'react'
const Logo = () => {
  return (
    <a href="/" className='logoWrapper'>
        
        <div className='roundedBody relative bg-darkPurple h-[4em] w-[4em] max-w-[64px] max-h-[64px] rounded-full'>
            <div className='line w-[12px] h-[2.3px] bg-black absolute top-[10px] left-[13px]'>

            </div>
            <div className='line w-[18px] h-[1.5px] bg-black absolute top-[8px] left-[30px]'>

            </div>
            <div className='line w-[25px] h-[2px] bg-black absolute top-[25px] left-[5px]'>

            </div>
            <div className='line w-[15px] h-[2px] bg-black absolute top-[30px] left-[40px]'>

            </div>
            <div className='line w-[15px] h-[2px] bg-black absolute top-[40px] left-[8px]'>

            </div>
            <div className='line w-[17px] h-[2px] bg-black absolute top-[50px] left-[30px]'>

            </div>

            <div className='absolute top-0 left-0 text-yellow-500'>
                <i className="bi bi-star"></i>
            </div>

            <div className='absolute top-0 right-[5px] smallPlanet rounded-full w-[.9em] h-[.9em] bg-darkViolet'>

            </div>

            <div className='absolute bottom-0 right-[-8px] smallPlanet rounded-full w-[.9em] h-[.9em] bg-darkBlue'>

            </div>

            <h1 className='font-Open font-bold text-center text-[18px] textLogo left-[50%] ml-1 -translate-x-[50%] -bottom-[30px] absolute text-white'>DMedia</h1>

        </div>
        
       
    </a>
  )
}

export default Logo
