import { useRef, useEffect } from 'react';

const useCanvas = (onDraw, options = {}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext(options.context || '2d');
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
