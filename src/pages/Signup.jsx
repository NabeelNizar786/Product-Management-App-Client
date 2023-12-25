import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { userSignup } from "../services/userApi";

const Signup = () => {
  const [userState, setUserState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserState((prevUserState) => ({
      ...prevUserState,
      [name]: value,
    }));
  };

  const loginPage = () =>{
    navigate('/user/login')
  };

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      userSignup({...userState})
      .then((res) => {
        if(res.data.created){
          navigate('/user/login');
        }
      }).catch((error) => {
        console.log(error.message);
      })
    } catch (error) {
      console.log(error.message)
    }
  };

  useEffect(() => {
    if(localStorage.getItem('userJwt')) {
      navigate('/user/home')
    }
  })

  return (
    <>
      <div className="container">
        <div className="signup">
          <div className="content">
          <h2 style={{ fontSize: "30px" }}>WELCOME BACK</h2>
          <p>To Get Connected With Us Please Login With Your Personal Info</p>
            <button onClick={loginPage} className="imageButton">Sign In</button>
          </div>
        </div>
        <div className="formContainer">
          <h2>Create Your Account</h2>
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Name"
              name="username"
              value={userState.username}
              onChange={handleInputChange}
              className="input"
            />
          </div>

          <div className="inputContainer">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={userState.email}
              onChange={handleInputChange}
              className="input"
            />
          </div>

          <div className="inputContainer">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={userState.password}
              onChange={handleInputChange}
              className="input"
            />
          </div>

          <button onClick={handleSignup} className="signupButton">
            Signup
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
