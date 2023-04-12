import React,{useState,useEffect} from 'react'
import Post from '../CommonComponents/Post';
import settings from "../../imgs/settings.png";
import axios from "axios";

const Profile = (props) => {
    const {user,setUser,token,logged} = props;

    const createdAt = new Date(user.createdAt);

    const day = createdAt.getDate();
    const month = createdAt.toLocaleString('default',{month:"numeric"});
    const year = createdAt.getFullYear();

    const [userPosts,setUserPosts] = useState([]);
    const [loaded,setLoaded] = useState(false);

    console.log(userPosts);

    useEffect(()=>{
        getUserPost();
    },[]);

    
    async function getUserPost(){
        try{
            console.log('once');
            const encodedUserPosts = user.posts;
            console.log(encodedUserPosts);
            const posts = [];
            for(const post of encodedUserPosts){
                
                const req = await axios.get(`/search/post/${post}`);
                console.log(req);
                posts.push(req.data);
            }
            setUserPosts(posts);
            setLoaded(true);
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className='xx:h-screen bg-dark profilePageWrapperContainer'>
        <div className='profilePageWrapper text-white'>
            <div className='flex flex-col xx:flex-row xx:gap-4'>
                <div className='profilePageLeftSide flex flex-col pt-3 xx:h-screen bg-[#141313] py-3 rounded-b-xl xx:rounded-none xx:rounded-tr-3xl xx:rounded-br-3xl xx:px-3 w-[100%] xx:max-w-[350px] '>
                    <div>
                        <div>
                            <h1 className='text-center font-semibold text-[1.25em] font-Karla mb-3'>Manage Your Profile</h1>
                            <div className='flex flex-col items-center justify-center cursor-pointer'>
                                <img src={user.profileUrl} className='w-[220px] h-[220px] rounded-full xs:w-[270px] xs:h-[270px]' alt='profile'/>
                                <h1 className='font-medium font-Open text-[1.3em]'>{user.username}</h1>
                            </div>
                        </div>
                    
                        <div className='profileRatingContainer flex items-center justify-between md:justify-around mt-2 p-3 xx:gap-10 xx:mt-5'>
                            <div className='closersContainer flex flex-col gap-1 justify-center items-center'>
                                <i className='bi bi-people-fill'></i>
                                <p>150</p>
                            </div>
                            <div className='starUpContainer flex flex-col gap-1 justify-center items-center'>
                                <i className='bi bi-star-fill'></i>
                                <p>{user.totalLikes}</p>
                            </div>
                            <div className='dislikeContainer flex flex-col gap-1 justify-center items-center'>
                                <i className='bi bi-hand-thumbs-down-fill'></i>
                                <p>{user.totalDislikes}</p>
                            </div>
                            <div className='totalPostsContainer flex flex-col gap-1 justify-center items-center'>
                                <i className='bi bi-chat-left-text-fill'></i>
                                <p>{user.posts.length}</p>
                            </div>
                            <div className='shareContainer flex flex-col gap-1 justify-center items-center'>
                                <i className='bi bi-share-fill'></i>
                                <p>{user.totalShares}</p>
                            </div>
                        </div>
                        <div className='profileTimestampsContainer'>
                            <h3 className='font-semibold text-center mt-4 text-[1.1em] font-Karla'><span className='text-darkViolet'>DMedia</span> member from {day}/{month}/{year}</h3>
                        </div>
                    </div>
                    

                    <div className='profileSettingsContainer flex-1'>
                        <div className='flex flex-col items-center h-[100%] justify-center cursor-pointer mt-6 xs:flex-row'>
                            <img src={settings} className='w-[105px] h-[105px]' alt='settings'/>
                            <p className='font-Karla font-bold'>Settings</p>
                        </div>
                    </div>

                    <div className='profileAppContainer'>
                        <p className='font-Karla font-medium text-center'>© Copyright 2023.All rights reserved.</p>
                    </div>

                </div>
                <div className='profileContentSide p-3 parent-container flex-1 flex items-center justify-center xx:h-screen max-w-[1350px] mx-auto'>
                    <div className='profilePostsContainer xx:h-screen mt-5'>
                        <h2 className='font-bold tracking-wider text-[1.3em]'>{user.username}'s posts</h2>

                        <div className='profilePosts mt-10 pb-10 flex flex-col gap-12'>
                            {!loaded ? "loading...":
                            
                                userPosts.map((post,index)=>{
                                    return <Post token={token} user={user} key={post._id} {...post} logged={logged} index={index}/>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    </div>
  )
}

export default Profile