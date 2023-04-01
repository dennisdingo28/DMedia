import React, { useEffect } from 'react'
import Logo from '../CommonComponents/Logo'
import Navbar from './Navbar';

const Home = (props) => {
  
  const {user,setUser,logged,setLogged} = props;

  return (
    <div className=''>
      <Navbar user={user} setUser={setUser} logged={logged} setLogged={setLogged}/>
    </div>
  )
}

export default Home
