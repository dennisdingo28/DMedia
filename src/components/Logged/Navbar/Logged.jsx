import React, { useState,useRef } from 'react'
import SearchedUser from '../../HomePage/SearchedUser'
import axios from 'axios';

const Logged = ({user,sideMenu,setSideMenu}) => {

    const [searchingUser,setSearchingUser] = useState(false);

    const [searchedUsers,setSearchedUsers] = useState([]);

    const [searchContainer,setSearchContainer] = useState("");

    const searchInput = useRef();

    async function handleSearchUser(){
        try{
            //handle http request to the server
            setSearchingUser(true);
            setSearchContainer("Loading...");
            const req = await axios.get(`/search/user/?username=${searchInput.current.value}`)
            console.log(req);
            if(req.data.length>0)
                setSearchedUsers(req.data);
            else{
                setSearchedUsers([]);
                setSearchContainer("No results :/")
            }
        }catch(err){
            console.log(err);
        }
    }

    function closeResultContainer(){
        setSearchingUser(false);
        setSearchedUsers([]);
    }

  return (
    <div className=''>
        <div className='mobileMenu lg:hidden'>
            <div className='mobileMenuContainer'>

                <div className='menuContainer relative'>
                    <div onClick={()=>setSideMenu(true)} className='menu flex flex-col gap-1 cursor-pointer'>
                        <div className={`${sideMenu ? "activeLine":""} line line1 w-[20px] h-[2.3px] bg-white`}></div>
                        <div className={`${sideMenu ? "activeLine":""} line line2 w-[20px] h-[2.3px] bg-white`}></div>
                        <div className={`${sideMenu ? "activeLine":""} line line3 w-[20px] h-[2.3px] bg-white`}></div>
                    </div>
                  
                </div>
                   
                    <div className={`sideMenu p-2 pb-5 delay-200 absolute min-h-screen z-10 top-0 bottom-0 duration-150 ${sideMenu ? "right-[0px]":"-right-[100%]"} w-[100%] min-w-[150px] max-w-[200px] bg-[#070707] overflow-scroll overflow-x-hidden`}>
                        <div className='closeContainer flex items-center justify-end pb-2'>
                            
                            <i className='bi bi-x-lg cursor-pointer hover:text-gray-600' onClick={()=>setSideMenu(false)}></i>
                        </div>
                        <div className='account flex flex-col justify-center items-center'>
                            <div className='flex flex-col gap-1 cursor-pointer justify-center items-center'>
                                <img src={user.profileUrl} className='w-[45px] h-[45px] rounded-full' alt='profile'/>
                                <p className='font-Open'>{user.username}</p>
                            </div>
                        </div>
                        <div className='content text-[.9em] min-h-[100%] flex flex-col items-center justify-between'>
                            <div className='myFriends flex-1 hover:bg-gray-900 w-[100%] duration-100 cursor-pointer flex flex-col gap-1 items-center justify-center'>
                                <i className="bi bi-people-fill"></i>
                                <p className='capitalize'>My Friends</p>
                            </div>
                            <div className='myPosts flex-1 hover:bg-gray-900 w-[100%] duration-100 cursor-pointer flex flex-col gap-1 items-center justify-center'>
                                <i className="bi bi-card-image"></i>
                                <p className='capitalize'>My Posts</p>
                            </div>
                            <div className='restrictedUsers flex-1 hover:bg-gray-900 w-[100%] duration-100 cursor-pointer flex flex-col gap-1 items-center justify-center'>
                                <i className="bi bi-person-fill-slash"></i>
                                <p className='capitalize'>Restricted Users</p>
                            </div>
                            <div className='settings flex-1 hover:bg-gray-900 w-[100%] duration-100 cursor-pointer flex flex-col gap-1 items-center justify-center'>
                                <i className="bi bi-sliders"></i>
                                <p className='capitalize'>Settings</p>
                            </div>
                            <div className='searchUsers flex-1 cursor-pointer flex flex-col gap-1 items-center justify-center'>
                                <i className="bi bi-binoculars-fill"></i>
                                <p className='capitalize'>Search for users</p>
                                <input type='text' className='w-[100%] max-w-[100%] bg-transparent outline-none border-b mt-2' placeholder='@username'/>
                            </div>
                        </div>
                    </div>
                   
            </div>
        </div>

        <div className='desktopMenu hidden lg:flex items-center gap-6'>
            <div className='searchContainer flex items-center gap-2 w-[100%] flex-1 max-w-[500px] relative'>
                <input type='text' onChange={(e)=>{
                    if(e.target.value===''){ 
                        setSearchingUser(false);
                        setSearchedUsers([])};
                    }} ref={searchInput} className='searchUsers w-[100%] outline-none bg-transparent border-b-2' placeholder='@username'/>
                <i className="bi bi-binoculars-fill cursor-pointer" onClick={handleSearchUser}></i>
                {searchingUser && 
                    <div className='searchResultsWrapper absolute left-0 right-0 -bottom-[190px]'>
                        <div className='searchResultsContainer bg-[#191919] rounded-t-md'>
                            <div className='bg-black px-2 py-1 flex items-center justify-between'>
                                <p className='font-medium'>Relative to your search:</p>
                                <i className='bi bi-x cursor-pointer' onClick={()=>{
                                    closeResultContainer();
                                    setSearchedUsers([]);
                                }}></i>
                            </div>
                            <div className='searchedUsersContainer flex flex-col gap-5 h-[150px] overflow-scroll overflow-x-hidden px-2 py-1'>
                                {
                                    searchedUsers.length > 0 ?
                                    searchedUsers.map(user=>{
                                        return <SearchedUser key={user._id} {...user}/>
                                    })
                                    :
                                    <p className='text-center'>{searchContainer}</p>
                                }
                                
                            </div>
                        </div>
                    </div>
                }
                
            </div>
            <div className="contentContainer flex items-center justify-between flex-1 lg:gap-3 xl:gap-0">
                
                <div className='myFriends hover:bg-[#5c5b5b] w-[100%] rounded-md p-1 duration-100 cursor-pointer flex flex-col gap-1 items-center justify-center'>
                    <i className="bi bi-people-fill"></i>
                    <p className='capitalize whitespace-nowrap'>My Friends</p>
                </div>
                <div className='myPosts hover:bg-[#5c5b5b] w-[100%] rounded-md p-1 duration-100 cursor-pointer flex flex-col gap-1 items-center justify-center'>
                    <i className="bi bi-card-image"></i>
                    <p className='capitalize whitespace-nowrap'>My Posts</p>
                </div>
                <div className='restrictedUsers hover:bg-[#5c5b5b] w-[100%] rounded-md p-1 duration-100 cursor-pointer flex flex-col gap-1 items-center justify-center'>
                    <i className="bi bi-person-fill-slash"></i>
                    <p className='capitalize  whitespace-nowrap'>Restricted Users</p>
                </div>
                <div className='settings hover:bg-[#5c5b5b] w-[100%] rounded-md p-1 duration-100 cursor-pointer flex flex-col gap-1 items-center justify-center'>
                    <i className="bi bi-sliders"></i>
                    <p className='capitalize whitespace-nowrap'>Settings</p>
                </div>
                <div className='profile'>
                    <div className='flex flex-col gap-1 justify-center items-center cursor-pointer'>
                        <img src={user.profileUrl} className='w-[45px] h-[45px] rounded-full' alt='profile'/>
                        <p>{user.username}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Logged