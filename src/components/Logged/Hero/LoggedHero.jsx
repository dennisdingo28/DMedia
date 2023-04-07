import React,{useState} from 'react';
import defaultProfile from "../../../imgs/defaultProfile.jpg";
import rocketMan from "../../../imgs/man-rocket.png";
import postImage from "../../../imgs/postImage.png";

import axios from "axios";

const LoggedHero = (props) => {
  const {user,setUser,logged,setLogged,token}=props;
  const [fileStatus,setFileStatus] = useState("")
    const [formStatus,setFormStatus] = useState("");
    
    const [validImage,setValidImage] = useState(true);

    const [openFileSettings,setOpenFileSettings] = useState(false);

    const [postTitle,setPostTitle] = useState("");
    const [postDescription,setPostDescription] = useState("");

    const [imageSettings,setImageSettings] = useState({
        imageUrl:"",
        imageAlt:""
    })

    const [imageSrc,setImageSrc] = useState(defaultProfile);

    function validateInputs(){
        if(postTitle.trim()==='' || !validImage)
        {   
            if(postTitle.trim()==='')
                setFormStatus("Cannot submit an empty post");
            else
                setFormStatus("Please correct your image url")
        }else{
            createPost();
        }
        setTimeout(clearInputs,2500);
    }

    async function createPost(){
        const postData = {
            ...imageSettings,
            title:postTitle,
            description:postDescription
        }
        const req = await axios.post("/create/post",postData,{
            headers:{
                authorization:`Bearer ${token}`
            }
        });
        setFormStatus("Post was successfully created!");
        console.log(req);
    }

    function clearInputs(){
        setValidImage(true);
        setPostTitle("");
        setFormStatus("");
        setImageSettings({imageUrl:"",imageAlt:""});
        setImageSrc(defaultProfile);
        setPostDescription("");
        window.location.reload();
    }

  return (
    <div className='mt-8'>
        <div className='md:flex md:justify-around md:gap-10 md:items-center'>
            <div className='postContainer'>
                <div className='postTestmonial'>
                    <h1 className='font-medium font-Karla text-[1.3em] capitalize mb-3'>Let <span className='text-darkBlue'>People</span> Know That <span className='text-darkBlue'>You</span> Are Here</h1>
                </div>

                <div className='createPostContainer'>
                    <div className='postHeader flex items-center gap-2'>
                        <div className=''>
                            <img alt='profile' src={user.profileUrl} className='cursor-pointer object-cover w-[50px] h-[45px] rounded-full'/>
                        </div>
                        <div className='w-[100%] flex items-center'>
                            <input onChange={(e)=>{setPostTitle(e.target.value)
                            }} value={postTitle} autoFocus type='text' placeholder="What's new?" className='text-[#9ca3af] focus:border-b-2 font-Karla w-[100%] bg-transparent outline-none border-b border-darkViolet'/>
                            <i onClick={validateInputs} className="bi bi-plus-circle-fill cursor-pointer text-[#9ca3af] duration-100 hover:text-[#83878c]"></i>
                        </div>
                    </div>
                    <p className='font-medium font-Noto'>{formStatus}</p>
                    <div className='postBody mt-2 rounded-sm'>
                        <div onClick={()=>setOpenFileSettings(!openFileSettings)} className='flex items-center justify-between cursor-pointer bg-[#1d1b1b] p-2 relative'>
                            <p className='font-semibold text-[.9em]'>Manage your post</p>
                            <i className="bi bi-chevron-expand"></i>

                            <div className={`absolute top-10 ${openFileSettings ? "hidden":"block left-[50%] -translate-x-[50%]"}`}>
                                <img src={postImage} alt='post' className='max-w-[500px] w-[100%] max-h-[500px] min-w-[350px] min-h-[350px] h-[100%] object-cover'/>
                                <h1 className='font-bold text-[1.5em] font-Noto max-w-[380px] text-center'>Share your image</h1>
                            </div>
                        </div>
                        
                        <div className={`imageOptionsContainer bg-[#131313] p-2 duration-150 ${openFileSettings ? "opacity-100":"opacity-0"}`}>
                            <div className='imgProps flex items-center justify-between gap-5 mt-2'>
                                <div className='imgUrl flex items-center'>
                                    <div className='bg-[#161616] w-[40px] h-[40px] rounded-tl-md rounded-bl-md flex items-center justify-center'>
                                        <i className="bi bi-link-45deg"></i>
                                    </div>
                                    <div>
                                        <input placeholder='image url' value={imageSettings.imageUrl} onChange={(e)=>setImageSettings(prevState=>{
                                            return {
                                                ...prevState,
                                                imageUrl:e.target.value
                                            }
                                        })} type='text' className='placeholder:opacity-30 outline-none w-[100%] h-[40px] px-1 text-gray-500 bg-[#1e1e1e]'/>
                                    </div>
                                </div>
                                <div className='imgAlt flex items-center'>
                                    <div className='bg-[#161616] w-[40px] h-[40px] rounded-tl-md rounded-bl-md flex items-center justify-center'>
                                        <i className="bi bi-chat-quote"></i>
                                    </div>
                                    <div>
                                        <input placeholder='image alt' value={imageSettings.imageAlt} onChange={(e)=>setImageSettings(prevState=>{
                                            return {
                                                ...prevState,
                                                imageAlt:e.target.value
                                            }
                                        })} type='text' className='placeholder:opacity-30 outline-none w-[100%] h-[40px] px-1 text-gray-500 bg-[#1e1e1e]'/>
                                    </div>
                                </div>
                            </div>
                           <div className='manipulateImageContainer'>
                                <div className='imageContainer flex items-center justify-center my-6'>
                                    <img onError={()=>{setValidImage(false)
                                        setFileStatus("Image url is not valid");
                                    }} onLoad={()=>{setValidImage(true)
                                        setFileStatus("")
                                    }} alt='selected img' src={imageSrc} className='max-w-[500px] max-h-[500px] object-cover w-[100%] h-[100%]'/>
                                </div>
                                <div>
                                    <textarea onChange={(e)=>{setPostDescription(e.target.value)}} value={postDescription} className='w-[100%] h-[150px] bg-transparent outline-none border-x px-2 font-Open font-[1.1em] resize-none' placeholder='your description here'>

                                    </textarea>
                                </div>
                                <div className='flex items-center flex-col justify-center'>
                                    <button onClick={()=>{
                                        setImageSrc(imageSettings.imageUrl ===''?defaultProfile:imageSettings.imageUrl)
                                    }} className='bg-darkBlue px-8 py-1 rounded-sm font-Open active:scale-[.9]'>Set</button>
                                    <p className='fileStatus'>{fileStatus}</p>
                                </div>
                           </div>
                        </div>
                       
                    </div>
                </div>

            </div>
            <div className='hidden md:block'>
                <h1 className='font-bold text-[1.5em] font-Noto max-w-[380px]'>Start Your Day By Saying Hello To The Others</h1>
                <img src={rocketMan} className='max-w-[500px] w-[100%] max-h-[500px] min-w-[350px] min-h-[350px] h-[100%] object-cover' alt='rocket'/>
            </div>
        </div>
    </div>
  )
}

export default LoggedHero