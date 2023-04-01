import React from 'react'

const Logged = ({user,sideMenu,setSideMenu}) => {
    console.log(sideMenu);
  return (
    <div>
        <div className='mobileMenu'>
            <div className='mobileMenuContainer'>

                <div className='menuContainer relative'>
                    <div onClick={()=>setSideMenu(true)} className='menu flex flex-col gap-1 cursor-pointer'>
                        <div className={`${sideMenu ? "activeLine":""} line line1 w-[20px] h-[2.3px] bg-white`}></div>
                        <div className={`${sideMenu ? "activeLine":""} line line2 w-[20px] h-[2.3px] bg-white`}></div>
                        <div className={`${sideMenu ? "activeLine":""} line line3 w-[20px] h-[2.3px] bg-white`}></div>
                    </div>
                  
                </div>
                   
                    <div className={`sideMenu p-2 pb-5 delay-200 fixed z-10 top-0 bottom-0 duration-150 ${sideMenu ? "right-[0px]":"-right-[100%]"} w-[100%] min-w-[150px] max-w-[200px] bg-[#070707]`}>
                        <div className='closeContainer flex items-center justify-end pb-2'>
                            
                            <i className='bi bi-x-lg cursor-pointer hover:text-gray-600' onClick={()=>setSideMenu(false)}></i>
                        </div>
                        <div className='account'>
                            <p className=''><span className='font-medium'>My account:</span> {user.username}</p>
                        </div>
                        <div className='content text-[.9em] h-[100%] flex flex-col items-center justify-around'>
                            <div className='myFriends hover:bg-gray-900 w-[100%] duration-100 cursor-pointer flex flex-col gap-1 items-center justify-center'>
                                <i className="bi bi-people-fill"></i>
                                <p className='capitalize'>My Friends</p>
                            </div>
                            <div className='myPosts hover:bg-gray-900 w-[100%] duration-100 cursor-pointer flex flex-col gap-1 items-center justify-center'>
                                <i className="bi bi-card-image"></i>
                                <p className='capitalize'>My Posts</p>
                            </div>
                            <div className='restrictedUsers hover:bg-gray-900 w-[100%] duration-100 cursor-pointer flex flex-col gap-1 items-center justify-center'>
                                <i className="bi bi-person-fill-slash"></i>
                                <p className='capitalize'>Restricted Users</p>
                            </div>
                            <div className='settings  hover:bg-gray-900 w-[100%] duration-100 cursor-pointer flex flex-col gap-1 items-center justify-center'>
                                <i className="bi bi-sliders"></i>
                                <p className='capitalize'>Settings</p>
                            </div>
                            <div className='searchUsers cursor-pointer flex flex-col gap-1 items-center justify-center'>
                                <i className="bi bi-binoculars-fill"></i>
                                <p className='capitalize'>Search for users</p>
                                <input type='text' className='w-[100%] max-w-[100%] bg-transparent outline-none border-b mt-2' placeholder='@username'/>
                            </div>
                        </div>
                    </div>
                   
                

            </div>
        </div>
    </div>
  )
}

export default Logged