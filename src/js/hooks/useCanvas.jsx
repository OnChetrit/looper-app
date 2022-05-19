import { useRef, useEffect } from 'react';

const useCanvas = (onDraw, options = {}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 268;
    canvas.heigth = 100;
    console.log('canvas', canvas);
    const context = canvas.getContext('2d');
    // let animationFrameId;

    const render = () => {
      onDraw(canvas, context);
      // animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      // window.cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return canvasRef;
};
export default useCanvas;
