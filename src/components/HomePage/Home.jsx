import React from 'react'
import Navbar from './Navbar';
import Hero from './Hero';

const Home = (props) => {
  
  const {user,setUser,logged,setLogged,token} = props;

  return (
    <div className='bg-dark min-h-[100vh] text-white pb-10'>
      <Navbar user={user} setUser={setUser} logged={logged} setLogged={setLogged}/>
      <Hero user={user} setUser={setUser} logged={logged} setLogged={setLogged} token={token}/>
    </div>
  )
}

export default Home
