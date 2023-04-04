import React from 'react'
import Navbar from './Navbar';
import Hero from './Hero';

const Home = (props) => {
  
  const {user,setUser,logged,setLogged} = props;

  return (
    <div className='bg-dark min-h-[100vh] text-white'>
      <Navbar user={user} setUser={setUser} logged={logged} setLogged={setLogged}/>
      <Hero user={user} setUser={setUser} logged={logged} setLogged={setLogged}/>
    </div>
  )
}

export default Home
