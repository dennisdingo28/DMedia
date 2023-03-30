import React, { useState,useRef } from 'react'
import Logo from './Logo';
import axios from "axios";
import defaultProfile from "../imgs/defaultProfile.jpg";

const Authenticate = () => {

    const fileInput = useRef();

    const [showPassword,setShowPassword] = useState(false);
    const [form,setForm]=useState(true);  
    const [formStatus,setFormStatus]=useState("");  
    const [error,setError]=useState(false);
    //true-register form;
    //false-login form;

    const [registerInputStates,setRegisterInputs] = useState({
        username:"",
        email:"",
        password:"",
        profileUrl:""
    })
    const [loginInputStates,setLoginInputs] = useState({
        email:"",
        password:""
    })

    function checkEmpty(text){
        if(text.trim()==='')
            return true;
        return false;
    }

    function clearInput(){
        setRegisterInputs({
            username:"",
            password:"",
            email:""
        });
        setLoginInputs({
            email:"",
            password:""
        });
    }

    function handleAuthentication(){
        setError(undefined);
        setFormStatus("Please wait...");
        setTimeout(()=>{
            clearInput();
            setFormStatus("");
        },2500);
    }

    async function createAccount(){
        try{
            handleAuthentication();
            const req = await axios.post("/auth/register",registerInputStates);
            setError(!req.data.good);
            setForm(!req.data.good);
            setFormStatus(req.data.msg);
            console.log(req);
          
        }catch(err){
            setError(true);
            setFormStatus("Cannot communicate with the server.Please try again later.");
            setTimeout(clearInput,2500);
            setTimeout(()=>{setFormStatus("")},2500);
        }
    }
    
    async function loginAccount(){
        try{
            handleAuthentication();
            const req = await axios.post('/auth/login',loginInputStates);
            setError(!req.data.good);
            setForm(!req.data.good);
            setFormStatus(req.data.msg);
            
        }catch(err){
            setError(true);
            setFormStatus("Cannot communicate with the server.Please try again later.");
            setTimeout(() => {
                setFormStatus("");
            }, 2500);
        }
    }

    function validateErrorHandler(){
        setFormStatus("Please enter valid data !");
        setError(true);
        setTimeout(()=>{
            clearInput();
            setFormStatus("");
            setError(false);
        },2500);
    }

    function validateInputs(){
        if(form){
            if(checkEmpty(registerInputStates.username) || checkEmpty(registerInputStates.email) || checkEmpty(registerInputStates.password)){
                validateErrorHandler();
            }else{
                createAccount();
            }
        }else{
            if(checkEmpty(loginInputStates.email) || checkEmpty(loginInputStates.password)){
                validateErrorHandler();
            }else{
                loginAccount();
            }
        }
    }

    function handleProfile(){
        fileInput.current.value="";
        fileInput.current.click();
    }

    function handleFileInput(e){
        const userImage = e.target.files[0];

        console.log(userImage);

        if(userImage){
            const imageUrl = URL.createObjectURL(userImage);
            console.log(imageUrl);
            setRegisterInputs(prevState=>{
                return {
                    ...prevState,
                    profileUrl:imageUrl
                }
            })
            URL.revokeObjectURL(userImage);
            console.log(registerInputStates);
        }

    }

  return (
    <div className='authWrapper'>
        <div className='authContainer bg-[#0b0b0b] min-h-screen text-white'>

            <div className='parent-container'>
                {/*navbar*/}
                <div className='navbarContainer py-4 flex items-center justify-between'>
                    <div className='cursor-pointer'>
                        <Logo/>
                    </div>
                    <div className='moreContainer'>
                        <i className='bi bi-chevron-down cursor-pointer'></i>
                    </div>
                </div>      

                {/*hero*/}
                <div className='mt-10'>
                    <h1 className='text-[2.2em] font-Open font-bold text-center'>Welcome <span className='text-darkViolet'>to</span> the most <span className='text-darkViolet'>modern</span> social media</h1>
                
                    <div className='authenticationWrapper'>
                        <div className='authenticationContainer'>
                            <div className='bg-[#070707] px-2 py-1 rounded-t-md'>
                                <p className='font-Noto text-[.9em] font-thin'>Choose your authentication</p>
                            </div>

                            <div className='authWrapper bg-[#0c0c0c]'>
                                <div>
                                    <div className='flex items-center justify-center gap-6 pt-2'>
                                        <p className={`${!form ? "text-gray-500":"text-white"} font-thin cursor-pointer relative after:content-[""] after:h-[1.6px] after:bg-darkBlue after:absolute after:bottom-[-3px] after:left-[50%] after:translate-x-[-50%] after:w-[0px] hover:after:w-[100%] after:duration-[.20s]`} onClick={()=>setForm(true)}>Register</p>
                                        <p className={`${form ? "text-gray-500":"text-white"} font-thin cursor-pointer relative after:content-[""] after:h-[1.6px] after:bg-darkBlue after:absolute after:bottom-[-3px] after:left-[50%] after:translate-x-[-50%] after:w-[0px] hover:after:w-[100%] after:duration-[.20s]`} onClick={()=>setForm(false)}>Login</p>
                                    </div>
                                    <div className='authContainer p-3 relative'>
                                        {
                                            form ? <div className='registerContainer mt-3'>
                                            <p className='text-center lowercase font-Open'>@ register</p>
                                        
                                            <div className='registerForm flex flex-col gap-6'>
                                                <div className='usernameContainer flex items-center gap-2'>
                                                    <i className='bi bi-person'></i>
                                                    <input onChange={(e)=>setRegisterInputs(prevState=>{
                                                        return {
                                                            ...prevState,
                                                            username:e.target.value,
                                                        }
                                                    })} value={registerInputStates.username} type="text" placeholder='username' className='text-[.9em] bg-transparent outline-none border-b w-[100%]'/>
                                                </div>
                                                <div className='emailContainer flex items-center gap-2'>
                                                    <i className='bi bi-envelope'></i>
                                                    <input value={registerInputStates.email} onChange={(e)=>setRegisterInputs(prevState=>{
                                                        return {
                                                            ...prevState,
                                                            email:e.target.value
                                                        }                                                  
                                                    })} type="email" placeholder='email' className='text-[.9em] bg-transparent outline-none border-b w-[100%]'/>
                                                </div>
                                                <div className='passwordContainer flex items-center gap-2'>
                                                    <i className='bi bi-shield'></i>
                                                    <input value={registerInputStates.password} onChange={(e)=>setRegisterInputs(prevState=>{
                                                        return {
                                                            ...prevState,
                                                            password:e.target.value
                                                        }
                                                    })} type={showPassword ? "text":"password"} placeholder='password' className='text-[.9em] bg-transparent outline-none border-b w-[100%]'/>
                                                        {showPassword ? <i onClick={()=>setShowPassword(false)} className="bi bi-eye cursor-pointer hover:bg-gray-800 duration-[.10s] px-1 rounded-full"></i>:<i onClick={()=>setShowPassword(true)} className="bi bi-eye-slash cursor-pointer hover:bg-gray-800 duration-[.10s] px-1 rounded-full"></i>}
                                                </div>
                                                <div className='profilePictureContainer'>
                                                    <div className='profileContainer flex items-center justify-center'>
                                                        <div className='relative'>
                                                          
                                                            <img className='w-[45px] h-[45px] rounded-full' src={registerInputStates.profileUrl || defaultProfile} alt="Profile"/>
                                                            {registerInputStates.profileUrl!==defaultProfile && registerInputStates.profileUrl!=="" ? <i onClick={()=>setRegisterInputs(prevState=>{
                                                                return {
                                                                    ...prevState,
                                                                    profileUrl:""
                                                                }
                                                            })} className="absolute -top-2 -right-1 cursor-pointer bi bi-x"></i>:""}
                                                        </div>
                                                        
                                                    </div>
                                                    <div>
                                                        <div className='controllFileInputContainer'>
                                                            <input onChange={handleFileInput} ref={fileInput} type={"file"} className="hidden"/>
                                                        </div>
                                                        <div className='fileInputContainer text-center mt-3 mb-1'>
                                                            <button onClick={handleProfile} className='bg-darkPurple p-1 rounded-sm font-Noto text-[.80em] duration-150 active:scale-95 cursor-pointer hover:shadow-[0px_2px_5px_#3c06ba]'>Choose Profile Picture</button>
                                                        </div>
                                                        <div>
                                                            <p className='fileName text-[.6em] text-center mt-1'>Filename</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='submitContainer text-center'>
                                                    <button onClick={validateInputs} className='bg-transparent border font-Noto rounded-sm text-[.92em] border-darkBlue px-2 py-1 hover:bg-darkBlue duration-[.25s]'>Create my account</button>
                                                    <p className={`formStatus text-[.8em] font-Open mt-3 ${error ? "text-red-700":"text-green-600"}`}>{formStatus}</p>
                                                </div>
                                                
                                            </div>
                                        </div> :
                                        <div className='loginContainer duration-150'>
                                            <p className='text-center mt-3 lowercase font-Open'>@ login</p>
                                            <div className='loginForm flex flex-col gap-6'>

                                                <div className='emailContainer flex items-center gap-2'>
                                                    <i className='bi bi-envelope'></i>
                                                    <input value={loginInputStates.email} onChange={(e)=>setLoginInputs(prevState=>{
                                                        return {
                                                            ...prevState,
                                                            email:e.target.value
                                                        }
                                                    })} type="email" placeholder='email' className='text-[.9em] bg-transparent outline-none border-b w-[100%]'/>
                                                </div>
                                                <div className='passwordContainer flex items-center gap-2'>
                                                    <i className='bi bi-shield'></i>
                                                    <input value={loginInputStates.password} onChange={(e)=>setLoginInputs(prevState=>{
                                                        return {
                                                            ...prevState,
                                                            password:e.target.value
                                                        }
                                                    })} type={showPassword ? "text":"password"} placeholder='password' className='text-[.9em] bg-transparent outline-none border-b w-[100%]'/>
                                                    {showPassword ? <i onClick={()=>setShowPassword(false)} className="bi bi-eye cursor-pointer hover:bg-gray-800 duration-[.10s] px-1 rounded-full"></i>:<i onClick={()=>setShowPassword(true)} className="bi bi-eye-slash cursor-pointer hover:bg-gray-800 duration-[.10s] px-1 rounded-full"></i>}
                                                </div>
                                                <div className='submitContainer text-center'>
                                                    <button onClick={validateInputs} className='bg-transparent border font-Noto rounded-sm text-[.92em] border-darkBlue px-2 py-1 hover:bg-darkBlue duration-[.25s]'>Login</button>
                                                    <p className={`formStatus text-[.8em] font-Open mt-3 ${error ? "text-red-700":"text-green-600"}`}>{formStatus}</p>                                                </div>
                                            </div> 
                                        </div>
                            
                                        } 
                                    </div>
                                </div>
                             
                            </div>
                        </div>
                       
                    </div>
                </div>

            </div>
           

        </div>
    </div>
  )
}

export default Authenticate