import React, { useRef, useEffect, useState, useCallback } from "react";
import classes from "./Waveform.module.css";

import waveformAvgChunker from "./waveformAvgChunker";
import useSetTrackProgress from "./useSetTrackProgress";

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
  const ctx = ref.getContext("2d");
  // On every canvas update, erase the canvas before painting
  // If you don't do this, you'll end up stacking waveforms and waveform
  // colors on top of each other
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
      ctx.fillStyle = "#228741";
    } else {
      ctx.fillStyle = "#88bf99";
    }
    ctx.fill();
  });
};

const Waveform = ({ waveformData, waveformMeta }) => {
  const canvasRef = useRef();
  const chunkedData = waveformAvgChunker(waveformData);
  const waveformWidth = 500;
  const canvasHeight = 56;
  const pointWidth = 4;
  const pointMargin = 1;
  const { trackDuration } = waveformMeta;
  const [trackProgress, setTrackProgress] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [trackPlaying, setTrackPlaying] = useState(true);
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
  }, [playingPoint]);

  useSetTrackProgress({
    trackProgress,
    trackDuration,
    startTime,
    setTrackProgress,
    trackPlaying,
  });

  useEffect(() => {
    if (canvasRef.current) {
      paintWaveform();
    }
  }, [canvasRef]);

  useEffect(() => {
    paintWaveform();
  }, [playingPoint]);

  return (
    <div style={{ padding: 16 }}>
      <canvas
        className={classes.canvas}
        style={{ height: canvasHeight }}
        ref={canvasRef}
        height={canvasHeight}
        width={waveformWidth}
      />
    </div>
  );
};

export default Waveform;
