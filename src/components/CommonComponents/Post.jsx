import React, { useEffect, useState } from 'react'
import axios from "axios";

const Post = (props) => {
  const {token,imageUrl,imageAlt,createdBy,user,title,description,logged,_id} = props;
  const [postActioners,setPostActioners] = useState({
    starUp:false,
    dislike:false,
    share:false,
    reported:false
  })
  const [clicked,setClicked] = useState(false);//handle side effect when click the like and dislike
  const [postUser,setPostUser] = useState({});

  const [postLikesDislikes,setPostLikesDislikes] = useState({});
  console.log(postLikesDislikes);

  useEffect(()=>{
    decodeUserPost();
    getCurrentPost();
    console.log('rqe');
  },[]);

  useEffect(()=>{
    if(clicked)
      handleLikeDislike();
  },[postLikesDislikes])

  async function decodeUserPost(){
    try{
        const userId = createdBy;
        const req = await axios.get(`/search/userId/${userId}`);
        console.log(req.data);
        setPostUser(req.data);
    }catch(err){
      console.log(err);
    }
  }

  async function getCurrentPost(){
    try{
      const id = _id;
      const req = await axios.get(`/search/post/${id}`);
      const {likes,dislikes}=req.data;

      setPostLikesDislikes({likes,dislikes});
    }catch(err){
      console.log(err);
    }
  }

  async function handleLikeDislike(){
    try{
      const id = _id;
      const req = await axios.patch(`/post/updatePost/${id}`,postLikesDislikes,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(req);
    }catch(err){
    }
  }

  return (
    <div>
      <div className='post'>
        <div className='pHeader'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 cursor-pointer'>
              <img src={postUser.profileUrl} className='w-[50px] h-[50px] rounded-full object-cover' alt='profile'/>
              <p>{postUser.username}</p>
             {user._id===createdBy && <span className='text-gray-400'>(you)</span>}
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

                  <div onClick={()=>{

                   setPostLikesDislikes(prev=>{
                      if(!postActioners.starUp){
                        if(!postActioners.dislike)
                          return {...prev,likes:prev.likes+1};
                        else
                          return {dislikes:prev.dislikes-1,likes:prev.likes+1}
                      }
                      else{
                        return {...prev,likes:prev.likes-1};
                      }
                    })
                  setPostActioners(prevState=>
                  {
                    return {...prevState,starUp:!prevState.starUp,dislike:false}
                  })
                  setClicked(true);
                  }

                  }className='starUpContainer cursor-pointer duration-100 hover:shadow-[0px_0px_5px_#5a29cc] py-1 flex-1 flex flex-col gap-1 items-center active:scale-[.90]'>
                    {!postActioners.starUp ? <i className="bi bi-star"></i>:<i className="bi bi-star-fill text-yellow-500"></i>}
                    <p>{!postActioners.starUp ? "star up":"starred up"}</p>
                    <small>{postLikesDislikes.likes}</small>
                  </div>

                  <div onClick={()=>{

                      setPostLikesDislikes(prev=>{
                        if(!postActioners.dislike){
                          if(!postActioners.starUp)
                            return {...prev,dislikes:prev.dislikes+1};
                          else
                            return {likes:prev.likes-1,dislikes:prev.dislikes+1}
                        }
                        else{
                          return {...prev,dislikes:prev.dislikes-1};
                        }
                      })

                    setPostActioners(prevState=>{
                    return {...prevState,dislike:!prevState.dislike,starUp:false}
                    })
                    setClicked(true);
                  }} className='dislikeContainer cursor-pointer duration-100 hover:shadow-[0px_0px_5px_#5a29cc] py-1 flex-1 flex flex-col gap-1 items-center active:scale-[.90]'>
                    {!postActioners.dislike ? <i className="bi bi-hand-thumbs-down"></i>:<i className="bi bi-hand-thumbs-down-fill text-blue-700"></i>}
                    <p>{!postActioners.dislike?"dislike":"disliked"}</p>
                    <small>{postLikesDislikes.dislikes}</small>

                  </div>

                  <div onClick={()=>setPostActioners(prevState=>{
                    return {...prevState,share:!prevState.share}
                  })} className='shareContainer cursor-pointer duration-100 hover:shadow-[0px_0px_5px_#5a29cc] py-1 flex-1 flex flex-col gap-1 items-center active:scale-[.90]'>
                    {!postActioners.share ? <i className="bi bi-globe"></i>:<i className="bi bi-share-fill text-green-700"></i>}
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
