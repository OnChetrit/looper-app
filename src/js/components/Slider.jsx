export const Slider = ({ track, setVolume }) => {
  const { volume, isActive } = track;
  return (
    <div className="slider">
      <input
        type="range"
        min="0"
        max="100"
        value={isActive ? (volume * 100).toString() : '0'}
        onChange={(e) => {
          if (track.isActive) {
            setVolume(+e.target.value);
          }
        }}
      />
      <progress
        min="0"
        max="100"
        value={isActive ? (volume * 100).toString() : '0'}
      />
    </div>
  );
};
