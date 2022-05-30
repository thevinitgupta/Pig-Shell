import React, { useEffect, useRef } from "react";
import "../Css/VideoFilter.css"
import VideoCanvas from "./VideoCanvas";


function VideoFilter(){
    const videoRef = useRef(null);

    const getVideo = () =>{
        console.log("getVideo called")
        window.navigator.mediaDevices.getUserMedia({
            video : {width : 1920, height : 1080}
        }).then(stream =>{
            const video = videoRef.current;
            video.srcObject = stream;
            video.play();
        }).catch(e =>{
            console.error(e);
        })
    }

    const stopStreaming = () =>{
        window.navigator.mediaDevices.getUserMedia({video : {width : 0, height : 0}});
    }

    useEffect(()=>{
        getVideo();
        return stopStreaming();
    },[videoRef])
    return (
        <div className="VideoFilter">
            <div className="VideoHead">

            </div>
            <div className="VideoCamera">
                <video autoPlay={true} ref={videoRef} />
                <VideoCanvas videoRef={videoRef}/>
            </div>
        </div>
    );
}

export default VideoFilter;