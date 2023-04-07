import React, { useEffect, useState } from 'react'
import axios from "axios";

const Post = (props) => {
  const {imageUrl,imageAlt,createdBy,user,title,description,logged,likes,dislikes} = props;
  const [userProfile,setUserProfile] = useState({});

  const [postActioners,setPostActioners] = useState({
    starUp:false,
    dislike:false,
    share:false,
    reported:false
  })
  console.log(postActioners.starUp);

  useEffect(()=>{
    decodePostUser();
  },[]);

  async function decodePostUser(){
    try{
      const req = await axios.get(`/search/userId/${createdBy}`);
      console.log(req);
      setUserProfile(req.data);
    }catch(err){
      console.log(err);
    }
  }

  

  return (
    <div>
      <div className='post'>
        <div className='pHeader'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 cursor-pointer'>
              <img src={userProfile.profileUrl} className='w-[50px] h-[50px] rounded-full object-cover' alt='profile'/>
              <p>{userProfile.username===user.username ? userProfile.username:userProfile.username}</p>
             {userProfile.username===user.username && <span className='text-gray-400'>(you)</span>}
            </div>
            <div>
              <i className="bi bi-three-dots cursor-pointer"></i>
            </div>
          </div>
        </div>
        <div className='pBody'>
            <div className='flex flex-col gap-4'>
              <div className='postTitle mt-2 mb-1'>
                <p className='font-medium font-Karla text-center text-[1.2em]'>{title}</p>
              </div>
              <div className='postDescription'>
                <p className='text-left font-Karla'>{description}</p>
              </div>
              <div className='postImage'>
                {imageUrl && <img src={imageUrl} alt={imageAlt} className='max-w-[550px] max-h-[550px] w-[100%] h-[100%]'/>}
              </div>
              {logged && <div className='flex items-center font-Open font-semibold'>

                  <div onClick={()=>setPostActioners(prevState=>{
                    return {...prevState,starUp:!prevState.starUp,dislike:false}
                  })} className='starUpContainer cursor-pointer duration-100 hover:shadow-[0px_0px_5px_#5a29cc] py-1 flex-1 flex flex-col gap-1 items-center active:scale-[.90]'>
                    {!postActioners.starUp ? <i className="bi bi-star"></i>:<i className="bi bi-star-fill text-yellow-500"></i>}
                    <p>{!postActioners.starUp ? "star up":"starred up"}</p>
                    <small>{likes}</small>
                  </div>

                  <div onClick={()=>setPostActioners(prevState=>{
                    return {...prevState,dislike:!prevState.dislike,starUp:false}
                  })} className='dislikeContainer cursor-pointer duration-100 hover:shadow-[0px_0px_5px_#5a29cc] py-1 flex-1 flex flex-col gap-1 items-center active:scale-[.90]'>
                    {!postActioners.dislike ? <i className="bi bi-hand-thumbs-down"></i>:<i className="bi bi-hand-thumbs-down-fill text-blue-700"></i>}
                    <p>{!postActioners.dislike?"dislike":"disliked"}</p>
                    <small>{dislikes}</small>

                  </div>

                  <div onClick={()=>setPostActioners(prevState=>{
                    return {...prevState,share:!prevState.share}
                  })} className='shareContainer cursor-pointer duration-100 hover:shadow-[0px_0px_5px_#5a29cc] py-1 flex-1 flex flex-col gap-1 items-center active:scale-[.90]'>
                    {!postActioners.share ? <i className="bi bi-globe"></i>:<i class="bi bi-share-fill text-green-700"></i>}
                    <p>{!postActioners.share ? "share":"shared"}</p>
                  </div>

                  <div onClick={()=>setPostActioners(prevState=>{
                    return {...prevState,reported:!prevState.reported}
                  })} className='reportContainer cursor-pointer duration-100 hover:shadow-[0px_0px_5px_#5a29cc] py-1 flex-1 flex flex-col gap-1 items-center active:scale-[.90]'>
                  {!postActioners.reported ?<i className="bi bi-flag"></i>:<i className="bi bi-flag-fill text-red-700"></i>}
                    <p>{!postActioners.reported ? "report":"reported"}</p>
                  </div>
                  
                </div>}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Post
