export interface IComment {
    id: number,
    username: string,
    text: string
}

export interface ITrack {
    id: number,
    name: string,
    artist: string,
    text: string,
    listens: number,
    picture: string,
    audio: string,
    comments: Array<IComment>
}


export interface IInitialTrackState {
    tracks: Array<ITrack>,
    error: string
}

export enum TrackActionTypes {
    FETCH_TRACKS = 'FETCH_TRACKS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
}

interface FetchTracksAction {
    type: typeof TrackActionTypes.FETCH_TRACKS,
    payload: Array<ITrack>
}

interface FetchTracksErrorAction {
    type: typeof TrackActionTypes.FETCH_TRACKS_ERROR,
    payload: string
}

export type TTrackAction = FetchTracksAction | FetchTracksErrorAction