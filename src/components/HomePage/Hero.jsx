import React, { useEffect } from 'react';
import LoggedHero from '../Logged/Hero/LoggedHero';
import NotLoggedHero from '../Logged/Hero/NotLoggedHero';
import axios from "axios";

const Hero = (props) => {
    const {logged} = props;
    
    async function getAllPosts(){
        try{        
            const req = await axios.get('/search/allPosts');
            console.log(req);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getAllPosts();
    },[]);


    return (
        <div>
            <div className='parent-container'>
                {logged ? <LoggedHero {...props}/>:<NotLoggedHero/>}
                
                <div className='postContainer'>
                    <div className='postHeader'>
                    <h1 className='font-medium font-Karla text-[1.3em] capitalize mb-3'>Explore from<span className='text-darkBlue'> Here</span></h1>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Hero