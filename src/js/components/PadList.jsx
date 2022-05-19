import { useSelector } from 'react-redux';
import { Pad } from './Pad';

export const PadList = () => {
  const { tracks } = useSelector((state) => state.loopModule);

  return (
    <div className="pad-list main-container">
      {tracks.map((track) => {
        return <Pad track={track} key={track.id} />;
      })}
    </div>
  );
};
