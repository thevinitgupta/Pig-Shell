import React, { useState, useEffect} from 'react'
import "../Css/Dashboard.css"
import { useNavigate } from 'react-router-dom';
import Loader from "../Assets/Loader.svg"
import Download from "../Assets/Icons/download.svg"
import Delete from "../Assets/Icons/trash.svg"
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import {default as firebase} from '../services/firebase';
import { saveAs } from "file-saver";

function Dashboard() {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userImages, setUserImages] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    // const [images,setImages] = useState([]);
    const authUser = useSelector(selectUser);

    const navigate = useNavigate();


    const deleteImage = (url) =>{
       firebase.delete(url);
    }

    const removeImage = (index)=>{
        setUserImages((prevValue)=>{
            return [...prevValue.slice(0,index),...prevValue.slice(index+1)];
        })
        firebase.update([...userImages.slice(0,index),...userImages.slice(index+1)], authUser.uid);
    }

    const downloadImage =  (url) =>{
            firebase.download(url);
    }

    

    // useEffect(() => {   
      
      //then((data)=>{
        // setLoading(true);
        // setTimeout( ()=>{
        //     setLoading(false);
        //     setUserImages(data.files);
        //     getImageToDisplay(data.files).then(()=>{
        //         
        //     }).catch(()=>{
        //         console.log("Images Not loaded")
        //     });
        //   },4000)
    //   }).catch((error) =>{
    //       console.log(error);
    //   })
    // }, [authUser])

    useEffect(()=>{
        if(authUser!=null){
          setLoggedIn(true);
         firebase.getImages(authUser.uid).then((res) =>{
            console.log(res);
            setUserImages(res);
            setTimeout(()=>{
                setLoading(false);
                setLoaded(true);
            },2500)
         });
        }
        else {
          setLoggedIn(false);
        }
      },[authUser])
    

  return (
    <div className='Dashboard'>
        {!authUser && 
            <div className='UnAuth' onClick={()=>{
                navigate("/login")
            }}>
                <p><span className='highlight-text'>Login</span> to access your photos from anywhere!</p>
            </div>
        }
        {authUser && 
            <div className='AuthUser'>
                <div className='AuthUser-head'>
                    All Uploads
                </div>
                <div className='UserImages'>
                    {<div className='loader' style={!loaded && loading ? {opacity : 1} : {opacity : 0}}>
                        <img src={Loader} alt='Loading...'/>
                    </div>}
                    {loaded && userImages.length>0 && userImages.map((image,index)=>{
                        return <div key={index+Math.random()*10} className='UserImage'>
                            <img src={image} alt="Gallery"/>
                            <div className='Image-btns'>
                                <div className='Image-btn download' onClick={()=>{
                                    downloadImage(image)
                                }}><img src={Download} alt="download"/></div>
                                <div className='Image-btn delete' onClick={()=>{
                                    deleteImage(image); removeImage(index);
                                }}><img src={Delete} alt="delete"/></div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        }
    </div>
  )
}

export default Dashboard