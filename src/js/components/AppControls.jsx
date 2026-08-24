import { useEffect, useState } from 'react';
import { Pause, Play, Repeat2, Square } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoop, togglePlay } from '../store/actions/loop.actions';

export const AppControls = () => {
  const [position, setPosition] = useState('0');
  const dispatch = useDispatch();
  const { isPlay, isLoop, tracks } = useSelector((state) => state.loopModule);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(tracks[0].audio?.currentPosition().toString() ?? '0');
    }, 50);
    return () => clearInterval(interval);
  }, [tracks]);

  const play = () => {
    tracks.forEach((track) => {
      if (!isPlay) track.audio.play();
      else track.audio.pause();
    });

    dispatch(togglePlay());
  };

  const stop = () => {
    if (isPlay) {
      dispatch(togglePlay());
    }
    tracks.forEach((track) => {
      track.audio.stop();
      track.audio.playlist.sources[track.currPlay].setPosition(0);
    });
  };

  const loop = () => {
    tracks.forEach((track) => {
      track.audio.loop = !isLoop;
    });
    dispatch(toggleLoop());
  };

  const changePos = (val) => {
    setPosition(val);
    tracks.forEach((track) => {
      track.audio.pause();
      track.audio.playlist.sources[track.currPlay].setPosition(+val);
      if (isPlay) track.audio.play();
    });
  };

  return (
    <div className="controls flex column align-center">
      <div className="top flex">
        <button
          type="button"
          className="icon-button"
          onClick={loop}
          aria-label={isLoop ? 'Disable looping' : 'Enable looping'}
          aria-pressed={isLoop}
          title={isLoop ? 'Disable looping' : 'Enable looping'}
        >
          <Repeat2 className="control-icon" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="icon-button"
          onClick={play}
          aria-label={isPlay ? 'Pause all loops' : 'Play all loops'}
          title={isPlay ? 'Pause all loops' : 'Play all loops'}
        >
          {isPlay ? (
            <Pause className="control-icon" aria-hidden="true" />
          ) : (
            <Play className="control-icon" aria-hidden="true" />
          )}
        </button>
        <button
          type="button"
          className="icon-button"
          onClick={stop}
          aria-label="Stop all loops"
          title="Stop all loops"
        >
          <Square className="control-icon" aria-hidden="true" />
        </button>
      </div>
      <div className="slider">
        <input
          type="range"
          min="0"
          max="8000"
          value={position}
          onChange={(e) => {
            changePos(e.target.value);
          }}
        />
        <progress min="0" max="8000" value={position} />
      </div>
    </div>
  );
};
