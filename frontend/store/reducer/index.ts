import {combineReducers} from 'redux';
import reducerPlayer from "./playerReducer";
import reducerTracks from "./trackReducer";
import {IInitialStatePlayer} from "../../types/player";
import {HYDRATE} from 'next-redux-wrapper';
import {IInitialTrackState} from "../../types/track";


export interface IRoot {
    player: IInitialStatePlayer,
    tracks: IInitialTrackState
}


const reducer = combineReducers<IRoot>({
    player: reducerPlayer,
    tracks: reducerTracks
})

export default (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }
        if (state.count) nextState.count = state.count // preserve count value on client side navigation
        return nextState
    } else {
        return reducer(state, action)
    }
}