import {Routes , Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ImageFilter from './Components/ImageFilter';
import Navbar from './Components/Navbar';
// import Authentication from "./Components/Session/index.js"
import Dashboard from './Components/Dashboard';
import VideoFilter from './Components/VideoFilter';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(()=>{
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        if(userAuth) {
          dispatch(login({
            uid : userAuth.uid,
            email : userAuth.email,
          }));
        }
      } else {
        dispatch(logout);
      }
    });
    return unsubscribe;
  },[])
  return (
      <div className="App">
    <Routes>
      <Route exact path={'/'} element={<><Navbar/>
        <Home/></>} />
      <Route exact path={'/image'} element={<><Navbar/>
        <ImageFilter/></>}/>
      <Route exact path={'/video'} element={<><Navbar/>
        <VideoFilter/></>} />
      <Route exact path={'/signup'} element={<Signup/>}/>
      <Route exact path={'/login'} element={<Login/>}/>
      <Route exact path={'/dashboard'} element={<><Navbar/>
        <Dashboard/></>} />
    </Routes>
    {/* <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup" element={ <Signup/> } />
      </Routes> */}
    </div>
  );
}

export default App;
