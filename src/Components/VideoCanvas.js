import React, { createRef, useEffect } from 'react'
import AsciiEffect from '../Functions/AsciiEffect';

export default function VideoCanvas({ videoRef }) {
    const canvasRef = createRef(null)
    const canvasDimensions = {
        height : 510,
        width : 640
    }
    useEffect(() => {
        if (canvasRef.current && videoRef.current) {
        const interval = setInterval(() => {
            const canvas = canvasRef.current;
            const ctx = canvasRef.current.getContext('2d')
            let effect = new AsciiEffect(ctx,canvas.width, canvas.height, videoRef.current);
            ctx.font = '6px Fira Code'
            effect.draw(4,"#ffffff");
        }, 100)
        return () => clearInterval(interval)
        }
    })

    return (
        <canvas ref={canvasRef} width={canvasDimensions.width} height={canvasDimensions.height} />
    )
}