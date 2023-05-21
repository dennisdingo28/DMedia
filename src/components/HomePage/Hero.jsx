import React, { useEffect, useState } from 'react';
import LoggedHero from '../Logged/Hero/LoggedHero';
import NotLoggedHero from '../Logged/Hero/NotLoggedHero';
import axios from "axios";
import Post from '../CommonComponents/Post';

const Hero = (props) => {
    const {logged,user,token,loggedUser} = props;
    
    const [allPosts,setAllPosts] = useState([]);
    console.log(allPosts);

    async function getAllPosts(){
        try{        
            const req = await axios.get('/search/allPosts');
            if(req.data.length>0)
                setAllPosts(req.data)
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
                
                <div className='postContainer mt-3'>
                    <div className='postHeader'>
                        <h1 className='font-medium font-Karla text-[1.3em] capitalize mb-3'>Explore from<span className='text-darkBlue'> Here</span></h1>
                    </div>
                    <div className='postBody'>
                        <div className='postsContainer flex flex-col gap-10'>
                            {
                                allPosts.length!==0 ? allPosts.map((post,index)=>{
                                    return <Post token={token} user={user} loggedUser={loggedUser} key={post._id} {...post} logged={logged} index={index}/>
                                })
                                :
                                <p className='text-center'>No current posts :/</p>
                            }
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero