import React, { useRef, useEffect, useLayoutEffect } from 'react';
import styles from '../style/gradAnim.module.css'

// Spring Gradient Animation Starts


export const SpringAnim = ({ m = 6, n = 6, o = 40, p = 0.5, v = 6 }) => {
 
  const canvasRef = useRef(null);
  let ctx;
  let frames = 0;
  let requestId = null;
  let rad;
  let r, x, y;

  const Draw = () => {
    frames++;
    const a = frames * rad;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 1; i < 360; i += p) {
      const t = i * rad;
      ctx.beginPath();
      x = ctx.canvas.width / 2 + r * t * Math.cos(m * t + a);
      y =
       (4* ctx.canvas.height)/5  +
        (r / 2) * Math.sin(a) * t * Math.sin(n * t + a) -
        (r + (r / 2) * Math.cos(a)) * t;

      ctx.arc(x, y, i / o, 0, 2 * Math.PI);
      ctx.fillStyle = Grd(x, y, i / 3, i * v, i / 8);
      ctx.fill();
    }

    requestId = window.requestAnimationFrame(Draw);
  };

  const Grd = (x, y, r, hue, l) => {
    const grd = ctx.createRadialGradient(x - r / 2, y - r / 2, 0, x, y, r);
    grd.addColorStop(0, `hsla(${hue}, 99%, ${l}%, 0.8)`);
    grd.addColorStop(1, `hsla(${hue}, 99%, ${l}%, 0.6)`);
    return grd;
  };

  const init = () => {
    if (requestId) {
      window.cancelAnimationFrame(requestId);
      requestId = null;
    }

  

    const canvas = canvasRef.current;
    ctx = canvas.getContext('2d');

    // Set canvas size based on parent div size
    const parentDiv = canvas.parentElement;
    ctx.canvas.width = parentDiv.clientWidth;
    ctx.canvas.height = parentDiv.clientHeight;

    frames = 0;
    rad = Math.PI / 180;
    r = 12;
    x = y = 0;
    Draw();
  };

  useLayoutEffect(() => {
    init();
    const resizeHandler = () => init();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      if (requestId) {
        window.cancelAnimationFrame(requestId);
      }
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

// Spring Gradient Animation Ends

//Circle Animation Starts
/////////////////////////////////////////////////////////

const NumberOfElements = 30;

export const CircleAnim = ({a=1}) =>{

  const renderElements = () => {
    const elements = [];

    for (let i = 1; i <= NumberOfElements; i++) {
      const width = i * 4;
      const height = i * 2;
      const marginLeft = -(width / 3);
      const marginTop = -(height / 3);
      const zIndex = -i;

      const style = {
        width: `${width}px`,
        height: `${height}px`,
        marginLeft: `${marginLeft}px`,
        marginTop: `${marginTop}px`,
        zIndex: zIndex,
        animation: `rotate 12s ease-in-out ${0.1*a * i}s infinite`,
      };

      elements.push(
        <div
          key={i}
          className="circlecontainer"
          style={style}
        ></div>
      );
    }

    return elements;
  };

  return(
    <div className= ''>
    <div className='circlecontainer'>
      {renderElements()}
  </div>
  </div>
  )
}

