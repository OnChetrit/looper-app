
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

const normalizeData = (filteredData) => {
  // const multiplier = Math.pow(Math.max(...filteredData), -1);
  // return filteredData.map(n => n * multiplier);
  const peaks = filteredData.filter(point => point >= 0)
  const ratio = Math.max(...peaks) / 100
  return peaks.map(point => Math.round(point / ratio))
}

const filterData = audioBuffer => {
  const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
  const samples = 70; // Number of samples we want to have in our final data set
  const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
  const filteredData = [];
  for (let i = 0; i < samples; i++) {
    let blockStart = blockSize * i; // the location of the first sample in the block
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum = sum + Math.abs(rawData[blockStart + j]) // find the sum of all the samples in the block
    }
    filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
  }
  return filteredData;
}

export const loopService = { toggleActive, switchTrack, normalizeData, filterData }
