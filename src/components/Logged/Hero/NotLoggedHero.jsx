import React from 'react'
import globe from "../../../imgs/travel.png";

const NotLoggedHero = () => {
  return (
    <div className=''>
        <div className='parent-container'>
             <h1 className='font-semibold font-Karla capitalize mt-3 text-center text-[1.79em]'>Happy <span className='text-darkBlue'>to</span> See You <span className='text-darkBlue'>You</span> Here</h1>
             <div className='md:flex md:flex-row-reverse md:items-center md:justify-evenly'>
                <div className='imageContainer'>
                    <img src={globe} alt='globe' className='max-w-[500px] max-h-[500px] w-[100%] h-[100%] object-cover'/>
                </div>
                <div className='max-w-[500px]'>
                    <p className='font-karla font-medium text-[1.3em]'>We provide the <span className='text-darkViolet'>Experimental</span> Mode to our new <span className='text-darkViolet'>users</span> so that they can easily explore and <span className='text-darkViolet'>explore</span> with our features and <span className='text-darkViolet'>registered</span> users.
                    <br/>
                    Notice <span className='text-darkViolet'>*</span> :
                    In this mode you cannot post or manipulate the data of other <span className='text-darkViolet'>users</span>.
                    </p>
                </div>
                
             </div>
        </div>
     
    </div>
  )
}

export default NotLoggedHero
