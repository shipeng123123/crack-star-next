'use client'
import React, { useEffect, useRef } from 'react';
import './StarrySky.scss'
function StarrySky() {
    const canvasRef = useRef(null);
    const starsCount = 800;
    useEffect(() => {
        const canvas = canvasRef.current;
        const width = window.innerWidth;
        const height = '300';
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        const starField = [];
        for (let i = 0; i < starsCount; i++) {
            starField.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2,
                speed: Math.random() * 0.5
            });
        }
        function draw() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < starField.length; i++) {
                const star = starField[i];
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = '#F7F7B6';
                ctx.fill();
                star.y += star.speed;
                if (star.y > height) {
                    star.y = 0;
                    star.x = Math.random() * width;
                }
            }
            requestAnimationFrame(draw);
        }
        draw();
        return () => cancelAnimationFrame(draw);
    }, []);

    return <div className='StarrySky'>
        <canvas ref={canvasRef}></canvas>
    </div>
}

export default StarrySky;
