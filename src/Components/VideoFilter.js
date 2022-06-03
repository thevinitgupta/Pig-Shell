import React, { useRef,useState } from "react";
import "../Css/VideoFilter.css"
import VideoCanvas from "./VideoCanvas";


function VideoFilter(){
    const [streaming,setStreaming] = useState(false);
    const [localStream,setLocalStream] = useState({});
    const videoRef = useRef(null);

    const getVideo = () =>{
        console.log("getVideo called")
        window.navigator.mediaDevices.getUserMedia({
            video : {width : 1920, height : 1080}
        }).then(stream =>{
            const video = videoRef.current;
            video.srcObject = stream;
            console.log(stream)
            setLocalStream(stream);
            video.play();
            console.log(video)
        }).catch(e =>{
            console.error(e);
        })
    }

    const stopStreaming = () =>{
        console.log(localStream)
        localStream.getTracks().forEach(function (track) {
            track.stop();
         });
        // window.navigator.mediaDevices.getUserMedia({video : {width : 0, height : 0}});
    }

    const startLive = () =>{
        getVideo();
        setStreaming(true);
    }

    const stopLive = () =>{
        stopStreaming();
        setStreaming(false);
    }

    const handleCustomUpload = () =>{

    }

    // useEffect(()=>{
    //     return stopStreaming();
    // },[])
    return (
        <div className="VideoFilter">
            <div className="VideoHead">
                <div className='ImageUploader-head'>
                    Ready to see the <span className="highlight-text">{`<magic?/>`}</span>
                </div>
                <div className="VideoBtns">
                <div className='VideoUpload-btn' onClick={()=>{
                    handleCustomUpload();
                }}>
                    Upload Video
                </div>
                <div className='VideoUpload-btn' onClick={()=>{
                    streaming===false ? startLive() : stopLive();
                }}>
                    {streaming ? "Stop Capture" : "Start Capture"}
                </div>
                </div>
            </div>
            {streaming && <div className="VideoCamera">
                <video autoPlay={true} ref={videoRef} />
                <VideoCanvas videoRef={videoRef}/>
            </div>}
        </div>
    );
}

export default VideoFilter;