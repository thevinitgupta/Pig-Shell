import React, { useRef,useState } from "react";
import "../Css/VideoFilter.css"
import Obj1 from "../Assets/FilterPage/1.png"
import Obj2 from "../Assets/FilterPage/2.png"
import Obj3 from "../Assets/FilterPage/3.png"
import Obj4 from "../Assets/FilterPage/4.png"
import Convert from "../Assets/FilterPage/Convert.png"
import VideoCanvas from "./VideoCanvas";


function VideoFilter(){
    const [streaming,setStreaming] = useState(false);
    const [localStream,setLocalStream] = useState({});
    const videoRef = useRef(null);

    const getVideo = () =>{
        setStreaming(true);
        window.navigator.mediaDevices.getUserMedia({
            video : {width : 1920, height : 1080}
        }).then(stream =>{
            const video = videoRef.current;
            video.srcObject = stream;
            setLocalStream(stream);
            video.play();
        }).catch(e =>{
            console.error(e);
        })
    }

    const stopStreaming = () =>{
        localStream.getTracks().forEach(function (track) {
            track.stop();
         });
    }

    const startLive = () =>{
        getVideo();
    }

    const stopLive = () =>{
        stopStreaming();
        setStreaming(false);
    }

    return (
        <div className="VideoFilter">
            <div className="VideoHead">
                {!streaming &&<div className='ImageUploader-head'>
                    Ready to see the <span className="highlight-text">{`<magic?/>`}</span>
                </div>}
                <div className="VideoBtns">

                <div className='VideoUpload-btn' onClick={()=>{
                    streaming===false ? startLive() : stopLive();
                }}>
                    {streaming ? "Stop Capture" : "Start Capture"}
                </div>
                </div>
            </div>
            {streaming ? <div className="VideoCamera">
                <video  ref={videoRef}  />
                <VideoCanvas videoRef={videoRef}/>
            </div> 
            : 
            <div className='PreviewImage'>
            <div className='PreviewBackground'>
                <img className='Preview-BgImg Bg-Img-1' src={Obj1} alt="object"/>
                <img className='Preview-BgImg Bg-Img-2' src={Obj2} alt="object"/>
                <img className='Preview-BgImg Bg-Img-3' src={Obj3} alt="object"/>
                <img className='Preview-BgImg Bg-Img-4' src={Obj4} alt="object"/>
            </div>
            <div className='PreviewGlass'>
                {/* <img src={previewImage} className="ConvertPreview FilteredPreview" alt="conversion example"/> */}
                <img src={Convert} className="ConvertPreview" alt="conversion example"/>
            </div>
        </div> }
        </div>
    );
}

export default VideoFilter;