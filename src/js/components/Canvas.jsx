import React from 'react';
import useCanvas from '../hooks/useCanvas';

const Canvas = (props) => {
  const { onDraw, options, ...rest } = props;
  const canvasRef = useCanvas(onDraw);

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
