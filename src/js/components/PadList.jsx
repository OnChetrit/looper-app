import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Gapless5 } from '@regosen/gapless-5';
import { Pad } from './Pad';

export const PadList = () => {
  const { tracks } = useSelector((state) => state.loopModule);

  useEffect(() => {
    //load all tracks into 'audio' key into tracks
    // tracks.forEach((track) => {
    //   track.audio = new Gapless5({
    //     tracks: track.path,
    //     singleMode: true,
    //     loop: true,
    //     volume: track.volume,
    //   });
    // });
  }, []);

  return (
    <div className="pad-list main-container">
      {tracks.map((track) => {
        return <Pad track={track} key={track.id} />;
      })}
    </div>
  );
};
