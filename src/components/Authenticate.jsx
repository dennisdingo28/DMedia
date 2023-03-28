import React, { useState } from 'react'
import Logo from './Logo'

const Authenticate = () => {

    const [showPassword,setShowPassword] = useState(false);
  return (
    <div className='authWrapper'>
        <div className='authContainer bg-[#0b0b0b] min-h-screen text-white'>

            <div className='parent-container'>
                {/*navbar*/}
                <div className='navbarContainer py-4 flex items-center justify-between'>
                    <div className='cursor-pointer'>
                        <Logo/>
                    </div>
                    <div className='moreContainer'>
                        <i className='bi bi-chevron-down cursor-pointer'></i>
                    </div>
                </div>      

                {/*hero*/}
                <div className='mt-10'>
                    <h1 className='text-[2.2em] font-Open font-bold text-center'>Welcome <span className='text-darkViolet'>to</span> the most <span className='text-darkViolet'>modern</span> social media</h1>
                
                    <div className='authenticationWrapper'>
                        <div className='authenticationContainer'>
                            <div className='bg-[#070707] px-2 py-1 rounded-t-md'>
                                <p className='font-Noto text-[.9em] font-thin'>Choose your authentication</p>
                            </div>

                            <div className='authWrapper'>
                                <div className='authContainer bg-[#0c0c0c] p-3'>
                                    <div className='flex items-center justify-center gap-6'>
                                        <p className='font-thin cursor-pointer relative after:content-[""] after:h-[1.6px] after:bg-darkBlue after:absolute after:bottom-[-3px] after:left-[50%] after:translate-x-[-50%] after:w-[0px] hover:after:w-[100%] after:duration-[.20s]'>Register</p>
                                        <p className='font-thin cursor-pointer relative after:content-[""] after:h-[1.6px] after:bg-darkBlue after:absolute after:bottom-[-3px] after:left-[50%] after:translate-x-[-50%] after:w-[0px] hover:after:w-[100%] after:duration-[.20s]'>Login</p>
                                    </div>
                                    <div className='registerContainer mt-3 hidden'>
                                        <p className='text-center lowercase font-Open'>@ register</p>
                                    
                                        <div className='registerForm flex flex-col gap-6'>
                                            <div className='usernameContainer flex items-center gap-2'>
                                                <i className='bi bi-person'></i>
                                                <input type="text" placeholder='username' className='text-[.9em] bg-transparent outline-none border-b w-[100%]'/>
                                            </div>
                                            <div className='emailContainer flex items-center gap-2'>
                                                <i className='bi bi-envelope'></i>
                                                <input type="email" placeholder='email' className='text-[.9em] bg-transparent outline-none border-b w-[100%]'/>
                                            </div>
                                            <div className='passwordContainer flex items-center gap-2'>
                                                <i className='bi bi-shield'></i>
                                                <input type="password" placeholder='username' className='text-[.9em] bg-transparent outline-none border-b w-[100%]'/>
                                            </div>
                                            <div className='submitContainer text-center'>
                                                <button className='bg-transparent border font-Noto rounded-sm text-[.92em] border-darkBlue px-2 py-1 hover:bg-darkBlue duration-[.25s]'>Create my account</button>
                                                <p className='formStatus text-[.8em] font-Open mt-3 text-green-700'>Account was successfully created !</p>
                                            </div>
                                        </div>
                                    </div> 

                                    <div className='loginContainer'>
                                        <p className='text-center mt-3 lowercase font-Open'>@ login</p>
                                            <div className='loginForm flex flex-col gap-6'>

                                                <div className='emailContainer flex items-center gap-2'>
                                                    <i className='bi bi-envelope'></i>
                                                    <input type="email" placeholder='email' className='text-[.9em] bg-transparent outline-none border-b w-[100%]'/>
                                                </div>
                                                <div className='passwordContainer flex items-center gap-2'>
                                                    <i className='bi bi-shield'></i>
                                                    <input type={showPassword ? "text":"password"} placeholder='password' className='text-[.9em] bg-transparent outline-none border-b w-[100%]'/>
                                                    {showPassword ? <i onClick={()=>setShowPassword(false)} className="bi bi-eye cursor-pointer hover:bg-gray-800 duration-[.10s] px-1 rounded-full"></i>:<i onClick={()=>setShowPassword(true)} className="bi bi-eye-slash cursor-pointer hover:bg-gray-800 duration-[.10s] px-1 rounded-full"></i>}
                                                </div>
                                                <div className='submitContainer text-center'>
                                                    <button className='bg-transparent border font-Noto rounded-sm text-[.92em] border-darkBlue px-2 py-1 hover:bg-darkBlue duration-[.25s]'>Create my account</button>
                                                    <p className='formStatus text-[.8em] font-Open mt-3 text-green-700'>Account was successfully created !</p>
                                                </div>
                                            </div> 
                                    </div>
                                   

                                </div>
                                
                            </div>
                        </div>
                       
                    </div>
                </div>

            </div>
           

        </div>
    </div>
  )
}

export default Authenticate