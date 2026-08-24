import { useEffect, useRef, useState } from 'react';
import { Gapless5 } from '@regosen/gapless-5';
import { ChevronDown, RefreshCw } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTrackVolume,
  toggleTrackActive,
  switchTrack,
} from '../store/actions/loop.actions';
import { Slider } from './Slider';
import { loopService } from '../services/loop.service';
import { Toggle } from './Toggle';
import Waveform from './Waveform';

export const Pad = ({ track }) => {
  const { tracks, isPlay } = useSelector((state) => state.loopModule);
  const [normalizeData, setNormalizeData] = useState([]);
  const [canvasOpen, setCanvasOpen] = useState(false);
  const audioRef = useRef(null);
  const initialTrackRef = useRef(track);
  const dispatch = useDispatch();

  useEffect(() => {
    const initialTrack = initialTrackRef.current;
    const audio = new Gapless5({
      tracks: initialTrack.path,
      singleMode: true,
      loop: true,
      volume: initialTrack.volume,
    });
    audioRef.current = audio;
    // App controls share this player through the existing track model.
    initialTrack.audio = audio;

    return () => {
      audio.stop();
    };
  }, []);

  const { currPlay, path } = track;

  useEffect(() => {
    const controller = new AbortController();

    const loadWaveform = async () => {
      try {
        const response = await fetch(path[currPlay], {
          signal: controller.signal,
        });
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioRef.current.context.decodeAudioData(
          arrayBuffer
        );
        const filterData = loopService.filterData(audioBuffer);
        setNormalizeData(loopService.normalizeData(filterData));
      } catch (error) {
        if (error.name !== 'AbortError') {
          setNormalizeData([]);
        }
      }
    };

    loadWaveform();

    return () => controller.abort();
  }, [currPlay, path]);

  const toggleActive = () => {
    if (track.isActive) {
      track.audio.setVolume(0);
    } else {
      track.audio.setVolume(track.volume);
    }
    dispatch(toggleTrackActive(tracks, track));
  };

  const switchNextTrack = () => {
    const nextTrackIndex = (track.currPlay + 1) % track.path.length;
    track.audio?.queueTrack(nextTrackIndex);
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
            type="button"
            className={`icon-button expand-button${canvasOpen ? ' is-open' : ''}`}
            onClick={() => setCanvasOpen((isOpen) => !isOpen)}
            aria-label={`${canvasOpen ? 'Hide' : 'Show'} ${track.title} waveform`}
            aria-expanded={canvasOpen}
            title={`${canvasOpen ? 'Hide' : 'Show'} waveform`}
          >
            <ChevronDown aria-hidden="true" />
          </button>
          <button
            type="button"
            className="icon-button flex align-center"
            onClick={switchNextTrack}
            aria-label={`Replace ${track.title} loop`}
            title="Replace loop"
          >
            <RefreshCw aria-hidden="true" />
          </button>
          <Toggle isActive={track.isActive} toggleActive={toggleActive} />
        </div>
      </div>
      {canvasOpen && (
        <Waveform
          waveformData={normalizeData}
          track={track}
          isPlay={isPlay}
        />
      )}
      <Slider track={track} setVolume={setVolume} />
    </div>
  );
};
