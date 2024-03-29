import React, { useState,useEffect } from 'react'
import LoginImg from "../Assets/Signup.png"
import "../Css/Login.css"
import Pig from "../Assets/pig.png"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../features/userSlice';
import {default as firebase} from '../services/firebase';


function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const authUser = useSelector(selectUser);
    const dispatch = useDispatch();

    const navigator = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if(email==='' || password === ''){
            alert('All fields are required');
            return;
        }
        
        const loginResponse = await firebase.login(email,password);
        if(loginResponse?.code===500){
            alert("Error Logging in")
        }
        else {
            console.log(loginResponse.user)
            navigator("/");
            dispatch(login);
        }
        // console.log(loginResponse)
    }

    useEffect(()=>{
        if(authUser!=null){
          navigator("/");
        }
      },[authUser])

   return (
    <div className='Login'>
        <div className='Login-left'>
            <div className='login-home'>
                <img className='login-home-btn' onClick={()=>{
                    navigator("/");
                }} src={Pig} alt="pigshell"/>
            </div>
            <div className='Login-head'>
                <div>Log In</div>
                <div className='Login-subhead'>
                    Login to view your images
                </div>
            </div>
            <div className='Login-card'>
                <form className='Login-form'>
                    {/* <label for="name">Your Name</label> */}
                    <input className='Login-input' placeholder='Email' autoComplete='off' id='login-email' value={email} onChange={(e)=>{
                        setEmail(e.target.value);
                    }}/>
                    <input className='Login-input'  placeholder='Password' type='password' autoComplete='off' id='login-password' value={password} onChange={(e)=>{
                        setPassword(e.target.value);
                    }}/>
                    <button type="submit" onClick={handleLogin} id='login-btn'>Log In</button>
                </form>
            </div>
            <div className='Login-footer'>
                <p>Don't have account? <a className='login-redirect highlight-text' href='/signup'>Signup Here</a></p>
            </div>
        </div>
        <div className='Login-right'>
        <div className='Login-welcome'>
        <h2>Welcome Back</h2>
            <p>We were missing your Piggy Awesomeness!</p>
        </div>
        <div className='Login-img'>
            <img src={LoginImg} alt='login'/>
        </div>
        </div>
    </div>
  )
}

export default Login