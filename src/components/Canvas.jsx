import { useEffect, useState } from "react";
import { useRef } from "react";
import canvasimages from '../data/canvasimages.js'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Canvas({canvasDets}) {
    const {startIndex, numImages, duration, size, top, left, zIndex} = canvasDets;

    const canvasRef = useRef(null);
    const [index, setIndex] = useState({value: startIndex});

    useEffect(()=>{
        const dpr = window.devicePixelRatio;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.scale(dpr, dpr);
        
        const image = new Image();
        image.src = canvasimages[index.value];
        image.onload = (e) => {
            canvas.width = image.width
            canvas.height = image.height
            
            ctx.drawImage(image, 0, 0, image.width, image.height);
        }
    }, [index]);

    useGSAP(()=>{
        gsap.to(index, {
            value: startIndex + (numImages - 1),
            duration: duration,
            repeat: -1,
            ease: 'linear',
            onUpdate: ()=>{
                setIndex({value: Math.round(index.value)})
            }
        });

        gsap.from(canvasRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut'
        })
    }); // you can use dependency array just like in useEffect


    return (
        <canvas
            ref={canvasRef}
            data-scroll
            data-scroll-speed={Math.random().toFixed(1)}
            className="absolute"
            style={{width: size, height: size, zIndex: zIndex, top: `${top}%`, left: `${left}%`}}
        >

        </canvas>
    )
}

export default Canvas;