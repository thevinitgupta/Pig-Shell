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
    const [videoName,setVideoName] = useState(false);
    const [videoUrl,setVideoUrl] = useState("");
    const [localStream,setLocalStream] = useState({});
    const [previewVideo,setPreviewVideo] = useState(null);
    const videoRef = useRef(null);
    const uploaderRef = useRef(null);

    const getVideo = () =>{
        console.log("getVideo called")
        window.navigator.mediaDevices.getUserMedia({
            video : {width : 1920, height : 1080}
        }).then(stream =>{
            const video = videoRef.current;
            video.srcObject = stream;
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
        uploaderRef.current.click();
    }

    const fileChangedHandler = (event) => {
        const currVideo = event.target.files[0];
        console.log(currVideo);
        const currName = event.target.files[0].name;
        const lastDot = currName.lastIndexOf(".");
        setVideoName(currName.substring(0,lastDot)+"-pigshell"+currName.substring(lastDot))
        setVideoUrl(URL.createObjectURL(event.target.files[0]));
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
                <input type="file" ref={uploaderRef} accept="video/*" name="uploadImage" id="uploadImage" onChange={fileChangedHandler} style={{display : "none"}}/>

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

            {streaming ? <div className="VideoCamera">
                <video autoPlay={true} ref={videoRef} />
                <VideoCanvas videoRef={videoRef}/>
            </div> : 
            <div className='PreviewImage'>
            <div className='PreviewBackground'>
                <img className='Preview-BgImg Bg-Img-1' src={Obj1} alt="object"/>
                <img className='Preview-BgImg Bg-Img-2' src={Obj2} alt="object"/>
                <img className='Preview-BgImg Bg-Img-3' src={Obj3} alt="object"/>
                <img className='Preview-BgImg Bg-Img-4' src={Obj4} alt="object"/>
            </div>
            <div className='PreviewGlass'>
                {previewVideo==null && <img src={Convert} className="ConvertPreview" alt="conversion example"/>}
                {/* <img src={previewImage} className="ConvertPreview FilteredPreview" alt="conversion example"/> */}
                {previewVideo && 
                <div className='PreviewBtns'>
                    <div className='downloadImg-btn' >
                        Download
                    </div>
                    <div className='uploadImg-btn'>
                        Upload
                    </div>
                </div>}
            </div>
        </div> }
        </div>
    );
}

export default VideoFilter;