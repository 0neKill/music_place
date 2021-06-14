import {ITrack, TrackActionTypes, TTrackAction} from "../../types/track";
import axios from 'axios';
import {Dispatch} from "react";


export const fetchTracks = () => async (dispatch: Dispatch<TTrackAction>) => {
    try {
        const {data} = await axios.get<Array<ITrack>>('http://localhost:7000/tracks');
        dispatch({
            type:TrackActionTypes.FETCH_TRACKS,
            payload:data
        })
    } catch (e) {
        dispatch({
            type: TrackActionTypes.FETCH_TRACKS_ERROR,
            payload: 'Произошла ошибка'
        })
    }
}