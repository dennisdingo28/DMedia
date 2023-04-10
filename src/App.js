import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/HomePage/Home';
import Authenticate from './components/AuthPage/Authenticate';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NotFoundPage from './components/CommonComponents/NotFoundPage';

function App() {
  const [token,setToken] = useState(function(){return localStorage.getItem('token')} || undefined);
  const [user,setUser] = useState({});
  const [logged,setLogged] = useState(false);

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
        <Route path="/" element={<Home user={user} setUser={setUser} logged={logged} setLogged={setLogged} token={token}/>}/>
        <Route path="/auth" element={<Authenticate setToken={setToken}/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
