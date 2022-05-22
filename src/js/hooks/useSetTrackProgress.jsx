import { useEffect } from "react";

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

export default ({
  trackProgress,
  setTrackProgress,
  trackDuration,
  startTime,
  trackPlaying,
}) => {
  useEffect(() => {
    let animation;
    if (trackPlaying) {
      console.log("startTime", startTime);
      console.log("trackDuration", trackDuration);
      animation = window.requestAnimationFrame(() => {
        const trackProgressPerc =
          ((Date.now() - startTime) / (trackDuration || 1)) % 8000;
        console.log("trackProgressPerc", trackProgressPerc);

        setTrackProgress(clamp(trackProgressPerc, 0, 100));
      });
    }
    return () => {
      window.cancelAnimationFrame(animation);
    };
  }, [trackPlaying, trackDuration, startTime, trackProgress]);
};
