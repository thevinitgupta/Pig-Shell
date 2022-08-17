import React, { createRef, useEffect } from 'react'
import AsciiEffect from '../Functions/AsciiEffect';

export default function VideoCanvas({ videoRef,dimensions }) {
    const canvasRef = createRef(null);
    const recorderRef = createRef(null);
    const canvasDimensions = {
        height : dimensions.height,
        width : dimensions.width
    }

    let canvas = null;
    let mediaRecorder = null;

    const startRecording = () =>{
        var videoStream = canvas.captureStream(30);
        mediaRecorder = new MediaRecorder(videoStream);

        var chunks = [];
        mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
        };
        const video = recorderRef.current;
        mediaRecorder.onstop = function(e) {
        var blob = new Blob(chunks, { 'type' : 'video/mp4' });
        chunks = [];
        var videoURL = URL.createObjectURL(blob);
        video.src = videoURL;
        const a = document.createElement("a");

        a.href = recorderRef.current.src;
        a.target = "blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        };
        mediaRecorder.ondataavailable = function(e) {
            chunks.push(e.data);
          };
          
          mediaRecorder.start();

    }

    const stopRecording = () =>{
        mediaRecorder.stop();
    }

    useEffect(() => {
        if (canvasRef.current && videoRef.current) {
        const interval = setInterval(() => {
            canvas = canvasRef.current;
            const ctx = canvasRef.current.getContext('2d')
            let effect = new AsciiEffect(ctx,canvas.width, canvas.height, videoRef.current);
            ctx.font = '6px Fira Code'
            effect.draw(3,"#ffffff");
            
        }, 100)
        return () => clearInterval(interval)
        }
    })

    return (
        <div className='VideoCanvas'>
            <canvas ref={canvasRef} width={canvasDimensions.width} height={canvasDimensions.height} />
            <video ref={recorderRef}></video>
            <div className='CanvasBtns'>
                <div className='CanvasStart' onClick={startRecording}>Start</div>
                <div className='CanvasStop' onClick={stopRecording}>Stop</div>
            </div>
        </div>
    )
}