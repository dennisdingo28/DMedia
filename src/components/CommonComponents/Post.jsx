import React, { useEffect, useState,useRef } from 'react'
import axios from "axios";
import Comment from './Comment';

const Post = (props) => {
  const {token,imageUrl,imageAlt,createdBy,user,share,title,description,logged,_id,index} = props;
  const [postActioners,setPostActioners] = useState({
    starUp:false,
    dislike:false,
    share:false,
    reported:false
  })


  const [postUser,setPostUser] = useState({});

  const [numberOfLikes,setNumberOfLikes] = useState([]);
  const [numberOfDislikes,setNumberOfDislikes] = useState([]);
  const [defaultLikes,setDefaultLikes] = useState([]);
  const [defaultDislikes,setDefaultDislikes] = useState([]);

  const [comments,setComments] = useState([]);

  const [clicked,setClicked] = useState(false);//for the async handler for like/dislike
  const [shareLoaded,setShareLoaded] = useState(false);
  const [loaded,setLoaded] = useState(false);// says if the number of likes/dislikes are loaded
  const [commentsLoaded,setCommentsLoaded] = useState(false);
  const [commentsUsers,setCommentsUsers] = useState([]);

  const [commentStatus,setCommentStatus] = useState("");

  const [initialPostUser,setInitialPostUser] = useState({});
  console.log(initialPostUser);
  const commentInput= useRef();
  const [commentPlaceholder,setCommentPlaceholder] = useState("@comment");


  useEffect(()=>{
    decodeUserPost();
    getCurrentPost();
    getInitialPostUser(share.initialUserId);
    
    const currentUserShared = share.sharedBy.filter(sharedUserId=>sharedUserId===user._id);

    if(currentUserShared.length)
      setPostActioners(prev=>{
        return {
          ...prev,
          share:true
        }
      })
  },[]);

  useEffect(()=>{
    try{
      if(commentsLoaded){
        comments.forEach(commentObj=>{
          decodeUserComment(commentObj.userId,commentObj.commentText);
        })
      }
    }catch(err){
      console.log(err);
    }
    
  },[commentsLoaded]);

  useEffect(()=>{

    if(shareLoaded){
      sharePost();
    }
  },[postActioners.share])

  async function getInitialPostUser(id){
    try{
      const userId=id;
      const req = await axios.get(`/search/userId/${userId}`);
      setInitialPostUser(req.data);
    }catch(err){
      console.log(err);
    }
  }

  async function decodeUserComment(commentId,commentText){
    try{
      const id = commentId;
      const req = await axios.get(`/search/userId/${id}`);
      setCommentsUsers(prev=>{
        return [...prev,{username:req.data.username,
          profileImage:req.data.profileUrl,postDesc:commentText,id:req.data._id}]
      })
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    if(clicked){
      handleLikeDislike();
    }
    if(loaded){
      if(checkUserLike()){
        setPostActioners(prev=>{
          return {
            ...prev,
            starUp:true
          }
        })
      }

      if(checkUserDislike()){
       
          setPostActioners(prev=>{
            return {
              ...prev,
              dislike:true
            }
          })
        
      }

      setDefaultLikes(numberOfLikes);
      setDefaultDislikes(numberOfDislikes);
    }
  },[numberOfLikes,numberOfDislikes])

  async function decodeUserPost(){
    try{
        const userId = createdBy;
        const req = await axios.get(`/search/userId/${userId}`);
        setPostUser(req.data);
    }catch(err){
      console.log(err);
    }
  }

  async function getCurrentPost(){
    try{
      const id = _id;
      const req = await axios.get(`/search/post/${id}`);
      console.log(req);
      setNumberOfLikes(req.data.likes);
      setNumberOfDislikes(req.data.dislikes);
      setDefaultLikes(req.data.likes);
      setDefaultDislikes(req.data.dislikes);
      setComments(req.data.comments);
      setLoaded(true);
      setCommentsLoaded(true);

    }catch(err){
      console.log(err);
    }
  }

  function checkUserLike(){
    const filtered = numberOfLikes.filter(postId=>postId===user._id);
    if(filtered.length!==0)
      return true;
    return false;
  }

  function checkUserDislike(){
    const filtered = numberOfDislikes.filter(postId=>postId===user._id);
    if(filtered.length!==0)
      return true;
    return false;
  }

  async function handleLikeDislike(){
    try{
      const id = _id;
      const req = await axios.patch(`/post/updatePost/${id}`,{numberOfLikes,numberOfDislikes},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      const userID=createdBy;
      const req1 = await axios.patch(`/user/${userID}`,{totalPostLikes:numberOfLikes.length,totalPostDislikes:numberOfDislikes.length,defaultLikes:defaultLikes.length,defaultDislikes:defaultDislikes.length},{
        headers:{
          authorization:`Bearer ${token}`
        }
      });

    }catch(err){
      console.log(err);
    }
  }

  function handleLikes()
  {
    if(!postActioners.starUp){
      if(!postActioners.dislike){
        setNumberOfLikes(prevLikes=>{
          return [...prevLikes,user._id];
        })

      }else{
        setNumberOfDislikes(prevDislikes=>{
          const filteredDislikes = prevDislikes.filter(dislikeId=>dislikeId!==user._id);
          return [...filteredDislikes];
        })
      

        setNumberOfLikes(prevLikes=>{
          return [...prevLikes,user._id];
        })

      }
    }else{
      setNumberOfLikes(prevLikes=>{
        const filteredLikes = prevLikes.filter(likeId=>likeId!==user._id);
        return [...filteredLikes];
      })
    }
  }

  function handleDislikes(){
    
    if(!postActioners.dislike){
      if(!postActioners.starUp){
        setNumberOfDislikes(prevDislikes=>{
          return [...prevDislikes,user._id];
        })
      }else{
        setNumberOfLikes(prevLikes=>{
          const filteredLikes = prevLikes.filter(likeId=>likeId!==user._id);
          return [...filteredLikes];
        })
        setNumberOfDislikes(prevDislikes=>{
          return [...prevDislikes,user._id];
        })
      }
    }else{
      setNumberOfDislikes(prevDislikes=>{
        const filteredDislikes = prevDislikes.filter(dislikeId=>dislikeId!==user._id);
        return [...filteredDislikes];
      })
    }
  }

  const [toggleComments,setToggleComments] = useState(false);

  async function handleComment(){
    try{  
      if(commentInput.current.value.trim()==='')
      {
        setCommentPlaceholder("cannot create an empty comment");
      }else{
        setCommentStatus("Loading...")
        setCommentsUsers(prev=>{
          return [...prev,{username:user.username,
            profileImage:user.profileUrl,postDesc:commentInput.current.value,id:user._id}];
        })
        const req = await axios.patch(`/post/updatePost/${_id}`,{comments:[...comments,{userId:user._id,commentText:commentInput.current.value}]},{
          headers:{
            authorization:`Bearer ${token}`
          }
        })
        console.log(req);

        if(req.data.good===false){
          setCommentStatus("Something went wrong.Please try again later.");
        }else{
          setCommentStatus("Comment was successfully added!");
          
        }
      
      }
      setTimeout(()=>{
        clearCommentInput();
      },2000)
    }catch(err){
      setCommentStatus("Something went wrong with the server.Please try again later.")
      console.log(err);
    }
  }

    function clearCommentInput(){
      setCommentPlaceholder("@comment");
      setCommentStatus("");
      if (commentInput && commentInput.current) {
        commentInput.current.value = "";
      }
    }

  async function sharePost(){
    try{

        if(postActioners.share){
          const req = await axios.post(`/post/sharePost/${_id}`,{user,createdBy},{
            headers:{
              authorization:`Bearer ${token}`
            }
          });
        }else{
          const req = await axios.patch(`/user/${user._id}`,{posts:user.posts.filter(postID=>postID!==_id)},{
            headers:{
              authorization:`Bearer ${token}`
            }
          })
          const req1 = await axios.delete(`/post/delete/${_id}`,{
            headers:{
              authorization:`Bearer ${token}`
            }
          });

          const req2 = await axios.patch(`/user/${share.initialUserId}`,{share:{initialUserId:share.initialUserId,sharedBy:share.sharedBy.filter(shareId=>shareId!==user._id) || []}},{
            headers:{
              authorization:`Bearer ${token}`
            }
          });
        }
        
      
       
      }catch(err){
      console.log(err);
    }
  }
  return (
    <div className=''>
      <div className='post'>
        <div className='pHeader'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 cursor-pointer'>
              <img src={postUser.profileUrl} className='w-[50px] h-[50px] rounded-full object-cover' alt='profile'/>
              <p>{postUser.username}</p>
             {user._id===createdBy && <span className='text-gray-400'>(you)</span>}
             <p className='font-bold' >{postUser._id!==share.initialUserId ? `/* shared from ${initialPostUser.username}*/`:""}</p>
            </div>
            {user._id===postUser._id &&    <div>
              <i className="bi bi-three-dots cursor-pointer"></i>
            </div>}
         
          </div>
        </div>
        <div className='pBody'>
            <div className='flex flex-col gap-4 relative'>
             
                <div className='postTitle mt-2 mb-1'>
                  <p className='font-medium font-Karla text-center text-[1.2em]'>{title}</p>
                </div>

                <div className={`flex`}>
                    <div className={`flex flex-col flex-1 gap-4 ${index%2===0 ? "md:flex-row-reverse":"md:flex-row"} md:justify-center`}>
                        
                        {description.trim()!=='' && 
                          <div className='postDescription flex-1'>
                            <p className='text-left font-Karla'>{description}</p>
                          </div>
                        }
                        
                        {imageUrl &&
                          <div className='postImage flex-1'>
                            <img src={imageUrl} alt={imageAlt} className='rounded-md max-w-[750px] max-h-[550px] min-w-[250px] min-h-[250px] w-[100%] h-[100%] mx-auto'/>
                          </div>
                        }
                        
                    </div>                  
                </div>

              {logged && <div className='flex gap-3 font-Open font-semibold'>

                  <div onClick={()=>{

                    handleLikes();

                  setPostActioners(prevState=>
                  {
                    return {...prevState,starUp:!prevState.starUp,dislike:false}
                  })
                  setClicked(true);

                  }

                  }className='starUpContainer h-[100%] cursor-pointer duration-100 hover:shadow-[0px_0px_5px_#5a29cc] py-1 flex-1 flex flex-col gap-1 items-center active:scale-[.90]'>
                    {!postActioners.starUp ? <i className="bi bi-star"></i>:<i className="bi bi-star-fill text-yellow-500"></i>}
                    <p className='text-center'>{!postActioners.starUp ? "star up":"starred up"}</p>
                    <small>{numberOfLikes ? numberOfLikes.length:"loading..."}</small>
                  </div>

                  <div onClick={()=>{
                    handleDislikes();
                     
                    setPostActioners(prevState=>{
                    return {...prevState,dislike:!prevState.dislike,starUp:false}
                    })
                    setClicked(true);

                  }} className='dislikeContainer cursor-pointer duration-100 hover:shadow-[0px_0px_5px_#5a29cc] py-1 flex-1 flex flex-col gap-1 items-center active:scale-[.90]'>
                    {!postActioners.dislike ? <i className="bi bi-hand-thumbs-down"></i>:<i className="bi bi-hand-thumbs-down-fill text-blue-700"></i>}
                    <p className='text-center'>{!postActioners.dislike?"dislike":"disliked"}</p>
                    <small>{numberOfDislikes ? numberOfDislikes.length:"loading..."}</small>

                  </div>
                  {user._id!==createdBy &&           
                    <div onClick={()=>{setPostActioners(prevState=>{
                      return {...prevState,share:!prevState.share}
                    })
                      setShareLoaded(true);
                    }
                    } className='shareContainer cursor-pointer duration-100 hover:shadow-[0px_0px_5px_#5a29cc] py-1 flex-1 flex flex-col gap-1 items-center active:scale-[.90]'>
                      {!postActioners.share ? <i className="bi bi-globe"></i>:<i className="bi bi-share-fill text-green-700"></i>}
                      <p className='text-center'>{!postActioners.share ? "share":"shared"}</p>
                    </div>
                  }
                  


                  <div className='commentsContainer cursor-pointer duration-100 hover:shadow-[0px_0px_5px_#5a29cc] py-1 flex-1 flex flex-col gap-1 items-center active:scale-[.90]' onClick={()=>{
                    setToggleComments(!toggleComments)
                  }}>
                    <i className="bi bi-chat-square-text-fill"></i>
                    <p className='text-center'>comments</p>
                  </div>
                  


                  <div onClick={()=>setPostActioners(prevState=>{
                    return {...prevState,reported:!prevState.reported}
                  })} className='reportContainer cursor-pointer duration-100 hover:shadow-[0px_0px_5px_#5a29cc] py-1 flex-1 flex flex-col gap-1 items-center active:scale-[.90]'>
                  {!postActioners.reported ?<i className="bi bi-flag"></i>:<i className="bi bi-flag-fill text-red-700"></i>}
                    <p>{!postActioners.reported ? "report":"reported"}</p>
                  </div>
                  
                </div>}

                <div className={`commentsSection xx:absolute top-0 z-10 ${index%2==0 ? "right-0":"left-0"}`}>
                <div className="commentsContainer">
                  <div className='commentsHeader mt-3 bg-[#1e1e1e] rounded-sm p-1 cursor-pointer' onClick={()=>{
                    setToggleComments(!toggleComments)
                  }}>
                    <p className='font-semibold font-Karla'>See Comments ({!commentsUsers? "retriving comments..":commentsUsers.length})</p>
                  </div>
                  {toggleComments &&
                    <div>
                        {commentsUsers.length===0 && <p className='bg-[#111111] text-center'>It's empty here :/</p>}

                      <div className='commentParent max-h-[350px] overflow-y-scroll p-3 flex flex-col gap-3 bg-[#111111]'>
                        {commentsUsers.map((comUser,index)=>{
                          return <Comment key={index} userId={user._id} {...comUser}/>
                        })}
                      </div>

                        {logged && <div className='bg-[#1e1e1e] p-2'>
                          <div className='createCommentContainer flex items-center gap-4'>
                        <input ref={commentInput} type='text' className='w-[100%] outline-none bg-transparent border-b border-gray-500 text-gray-400' placeholder={commentPlaceholder}/>
                        <button onClick={handleComment} className='bg-gray-600 outline-none font-medium font-Karla cursor-pointer px-3 py-1 border-2 border-gray-600 active:border-gray-400 active:scale-90 duration-[.08s]'>Comment</button>
                      </div>
                      <p className='commentStatus'>{commentStatus}</p></div>}
                     
                    </div>
                  
                  }
                </div>
                </div>


            </div>


           

        </div>
      </div>
    </div>
  )
}

export default Post
