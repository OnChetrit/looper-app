export const Solo = ({ isSolo, toggleSolo }) => {
  return (
    <div className="solo btn" data-solo={isSolo} onClick={toggleSolo}>
      S
    </div>
  );
};
