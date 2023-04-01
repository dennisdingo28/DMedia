import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/HomePage/Home';
import Authenticate from './components/AuthPage/Authenticate';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [token,setToken] = useState(function(){return localStorage.getItem('token')} || undefined);
  const [user,setUser] = useState({});
  const [logged,setLogged] = useState(false);

  console.log(user);
    useEffect(()=>{
      decodeUserToken(token);
    },[token]);
  

  async function decodeUserToken(userToken){
    try{
      const req = await axios.post("/auth/authenticateUser",{},{
        headers:{
          Authorization:`Bearer ${userToken}`
        }
      })
      if(req.data.good){
        console.log(req);
        setUser(req.data.user)
        setLogged(true);
      }else{
        console.log(req.data);
      }
      
    }catch(err){
      console.log(err);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} logged={logged} setLogged={setLogged}/>}/>
        <Route path="/auth" element={<Authenticate setToken={setToken}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
