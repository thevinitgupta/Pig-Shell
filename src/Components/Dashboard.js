import React, { useState, useEffect} from 'react'
import "../Css/Dashboard.css"
import { useNavigate } from 'react-router-dom';
import Loader from "../Assets/Loader.svg"
import Download from "../Assets/Icons/download.svg"
import Delete from "../Assets/Icons/trash.svg"
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import {default as firebase} from '../services/firebase';

function Dashboard() {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userImages, setUserImages] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const authUser = useSelector(selectUser);

    const navigate = useNavigate();

    let images = [];

    

    // const getImageToDisplay =  (currImages) =>{
    //     return new Promise((resolve,rejet)=>{
    //         if(currImages.length>=1){
    //             // currImages.forEach((imageData, index) => {
    //             //     images.push(appwrite.loadImage(imageData.$id));
    //             // })
    //             setUserImages(images);
    //             resolve();
    //         }
    //         else rejet();
    //     })
    // }

    const deleteImage = (index) =>{
        const imageId = userImages[index].pathname.split("/")[6];

    }

    const downloadImage =  (index) =>{
        // const imageId = userImages[index].pathname.split("/")[6];
        // const downloadLink = appwrite.downloadImage(imageId);
        // window.open(downloadLink.href)
    }

    // useEffect(() => {   
    //   appwrite.getImages().then((data)=>{
    //     setLoading(true);
    //     setTimeout( ()=>{
    //         setLoading(false);
    //         setUserImages(data.files);
    //         getImageToDisplay(data.files).then(()=>{
    //             setLoaded(true);
    //         }).catch(()=>{
    //             console.log("Images Not loaded")
    //         });
    //       },4000)
    //   }).catch((error) =>{
    //       console.log(error);
    //   })
    // }, [])

    useEffect(()=>{
        if(authUser!=null){
          setLoggedIn(true);
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
                    {userImages.length>0 && userImages.map((image,index)=>{
                        return <div key={index+Math.random()*10} className='UserImage'>
                            <img src={image.href} alt="Gallery"/>
                            <div className='Image-btns'>
                                <div className='Image-btn download' onClick={()=>{
                                    downloadImage(index)
                                }}><img src={Download} alt="download"/></div>
                                <div className='Image-btn delete' onClick={()=>{
                                    deleteImage(index)
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