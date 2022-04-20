import { loopService } from "../../services/loop.service";

export const toggleTrackActive = (tracks, track) => {
    return dispatch => {
        const returnedTracks = loopService.toggleActive(tracks, track)
        dispatch({ type: 'TOGGLE_TRACK_ACTIVE', tracks: returnedTracks });
    }
}

export const switchTrack = (track) => {
    return dispatch => {
        const returnedTrack = loopService.switchTrack(track)
        dispatch({ type: 'SWITCH_TRACK', track: returnedTrack });
    }
}

export const toggleTrackMute = (id) => {
    return dispatch => {
        dispatch({ type: 'TOGGLE_TRACK_MUTE', id });
    }
}

export const toggleTrackSolo = (id) => {
    return dispatch => {
        dispatch({ type: 'TOGGLE_TRACK_SOLO', id });
    }
}

export const setTrackVolume = (id, volume) => {
    const track = { id, volume }
    return dispatch => {
        dispatch({ type: 'SET_TRACK_VOLUME', track });
    }
}

export const togglePlay = () => {
    return dispatch => {
        dispatch({ type: 'TOGGLE_PLAY' });
    }
}

export const toggleLoop = () => {
    return dispatch => {
        dispatch({ type: 'TOGGLE_LOOP' });
    }
}

