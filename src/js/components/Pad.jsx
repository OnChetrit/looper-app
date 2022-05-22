import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Gapless5 } from '@regosen/gapless-5';
import {
  setTrackVolume,
  toggleTrackActive,
  switchTrack,
} from '../store/actions/loop.actions';
import { Toggle } from './Toggle';
import { useSelector } from 'react-redux';
import { Slider } from './Slider';
import { ReactComponent as Replace } from '../../assets/img/replace.svg';
import { ReactComponent as Arrow } from '../../assets/img/arrow-down.svg';
import { loopService } from '../services/loop.service';
import Waveform from './Waveform';

export const Pad = ({ track }) => {
  const { tracks, isPlay } = useSelector((state) => state.loopModule);
  const [normalizeData, setNormalizeData] = useState([]);
  const [canvasOpen, setCanvasOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    loadAudio();
    const fetchData = async () => {
      const res = await fetch(track.path[track.currPlay]);
      const arrayBuffer = await res.arrayBuffer();
      const audioBuffer = await track.audio.context.decodeAudioData(
        arrayBuffer
      );
      const filterData = loopService.filterData(audioBuffer);
      const nd = loopService.normalizeData(filterData);
      setNormalizeData(nd);
    };

    fetchData();
  }, [track.currPlay]);

  const loadAudio = () => {
    track.audio = new Gapless5({
      tracks: track.path,
      singleMode: true,
      loop: true,
      volume: track.volume,
    });
  };

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
          <button
            onClick={() => setCanvasOpen(!canvasOpen)}
            style={{ transform: canvasOpen ? 'rotate(180deg)' : '' }}
          >
            <Arrow />
          </button>
          <button className="flex align-center" onClick={switchNextTrack}>
            <Replace />
          </button>
          <Toggle isActive={track.isActive} toggleActive={toggleActive} />
        </div>
      </div>
      {canvasOpen && (
        <Waveform
          waveformData={normalizeData}
          track={track}
          waveformMeta={{ trackDuration: track.audio?.currentPosition() }}
          isPlay={isPlay}
        />
      )}
      <Slider track={track} setVolume={setVolume} />
    </div>
  );
};
