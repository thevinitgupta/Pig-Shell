import React, { useEffect, useState} from 'react'
import Logo from "../Assets/pig.png"
import "../Css/Navbar.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';
import {default as firebase} from '../services/firebase';

function Navbar() {
  // const [useSandwich, setUseSandwich] = useState(true);
  const [openDropDown, setOpenDropDown] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const authUser = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async() => {
    const loggedOut = await firebase.logout();
    
    if(loggedOut===200){
      dispatch(logout);
      setLoggedIn(false);
      alert("Logged Out Successfully")
    }
    else {
      alert("Error Logging out!")
    }

  };


  const toggleDropDown = () =>{
    setOpenDropDown((prevValue)=>{
      return !prevValue;
    })
  }

  useEffect(()=>{
    if(authUser!=null){
      setLoggedIn(true);
    }
    else {
      setLoggedIn(false);
    }
  },[authUser])


  return (
    <nav className='Navbar'>
        <div className='Navbar-Logo'>
            <img className='pigshell-logo' onClick={()=>{
              navigate("/")
            }} src={Logo} alt="pig logo"/>
        </div>
        <div className='Navmenu'>
            <div className='Nav-item' onClick={()=>{
              navigate("/image");
            }}>Image Filter</div>
            <div className='Nav-item' onClick={()=>{
              navigate("/video");
            }}>Video Filter</div>
            {!loggedIn ? <div className='Nav-item' onClick={()=>{
              navigate("/signup");
            }}>Signup</div> : <div className='Nav-item' onClick={()=>{
              navigate("/dashboard");
            }}>Profile</div>}
            {!loggedIn? <div className='Login-Btn' onClick={()=>{
              navigate("/login");
            }}>Login</div> : <div className='Nav-item' onClick={()=>{
              handleLogout();
            }}>Logout</div>}
            {/* <div className='Login-Btn' onClick={()=>{
              navigate("/login");
            }}>Login</div> */}
        </div>
        <div className='Nav-Sandwich' onClick={toggleDropDown}>
          <div className='Sandwich Layer-1'></div>
          <div className='Sandwich Layer-2'></div>
        </div>
        
          <div className={!openDropDown ? 'Dropdown Dropdown-opened' : 'Dropdown'}>
            <div className='Drop-close' onClick={toggleDropDown}>
              <div className='cross cross-left'></div>
              <div className='cross cross-right'></div>
            </div>
            <div className='Drop-item' onClick={()=>{
              toggleDropDown();
              navigate("/image");
            }}>Image Filter</div>
            <div className='Drop-item' onClick={()=>{
              toggleDropDown();
              navigate("/video");
            }}>Video Filter</div>
            {!loggedIn ? <div className='Drop-item' onClick={()=>{
              navigate("/signup");
            }}>Signup</div>: <div className='Drop-item' onClick={()=>{
              toggleDropDown();
              navigate("/dashboard");
            }}>Profile</div>}
            <div className='Drop-item'>

            {!loggedIn ? 
            <div className="Drop-Login" onClick={()=>{
              navigate("/login");
            }}>Login</div>
            :
            <div className="Drop-Login" onClick={()=>{
              toggleDropDown();
              handleLogout();
            }}>Logout</div>
            
            } 
            
            </div>
          </div>
    </nav>
  )
}

export default Navbar