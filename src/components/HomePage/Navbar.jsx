import React from 'react'

const Navbar = (props) => {
    const {user,setUser,logged,setLogged} = props;

  return (
    <div>
      {logged ? `Hello ${user.username}`:"sign in login"}
    </div>
  )
}

export default Navbar
