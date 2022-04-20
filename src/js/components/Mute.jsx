export const Mute = ({ isMute, toggleMute }) => {
  return (
    <div className="mute btn" data-mute={isMute} onClick={toggleMute}>
      M
    </div>
  );
};
