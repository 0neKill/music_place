import {TrackActionTypes, TrackState, TTrackAction} from "../../types/track";

const initialState: TrackState = {
    tracks: [],
    error: ''
}

export default function trackReducer(state = initialState, action: TTrackAction): TrackState {
    switch (action.type) {
        case TrackActionTypes.FETCH_TRACKS:
            return {...state, tracks: action.payload}
        case TrackActionTypes.FETCH_TRACKS_ERROR:
            return {...state, error: action.payload}
        default:
            return state;
    }
}