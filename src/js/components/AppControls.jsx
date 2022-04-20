import { useDispatch, useSelector } from 'react-redux';
import { togglePlay, toggleLoop } from '../store/actions/loop.actions';
import { ReactComponent as Loop } from '../../assets/img/loop.svg';
import { ReactComponent as Play } from '../../assets/img/play.svg';
import { ReactComponent as Stop } from '../../assets/img/stop.svg';
import { ReactComponent as Pause } from '../../assets/img/pause.svg';
import { useEffect, useState } from 'react';

export const AppControls = () => {
  const dispatch = useDispatch();
  const { isPlay, isLoop, tracks } = useSelector((state) => state.loopModule);

  useEffect(() => {
    console.log(
      'tracks[0].audio?.context.currentTime',
      tracks[0].audio?.context?.currentTime
    );
  }, []);

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
      track.audio.context.currentTime = 0;
    });
  };

  const loop = () => {
    tracks.forEach((track) => {
      track.audio.loop = !isLoop;
    });
    dispatch(toggleLoop());
  };

  return (
    <div className="controls flex column auto-center">
      <div className="top">
        <button onClick={loop}>
          <Loop data-loop={isLoop} />
        </button>
        <button onClick={play}>{isPlay ? <Pause /> : <Play />}</button>
        <button onClick={stop}>
          <Stop />
        </button>
      </div>
      <div className="slider">
        <input
          type="range"
          min="0"
          max="100"
          value={((tracks[0].audio?.currentPosition() / 100) * 1.25).toString()}
          onChange={(e) => {}}
        />
        <progress
          min="0"
          max="100"
          value={((tracks[0].audio?.currentPosition() / 100) * 1.25).toString()}
        />
      </div>
    </div>
  );
};
