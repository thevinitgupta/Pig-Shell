import React, { useState} from 'react'
import Logo from "../Assets/pig.png"
import "../Css/Navbar.css"
import { useNavigate } from 'react-router-dom';

function Navbar() {
  // const [useSandwich, setUseSandwich] = useState(true);
  const [openDropDown, setOpenDropDown] = useState(true);
  const authUser = {};
  const navigate = useNavigate();

  const handleLogout = () => {

  };


  const toggleDropDown = () =>{
    setOpenDropDown((prevValue)=>{
      return !prevValue;
    })
  }


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
            {!authUser ? <div className='Nav-item' onClick={()=>{
              navigate("/signup");
            }}>Signup</div> : <div className='Nav-item' onClick={()=>{
              navigate("/dashboard");
            }}>Profile</div>}
            {!authUser? <div className='Login-Btn' onClick={()=>{
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
            {!authUser ? <div className='Drop-item' onClick={()=>{
              navigate("/signup");
            }}>Signup</div>: <div className='Drop-item' onClick={()=>{
              toggleDropDown();
              navigate("/dashboard");
            }}>Profile</div>}
            <div className='Drop-item'>

            {!authUser ? 
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