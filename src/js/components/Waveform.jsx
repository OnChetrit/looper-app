import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

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
  canvas,
  waveformData,
  canvasHeight,
  pointWidth,
  pointMargin,
  playingPoint,
}) => {
  const context = canvas?.getContext('2d');
  if (!canvas || !context || !canvas.width) return;

  context.clearRect(0, 0, canvas.width, canvas.height);
  waveformData.forEach((p, i) => {
    context.beginPath();
    const coordinates = pointCoordinates({
      index: i,
      pointWidth,
      pointMargin,
      canvasHeight,
      amplitude: p,
    });
    context.rect(...coordinates);
    if (i < playingPoint) {
      context.fillStyle = '#7c7c7c';
    } else {
      context.fillStyle = 'white';
    }
    context.fill();
  });
};

const Waveform = ({ waveformData, isPlay, track }) => {
  const canvasRef = useRef(null);
  const chunkedData = useMemo(
    () => waveformAvgChunker(waveformData),
    [waveformData]
  );
  const [waveformWidth, setWaveformWidth] = useState(0);
  const canvasHeight = 56;
  const pointWidth = Math.max(
    1,
    waveformWidth / Math.max(chunkedData.length, 1) - 1
  );
  const pointMargin = 1;
  const [trackProgress, setTrackProgress] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const playingPoint =
    (trackProgress / 100) * chunkedData.length;

  useSetTrackProgress({
    trackProgress,
    setTrackProgress,
    trackDuration: track.audio?.currentPosition(),
    startTime,
    trackPlaying: isPlay,
  });

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const updateWidth = () => setWaveformWidth(Math.round(canvas.clientWidth));
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setTrackProgress(0);
    setStartTime(Date.now());
  }, [track.currPlay]);

  useEffect(() => {
    paintCanvas({
      canvas: canvasRef.current,
      waveformData: chunkedData,
      canvasHeight,
      pointWidth,
      pointMargin,
      playingPoint,
    });
  }, [chunkedData, canvasHeight, playingPoint, pointWidth, waveformWidth]);

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        height={canvasHeight}
        width={waveformWidth}
        role="img"
        aria-label={`${track.title} audio waveform`}
      />
    </div>
  );
};

export default Waveform;
