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
        <div className='navbarContainer'>
          <div className='parent-container navbar py-4 text-white flex items-center justify-between lg:justify-start lg:gap-6'>
            <div>
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
