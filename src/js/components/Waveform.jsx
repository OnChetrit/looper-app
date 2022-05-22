import React, { useRef, useEffect, useState, useCallback } from 'react';

import useSetTrackProgress from '../hooks/useSetTrackProgress';
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

const paintCanvas = ({
  canvasRef,
  waveformData,
  canvasHeight,
  pointWidth,
  pointMargin,
  playingPoint,
}) => {
  const ref = canvasRef.current;
  const ctx = ref.getContext('2d');
  ctx.clearRect(0, 0, ref.width, ref.height);
  waveformData.forEach((p, i) => {
    ctx.beginPath();
    const coordinates = pointCoordinates({
      index: i,
      pointWidth,
      pointMargin,
      canvasHeight,
      amplitude: p,
    });
    ctx.rect(...coordinates);
    if (i < playingPoint) {
      ctx.fillStyle = '#7c7c7c';
    } else {
      ctx.fillStyle = 'white';
    }
    ctx.fill();
  });
};

const Waveform = ({ waveformData, waveformMeta, isPlay, track }) => {
  const canvasRef = useRef();
  const chunkedData = waveformAvgChunker(waveformData);
  const [waveformWidth, setWaveformWidth] = useState(
    canvasRef.current?.clientWidth
  );
  const canvasHeight = 56;
  const pointWidth = 3.2;
  const pointMargin = 1;
  const [trackProgress, setTrackProgress] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const playingPoint =
    (trackProgress * waveformWidth) / 100 / (pointWidth + pointMargin);

  const paintWaveform = useCallback(() => {
    paintCanvas({
      canvasRef,
      waveformData: chunkedData,
      canvasHeight,
      pointWidth,
      pointMargin,
      playingPoint,
    });
  }, [playingPoint, waveformWidth, track.currPlay]);

  useSetTrackProgress({
    trackProgress,
    setTrackProgress,
    trackDuration: track.audio?.currentPosition(),
    startTime,
    trackPlaying: isPlay,
  });

  useEffect(() => {
    if (canvasRef.current) {
      setWaveformWidth(canvasRef.current?.clientWidth);
      paintWaveform();
    }
  }, [canvasRef, canvasRef.current?.clientWidth]);

  useEffect(() => {
    paintWaveform();
  }, [playingPoint]);

  return (
    <div style={{ padding: 8, width: '100%' }} className="canvas-container">
      <canvas
        style={{ height: canvasHeight, display: 'block', width: '100%' }}
        ref={canvasRef}
        height={canvasHeight}
      />
    </div>
  );
};

export default Waveform;
