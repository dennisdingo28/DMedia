import React from 'react'
import Navbar from './Navbar';

const Home = (props) => {
  
  const {user,setUser,logged,setLogged} = props;

  return (
    <div className='bg-dark min-h-[100vh]'>
      <Navbar user={user} setUser={setUser} logged={logged} setLogged={setLogged}/>
    </div>
  )
}

export default Home
