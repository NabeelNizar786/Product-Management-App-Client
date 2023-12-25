import React, { useEffect } from 'react';
import { useState } from 'react';
import { userLogin } from '../services/userApi';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';

export const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
        userLogin({...loginInfo})
        .then((res) => {
            localStorage.setItem("userJwt",res.data.token);
            if (res.data.login) {
                navigate('/user/home');
            }
        })
        .catch((error) => {
            console.error(error)
        })
    } catch (error) {
        console.error(error)
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevLoginInfo) => ({
      ...prevLoginInfo,
      [name]: value,
    }));
  };

  const signupPage = () => {
    navigate('/user/signup')
  }

  useEffect(() => {
    if(localStorage.getItem('userJwt')) {
      navigate('/user/home')
    }
  })

  return (
    <>
    <div className='container'>
      <div className="formContainer">
        <h2>Sign In to Your Account</h2>

        <div className="inputContainer">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginInfo.email}
            onChange={handleInputChange}
            className="input"
          />
        </div>

        <div className="inputContainer">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginInfo.password}
            onChange={handleInputChange}
            className="input"
          />
        </div>

        <button onClick={handleSubmit} className="signupButton2">
          Login
        </button>
      </div>

      <div className="signup">
        <div className="content">
          <h2 style={{ fontSize: "30px" }}>HELLO FRIEND</h2>
          <p>Enter Your Personal Details and Start a Journey With Us</p>
          <button onClick={signupPage} className="imageButton">Sign Up</button>
        </div>
      </div>
    </div>
    <div>
    <Notification/>
    </div>
    </>
  );
};
