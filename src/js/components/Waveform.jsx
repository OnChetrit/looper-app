import React, { useRef, useEffect } from 'react';
import waveformAvgChunker from '../hooks/waveformAvgChunker';

const pointCoordinates = ({
  index,
  pointWidth,
  pointMargin,
  canvasHeight,
  amplitude,
}) => {
  const pointHeight = Math.round((amplitude / 100) * canvasHeight);
  const verticalCenter = Math.round((canvasHeight - pointHeight) / 2);
  return [
    index * (pointWidth + pointMargin), // x starting point
    canvasHeight - pointHeight - verticalCenter, // y starting point
    pointWidth, // width
    pointHeight, // height
  ];
};

const paintCanvas = ({ canvasRef, waveformData, canvasHeight }) => {
  const ref = canvasRef.current;
  const ctx = ref.getContext('2d');
  // On every canvas update, erase the canvas before painting
  // If you don't do this, you'll end up stacking waveforms and waveform
  // colors on top of each other
  ctx.clearRect(0, 0, ref.width, ref.height);
  waveformData.forEach((p, i) => {
    ctx.beginPath();
    const coordinates = pointCoordinates({
      index: i,
      pointWidth: 3.5,
      pointMargin: 1.5,
      canvasHeight,
      amplitude: p,
    });
    ctx.rect(...coordinates);
    ctx.fillStyle = 'white';
    ctx.fill();
  });
};

const Waveform = ({ waveformData }) => {
  const canvasRef = useRef();
  const chunkedData = waveformAvgChunker(waveformData);
  const canvasHeight = 60;

  useEffect(() => {
    if (canvasRef.current) {
      paintCanvas({
        canvasRef,
        waveformData: chunkedData,
        canvasHeight,
      });
    }
  }, [canvasRef, waveformData]);

  return (
    <div style={{ padding: 16, width: '100%' }}>
      <canvas
        style={{ height: canvasHeight, display: 'block', width: '100%' }}
        ref={canvasRef}
        height={canvasHeight}
      />
    </div>
  );
};

export default Waveform;
