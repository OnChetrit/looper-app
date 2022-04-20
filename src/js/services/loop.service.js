
const toggleActive = (tracks, track) => {
  track.isActive = !track.isActive;
  return [...tracks]
}

const switchTrack = (track) => {
  let currPlay = 0;
  if (track.currPlay + 1 !== track.path.length) {
    currPlay = track.currPlay + 1;
  }
  return { ...track, currPlay }
}

export const loopService = { toggleActive, switchTrack }
