import { tracks } from '../../constants/tracks'
const initialState = {
    tracks: tracks,
    isPlay: false,
    isRecord: false,
    isLoop: true,
    currentTime: 0
    // volume: 1
}
export function loopReducer(state = initialState, action) {
    var newState = state;
    let tracks;
    switch (action.type) {
        case 'TOGGLE_TRACK_ACTIVE':
            return { ...state, tracks: action.tracks }
        case 'SWITCH_TRACK':
            tracks = state.tracks.map(track => (track.id === action.track.id) ? action.track : track)
            return { ...state, tracks }
            break
        case 'TOGGLE_TRACK_MUTE':
            return {
                ...state, tracks: state.tracks.map(track => {
                    if (track.id !== action.id) {
                        return track
                    }
                    return { ...track, isMute: !track.isMute }
                })
            }
        case 'TOGGLE_TRACK_SOLO':
            return {
                ...state, tracks: state.tracks.map(track => {
                    if (track.id !== action.id) {
                        return track
                    }
                    return { ...track, isSolo: !track.isSolo }
                })
            }
        case 'SET_TRACK_VOLUME':
            return {
                ...state, tracks: state.tracks.map(track => {
                    if (track.id !== action.track.id) {
                        return track
                    }
                    return { ...track, volume: action.track.volume / 100 }
                })
            }
        case 'TOGGLE_PLAY':
            return { ...state, isPlay: !state.isPlay }
        case 'TOGGLE_LOOP':
            return { ...state, isLoop: !state.isLoop }
        case 'TOGGLE_RECORD':
            return { ...state, isRecord: !state.isRecord }
        default:
            return newState
    }
}
