import { useDispatch, useSelector } from "react-redux";
import { togglePlay, toggleLoop } from "../store/actions/loop.actions";
import { ReactComponent as Loop } from "../../assets/img/loop.svg";
import { ReactComponent as Play } from "../../assets/img/play.svg";
import { ReactComponent as Stop } from "../../assets/img/stop.svg";
import { ReactComponent as Pause } from "../../assets/img/pause.svg";
import { useEffect, useState } from "react";

export const AppControls = () => {
  const [position, setPosition] = useState("0");
  const dispatch = useDispatch();
  const { isPlay, isLoop, tracks } = useSelector((state) => state.loopModule);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(tracks[0].audio?.currentPosition().toString());
    }, 50);
    return () => clearInterval(interval);
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
