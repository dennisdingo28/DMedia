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
          <div className='parent-container navbar py-4 flex text-white flex items-center justify-between'>
            <div>
              <Logo/>
            </div>
            <div>
              {logged ? <Logged sideMenu={sideMenu} setSideMenu={setSideMenu} user={user}/>:<NotLogged/>}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar
