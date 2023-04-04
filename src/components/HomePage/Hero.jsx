import React from 'react'
import defaultProfile from "../../imgs/defaultProfile.jpg"

const Hero = (props) => {
    const {user,setUser,logged,setLogged} = props;
  return (
    <div className='mt-8'>
        <div className='parent-container'>
            <div className='postContainer'>
                <div className='postTestmonial'>
                    <h1 className='font-medium font-Karla text-[1.2em] capitalize mb-3'>Let <span className='text-darkBlue'>People</span> Know That <span className='text-darkBlue'>You</span> Are Here</h1>
                </div>

                <div className='createPostContainer'>
                    <div className='postHeader flex items-center gap-2'>
                        <div className=''>
                            <img src={user.profileUrl} className='cursor-pointer object-cover w-[50px] h-[45px] rounded-fulafasl'/>
                        </div>
                        <div className='w-[100%] flex items-center'>
                            <input autoFocus type='text' placeholder="What's new?" className='text-[#9ca3af] focus:border-b-2 font-Karla w-[100%] bg-transparent outline-none border-b border-darkViolet'/>
                            <i className="bi bi-plus-circle-fill cursor-pointer text-[#9ca3af] duration-100 hover:text-[#83878c]"></i>
                        </div>
                    </div>
                    <div className='postBody mt-2'>
                        <p className='font-semibold text-[.9em]'>File Image Settings</p>
                        <div className='imageOptionsContainer'>
                            <div className='imgProps flex items-center justify-between gap-5 mt-2'>
                                <div className='imgUrl flex items-center'>
                                    <div className='bg-[#161616] w-[40px] h-[40px] rounded-tl-md rounded-bl-md flex items-center justify-center'>
                                        <i class="bi bi-link-45deg"></i>
                                    </div>
                                    <div>
                                        <input placeholder='image url' type='text' className='placeholder:opacity-30 outline-none w-[100%] h-[40px] px-1 text-gray-500 bg-[#1e1e1e]'/>
                                    </div>
                                </div>
                                <div className='imgAlt flex'>
                                    <div className='bg-[#161616] w-[40px] h-[40px] rounded-tl-md rounded-bl-md flex items-center justify-center'>
                                        <i className="bi bi-chat-quote"></i>
                                    </div>
                                    <div>
                                        <input placeholder='image alt' type='text' className='placeholder:opacity-30 outline-none w-[100%] h-[40px] px-1 text-gray-500 bg-[#1e1e1e]'/>
                                    </div>
                                </div>
                            </div>
                           <div>
                                <div>
                                    <img src={defaultProfile} className='w-[100px] h-[100px]'/>
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

export default Hero