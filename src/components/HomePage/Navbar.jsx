import React from 'react';
import Logo from '../CommonComponents/Logo';
import Logged from "../Logged/Navbar/Logged";
import NotLogged from "../Logged/Navbar/NotLogged"
import { useState } from 'react';

const Navbar = (props) => {
    const {user,setUser,logged,setLogged} = props;
  const [sideMenu,setSideMenu]=useState(false);
  return (
    <div>
        <div className='navbarContainer lg:bg-[#131212]'>
          <div className='parent-container navbar text-white py-1 flex items-center justify-between lg:justify-start lg:gap-6'>
            <div className=''>
              <Logo/>
            </div>
            <div className='lg:flex-1'>
              {logged ? <Logged sideMenu={sideMenu} setSideMenu={setSideMenu} user={user}/>:<NotLogged/>}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar
