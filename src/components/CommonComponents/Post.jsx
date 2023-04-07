import React, { useEffect, useState } from 'react'
import axios from "axios";

const Post = (props) => {
  const {imageUrl,imageAlt,createdBy,title,description,logged} = props;
  const [userProfile,setUserProfile] = useState({});

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
            <div className='flex items-center gap-2'>
              <img src={userProfile.profileUrl} className='w-[50px] h-[50px] rounded-full object-cover' alt='profile'/>
              <p>{userProfile.username}</p>
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
                  <div className='starUpContainer cursor-pointer duration-150 hover:shadow-[0px_0px_5px_#5a29cc] py-1 flex-1 flex flex-col gap-1 items-center'>
                    <i className="bi bi-star"></i>
                    <p>star up</p>
                  </div>
                  <div className='starDownContainer cursor-pointer duration-150 hover:shadow-[0px_0px_5px_#5a29cc] py-1 flex-1 flex flex-col gap-1 items-center'>
                    <i className="bi bi-hand-thumbs-down"></i>
                    <p>dislike</p>
                  </div>
                  <div className='shareContainer cursor-pointer duration-150 hover:shadow-[0px_0px_5px_#5a29cc] py-1 flex-1 flex flex-col gap-1 items-center'>
                    <i className="bi bi-globe"></i>
                    <p>share</p>
                  </div>
                  <div className='reportContainer cursor-pointer duration-150 hover:shadow-[0px_0px_5px_#5a29cc] py-1 flex-1 flex flex-col gap-1 items-center'>
                  <i className="bi bi-flag"></i>
                    <p>report</p>
                  </div>
                  
                </div>}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Post
