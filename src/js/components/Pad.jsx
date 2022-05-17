import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setTrackVolume,
  toggleTrackActive,
  switchTrack,
} from '../store/actions/loop.actions';
import { Toggle } from './Toggle';
import { useSelector } from 'react-redux';
import { Slider } from './Slider';
import { ReactComponent as Replace } from '../../assets/img/replace.svg';
import Canvas from './Canvas';
import { loopService } from '../services/loop.service';

export const Pad = ({ track }) => {
  const { tracks } = useSelector((state) => state.loopModule);
  const [normalizeData, setNormalizeData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(track.path[track.currPlay]);
      const arrayBuffer = await res.arrayBuffer();
      const audioBuffer = await track.audio.context.decodeAudioData(
        arrayBuffer
      );

      const filterData = loopService.filterData(audioBuffer);
      const nd = loopService.normalizeData(filterData);
      setNormalizeData(nd);
      console.log('normalizeData', normalizeData);
    };

    fetchData();
  }, []);

  const toggleActive = () => {
    if (track.isActive) {
      track.audio.setVolume(0);
    } else {
      track.audio.setVolume(track.volume);
    }
    dispatch(toggleTrackActive(tracks, track));
  };

  const switchNextTrack = () => {
    if (track.currPlay + 1 === track.path.length) {
      track.audio.queueTrack(0);
    } else {
      track.audio.queueTrack(track.currPlay + 1);
    }
    dispatch(switchTrack(track));
  };

  const setVolume = (value) => {
    track.audio.setVolume(value / 100);
    dispatch(setTrackVolume(track.id, value));
  };

  const onDraw = (canvas, context) => {
    loopService.draw(canvas, context, normalizeData);
  };

  return (
    <div
      className="pad flex column br8"
      data-active={track.isActive}
      style={{ backgroundColor: track.isActive ? `${track.color}` : '#444444' }}
    >
      <div className="top flex">
        <div className="icon flex align-center">
          {track.currPlay + 1} / {track.path.length}
        </div>
        <div className="title flex align-center">{track.title}</div>
        <div className="pad-controls flex align-center">
          <button onClick={switchNextTrack}>
            <Replace />
          </button>
          <Toggle isActive={track.isActive} toggleActive={toggleActive} />
        </div>
      </div>
      <Canvas onDraw={onDraw} width="100px" height="20px" />
      <Slider track={track} setVolume={setVolume} />
    </div>
  );
};
