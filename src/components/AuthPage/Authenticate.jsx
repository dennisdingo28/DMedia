import React, { useState, useRef } from "react";
import Logo from "../CommonComponents/Logo";
import axios from "axios";
import defaultProfile from "../../imgs/defaultProfile.jpg";
import rocket from "../../imgs/rocket.png";
import planets from "../../imgs/planets.png";
import businessMan from "../../imgs/business-man.png";

import {useNavigate} from "react-router-dom";

const Authenticate = ({setToken}) => {
  const navigate = useNavigate();

  const imgUrl = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(true);
  const [formStatus, setFormStatus] = useState("");
  const [error, setError] = useState(false);
  const [imgError,setImgError] = useState("");

  const [navbar,setNavbar] = useState(false);
  //true-register form;
  //false-login form;

  const [registerInputStates, setRegisterInputs] = useState({
    username: "",
    email: "",
    password: "",
    profileUrl: defaultProfile,
  });
  const [loginInputStates, setLoginInputs] = useState({
    email: "",
    password: "",
  });

  function checkEmpty(text) {
    if (text.trim() === "") return true;
    return false;
  }

  function clearInput() {
    setRegisterInputs({
      username: "",
      password: "",
      email: "",
      profileUrl: defaultProfile,
    });
    setLoginInputs({
      email: "",
      password: "",
    });
  }

  function handleAuthentication() {
    setError(undefined);
    setFormStatus("Please wait...");
    setTimeout(() => {
      clearInput();
      setFormStatus("");
    }, 2500);
  }

  async function createAccount() {
    try {
      handleAuthentication();
      const req = await axios.post("/auth/register", registerInputStates);
      setError(!req.data.good);
      setForm(!req.data.good);
      setFormStatus(req.data.msg);
      console.log(req);
    } catch (err) {
      setError(true);
      setFormStatus(
        "Cannot communicate with the server.Please try again later."
      );
      setTimeout(clearInput, 2500);
      setTimeout(() => {
        setFormStatus("");
      }, 2500);
    }
  }

  async function loginAccount() {
    try {
      handleAuthentication();
      const req = await axios.post("/auth/login", loginInputStates);
      setError(!req.data.good);
      setForm(!req.data.good);
      setFormStatus(req.data.msg);
      setToken(req.data.token);

      localStorage.setItem('token',req.data.token);
      if(req.data.good)
        setTimeout(()=>{
          navigate('/');
        },1500);

    } catch (err) {
      setError(true);
      setFormStatus(
        "Cannot communicate with the server.Please try again later."
      );
      setTimeout(() => {
        setFormStatus("");
      }, 2500);
    }
  }

  function validateErrorHandler() {
    setFormStatus("Please enter valid data !");
    setError(true);
    setTimeout(() => {
      clearInput();
      setFormStatus("");
      setError(false);
    }, 2500);
  }

  function validateInputs() {
    if (form) {
      if (
        checkEmpty(registerInputStates.username) ||
        checkEmpty(registerInputStates.email) ||
        checkEmpty(registerInputStates.password)
      ) {
        validateErrorHandler();
      } else {
        createAccount();
      }
    } else {
      if (
        checkEmpty(loginInputStates.email) ||
        checkEmpty(loginInputStates.password)
      ) {
        validateErrorHandler();
      } else {
        loginAccount();
      }
    }
  }


  function toggleMenu(){
    setNavbar(!navbar);
  }

  function handleImgUrlError(){
    setImgError("Invalid URL");
  }

  return (
    <div className="authWrapper">
      <div className="authContainer bg-dark min-h-screen text-white pb-10">
        <div className="parent-container">
          {/*navbar*/}
          <div className="navbarContainer py-4 flex items-center justify-between">
            <div className="cursor-pointer">
              <Logo />
            </div>
            <div className="moreContainer relative">
              <i onClick={toggleMenu} className={`bi bi-chevron-down cursor-pointer`}></i>
              <div className={`absolute left-[50%] -translate-x-[50%] ${!navbar ? "hidden":"block"}`}>
                <p className="text-white cursor-pointer">FAQ</p>
              </div>
            </div>
          </div>

          {/*hero*/}
          <div className="mt-10">
            <div className="heroHeader text-center">
              <h1 className="text-[1.5em] font-Open font-bold sm:text-[2em]">
                Welcome <span className="text-darkViolet">to</span> the most{" "}
                <span className="text-darkViolet">modern</span> social media
              </h1>
              <a href="/">
                <button className="mt-7 duration-200 hover:-translate-y-[5px] bg-transparent border-2 border-[#dfab0e] rounded-lg p-2 text-[#dfab0e] hover:shadow-[0px_0px_4px_#dfab0e]">
                  Explore Now
                </button>
              </a>
            </div>
          </div>

          {/*page content*/}
          <div className="authenticationWrapper lg:flex lg:items-center lg:justify-between">
            <div className="authenticationContainer font-Karla font-medium mt-32 w-[100%]">
              <h2 className="font-bold text-[1.2em] mb-3 max-w-[800px] mx-auto lg:mx-0">
                Authenticate and <span className="text-darkViolet">unlock</span>{" "}
                the power of DMedia
              </h2>
              <div className="authenticationContainer mx-auto lg:mx-0 max-w-[800px] w-[100%]">
                <div className="bg-[#070707] px-2 py-1 rounded-t-md">
                  <p className="font-Noto text-[1em] font-thin">
                    Choose your authentication
                  </p>
                </div>
                <div className="authWrapper bg-[#111111]">
                  <div>
                    <div className="flex items-center justify-center gap-6 pt-2">
                      <p
                        className={`${
                          !form ? "text-gray-500" : "text-white"
                        }  font-thin cursor-pointer relative after:content-[""] 
                                            text-[1.2em]
                                            after:h-[1.6px] 
                                            
                                            after:bg-darkBlue after:absolute after:bottom-[-3px] after:left-[50%] after:translate-x-[-50%] after:w-[0px] hover:after:w-[100%] after:duration-[.20s]`}
                        onClick={() => setForm(true)}
                      >
                        Register
                      </p>
                      <p
                        className={`${
                          form ? "text-gray-500" : "text-white"
                        } font-thin cursor-pointer relative after:content-[""] after:h-[1.6px]
                                            text-[1.2em]
                                            after:bg-darkBlue after:absolute after:bottom-[-3px] after:left-[50%] after:translate-x-[-50%] after:w-[0px] hover:after:w-[100%] after:duration-[.20s]`}
                        onClick={() => setForm(false)}
                      >
                        Login
                      </p>
                    </div>
                    <div className="authContainer p-3 relative">
                      {form ? (
                        <div className="registerContainer mt-3">
                          <p className="text-center lowercase font-Open mb-3">
                            @ register
                          </p>

                          <div className="registerForm flex flex-col gap-6">
                            <div className="usernameContainer flex items-center gap-2">
                              <i className="bi bi-person"></i>
                              <input
                                onChange={(e) =>
                                  setRegisterInputs((prevState) => {
                                    return {
                                      ...prevState,
                                      username: e.target.value,
                                    };
                                  })
                                }
                                value={registerInputStates.username}
                                type="text"
                                placeholder="username"
                                className="text-[1em] bg-transparent outline-none border-b w-[100%]"
                              />
                            </div>
                            <div className="emailContainer flex items-center gap-2">
                              <i className="bi bi-envelope"></i>
                              <input
                                value={registerInputStates.email}
                                onChange={(e) =>
                                  setRegisterInputs((prevState) => {
                                    return {
                                      ...prevState,
                                      email: e.target.value,
                                    };
                                  })
                                }
                                type="email"
                                placeholder="email"
                                className="text-[1em] bg-transparent outline-none border-b w-[100%]"
                              />
                            </div>
                            <div className="passwordContainer flex items-center gap-2">
                              <i className="bi bi-shield"></i>
                              <input
                                value={registerInputStates.password}
                                onChange={(e) =>
                                  setRegisterInputs((prevState) => {
                                    return {
                                      ...prevState,
                                      password: e.target.value,
                                    };
                                  })
                                }
                                type={showPassword ? "text" : "password"}
                                placeholder="password"
                                className="text-[1em] bg-transparent outline-none border-b w-[100%]"
                              />
                              {showPassword ? (
                                <i
                                  onClick={() => setShowPassword(false)}
                                  className="bi bi-eye cursor-pointer hover:bg-gray-800 duration-[.10s] px-1 rounded-full"
                                ></i>
                              ) : (
                                <i
                                  onClick={() => setShowPassword(true)}
                                  className="bi bi-eye-slash cursor-pointer hover:bg-gray-800 duration-[.10s] px-1 rounded-full"
                                ></i>
                              )}
                            </div>
                            <div className="profilePictureContainer">
                              <div className="profileContainer flex items-center justify-center gap-2">
                                  <input ref={imgUrl} type="text" className="imageUrl max-w-[350px] bg-transparent outline-none" placeholder="enter the url of the image"/>
                                  <img src={registerInputStates.profileUrl} onError={handleImgUrlError} onLoad={()=>{setImgError("")}} className="w-[40px] h-[40px] rounded-full" alt="profile"/>
                              </div>
                              <div className="flex items-center justify-center gap-2">
                                <button onClick={()=>{
                                  console.log(imgUrl);
                                  setRegisterInputs(prevState=>{
                                    return {
                                      ...prevState,
                                      profileUrl:imgUrl.current.value.trim()==="" ? defaultProfile:imgUrl.current.value
                                    }
                                  })
                                  }} className=" bg-darkPurple p-2 rounded-sm cursor-pointer hover:shadow-[0px_0px_5px_#3c06ba] active:scale-[.95] duration-100">Set Image</button>
                                  <p className="text-[.9em]">{imgError}</p>
                              </div>
                            </div>
                            <div className="submitContainer text-center">
                              <button
                                onClick={validateInputs}
                                className="bg-transparent border font-Noto rounded-sm text-[.92em] border-darkBlue px-2 py-1 hover:bg-darkBlue duration-[.25s]"
                              >
                                Create my account
                              </button>
                              <p
                                className={`formStatus text-[.8em] font-Open mt-3 ${
                                  error ? "text-red-700" : "text-green-600"
                                }`}
                              >
                                {formStatus}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="loginContainer duration-150">
                          <p className="text-center mt-3 mb-3 lowercase font-Open">
                            @ login
                          </p>
                          <div className="loginForm flex flex-col gap-6">
                            <div className="emailContainer flex items-center gap-2">
                              <i className="bi bi-envelope"></i>
                              <input
                                value={loginInputStates.email}
                                onChange={(e) =>
                                  setLoginInputs((prevState) => {
                                    return {
                                      ...prevState,
                                      email: e.target.value,
                                    };
                                  })
                                }
                                type="email"
                                placeholder="email"
                                className="text-[1em] bg-transparent outline-none border-b w-[100%]"
                              />
                            </div>
                            <div className="passwordContainer flex items-center gap-2">
                              <i className="bi bi-shield"></i>
                              <input
                                value={loginInputStates.password}
                                onChange={(e) =>
                                  setLoginInputs((prevState) => {
                                    return {
                                      ...prevState,
                                      password: e.target.value,
                                    };
                                  })
                                }
                                type={showPassword ? "text" : "password"}
                                placeholder="password"
                                className="text-[1em] bg-transparent outline-none border-b w-[100%]"
                              />
                              {showPassword ? (
                                <i
                                  onClick={() => setShowPassword(false)}
                                  className="bi bi-eye cursor-pointer hover:bg-gray-800 duration-[.10s] px-1 rounded-full"
                                ></i>
                              ) : (
                                <i
                                  onClick={() => setShowPassword(true)}
                                  className="bi bi-eye-slash cursor-pointer hover:bg-gray-800 duration-[.10s] px-1 rounded-full"
                                ></i>
                              )}
                            </div>
                            <div className="submitContainer text-center">
                              <button
                                onClick={validateInputs}
                                className="bg-transparent border font-Noto rounded-sm text-[.92em] border-darkBlue px-2 py-1 hover:bg-darkBlue duration-[.25s]"
                              >
                                Login
                              </button>
                              <p
                                className={`formStatus text-[.8em] font-Open mt-3 ${
                                  error ? "text-red-700" : "text-green-600"
                                }`}
                              >
                                {formStatus}
                              </p>{" "}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block lg:w-[100%]">
                  <img src={businessMan} className="max-w-[1200px] w-[100%] object-cover"/>
                  <h2 className="uppercase font-Open font-bold text-center text-[1.3em]">GET INTO THE ACTION!</h2>
            </div>
          </div>

          <div className="presentationWrapper mt-20">
            <div className="presentationContainer">
              <h2 className="font-bold text-[1.2em]">
                What <span className="text-darkViolet">is</span> DMedia ?
              </h2>
            </div>
            <div className="mt-2">
              <img
                src={planets}
                className=" mb-2 max-w-[450px] mx-auto object-cover w-[100%] lg:hidden"
                alt="planets"
              />
              <p className="font-Karla font-medium">
                DMedia is a social media application which allows users to
                explore and interact with other people in a modern,well thought
                and scalable way while using some of the most modern features.
              </p>
            </div>
            <div>
              <div>
                <p className="mt-3 font-bold capitalize text-   [1em]">
                  We Care For Our Users.
                </p>
                <p className="font-Karla">
                  The User Experience is easy and modern thanks to our friendly
                  and intuitive UI.We also provide strong and complex
                  authentication system to protect your sensitive data using
                  some of the most powerful technologies.
                  <br />
                  <span className="font-semibold">Our Mission</span> is to
                  connect people around world in a safety environment so that
                  involves our system that is continously looking for "bad
                  posts" in order to maintain the family friendly environment.
                </p>
              </div>
            </div>
          </div>

          <div className="badgeWrapper mt-20">
            <div className="badgeContainer bg-gradient-to-r from-[#7602CC] to-[#5000B1] px-3 py-4 rounded-lg sm:max-w-[500px] sm:mx-auto">
              <h3 className="text-[1.3em] font-Open font-bold text-white text-center">
                What are you waiting for ?
              </h3>
              <div className="flex items-center flex-col sm:flex-row sm:justify-center">
                <div className="flex-1">
                <img src={rocket} alt="rocketImage" className="min-w-[200px] max-w-[200px] lg:max-w-[700px] lg:w-[100%]" />
                </div>
                
                <div className="flex-1">
                  <a href="/"><button className="mt-4 capitalize font-Noto bg-[#7302ca] px-2 py-3 hover:bg-[#480698] text-[1.1em]">
                    Start From Here
                  </button></a>
                </div>
              </div>
            </div>
          </div>
           
           <div className="footerWrapper mt-20">
                <div className="footerContainer">
                    <p className="copyright text-center font-Open font-medium text-[1.1em]">© Copyright 2023.All rights reserved</p>
                </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default Authenticate;
