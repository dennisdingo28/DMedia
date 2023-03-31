import React, { useState, useRef } from "react";
import Logo from "./Logo";
import axios from "axios";
import defaultProfile from "../imgs/defaultProfile.jpg";
import rocket from "../imgs/rocket.png";
import planets from "../imgs/planets.png";

const Authenticate = () => {
  const fileInput = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(true);
  const [formStatus, setFormStatus] = useState("");
  const [error, setError] = useState(false);

  //true-register form;
  //false-login form;

  const [filename, setFilename] = useState("");

  const [registerInputStates, setRegisterInputs] = useState({
    username: "",
    email: "",
    password: "",
    profileUrl: defaultProfile,
  });
  console.log(registerInputStates);
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
    setFilename("");
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

  function handleProfile() {
    fileInput.current.value = "";
    fileInput.current.click();
  }

  function handleFileInput(e) {
    const userImage = e.target.files[0];

    if (userImage) {
      setFilename(userImage.name);
      const imageUrl = URL.createObjectURL(userImage);
      setRegisterInputs((prevState) => {
        return {
          ...prevState,
          profileUrl: imageUrl,
        };
      });
      URL.revokeObjectURL(userImage);
    }
  }

  return (
    <div className="authWrapper">
      <div className="authContainer bg-[#0b0b0b] min-h-screen text-white pb-10">
        <div className="parent-container">
          {/*navbar*/}
          <div className="navbarContainer py-4 flex items-center justify-between">
            <div className="cursor-pointer">
              <Logo />
            </div>
            <div className="moreContainer">
              <i className="bi bi-chevron-down cursor-pointer"></i>
            </div>
          </div>

          {/*hero*/}
          <div className="mt-10">
            <div className="heroHeader text-center">
              <h1 className="text-[2.2em] font-Open font-bold">
                Welcome <span className="text-darkViolet">to</span> the most{" "}
                <span className="text-darkViolet">modern</span> social media
              </h1>
              <button className="mt-7 duration-200 hover:-translate-y-[5px] bg-transparent border-2 border-[#dfab0e] rounded-lg p-2 text-[#dfab0e] hover:shadow-[0px_0px_4px_#dfab0e]">
                Explore Now
              </button>
            </div>
          </div>

          {/*page content*/}
          <div className="authenticationWrapper">
            <div className="authenticationContainer font-Karla       font-medium mt-20">
              <h2 className="font-bold text-[1.2em] mb-2">
                Authenticate and <span className="text-darkViolet">unlock</span>{" "}
                the power of DMedia
              </h2>
              <div className="authenticationContainer">
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
                                            after:h-[1.6px] after:bg-darkBlue after:absolute after:bottom-[-3px] after:left-[50%] after:translate-x-[-50%] after:w-[0px] hover:after:w-[100%] after:duration-[.20s]`}
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
                          <p className="text-center lowercase font-Open">
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
                              <div className="profileContainer flex items-center justify-center">
                                <div className="relative">
                                  <img
                                    className="w-[45px] h-[45px] rounded-full"
                                    src={
                                      registerInputStates.profileUrl ||
                                      defaultProfile
                                    }
                                    alt="Profile"
                                  />
                                  {registerInputStates.profileUrl !==
                                  defaultProfile ? (
                                    <i
                                      onClick={() => {
                                        setFilename("");
                                        setRegisterInputs((prevState) => {
                                          return {
                                            ...prevState,
                                            profileUrl: defaultProfile,
                                          };
                                        });
                                      }}
                                      className="absolute -top-2 -right-1 cursor-pointer bi bi-x"
                                    ></i>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div>
                                <div className="controllFileInputContainer">
                                  <input
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={handleFileInput}
                                    ref={fileInput}
                                    type={"file"}
                                    className="hidden"
                                  />
                                </div>
                                <div className="fileInputContainer text-center mt-3 mb-1">
                                  <button
                                    onClick={handleProfile}
                                    className="bg-darkPurple p-1 rounded-sm font-Noto text-[.9em] duration-150 active:scale-95 cursor-pointer hover:shadow-[0px_2px_5px_#3c06ba]"
                                  >
                                    Choose Profile Picture
                                  </button>
                                </div>
                                <div>
                                  <p className="fileName text-[.6em] text-center mt-1">
                                    {filename}
                                  </p>
                                </div>
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
                          <p className="text-center mt-3 lowercase font-Open">
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
            <div className="hidden">
              <img src={rocket} alt="login rocket" />
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
                className=" mb-2 max-w-[100%] object-cover w-[100%]"
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
            <div className="badgeContainer bg-gradient-to-r from-[#7602CC] to-[#5000B1] flex flex-col justify-center items-center px-3 py-4 rounded-lg">
              <h3 className="text-[2em] font-Open font-bold text-white">
                What are you waiting for ?
              </h3>
              <div className="flex items-center">
                <img src={rocket} alt="rocketImage" className="max-w-[200px]" />
                <div>
                  <button className="mt-4 capitalize font-Noto bg-[#7401CA] px-2 py-3 hover:bg-[#480698] text-[1.1em]">
                    Start From Here
                  </button>
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
