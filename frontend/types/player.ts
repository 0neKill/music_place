import {ITrack} from "./track";

export interface IInitialStatePlayer {
    active: null | ITrack,
    volume: number,
    duration: number,
    currentTime: number,
    pause: boolean,
}

export enum PlayerActionTypes {
    PLAY = 'PLAY',
    PAUSE = 'PAUSE',
    SET_ACTIVE = 'SET_ACTIVE',
    SET_DURATION = 'SET_DURATION',
    SET_CURRENT_TIME = 'SET_CURRENT_TIME',
    SET_VOLUME = 'SET_VOLUME',
}

interface PlayAction {
    type: typeof PlayerActionTypes.PLAY,
}

interface PauseAction {
    type: typeof PlayerActionTypes.PAUSE,
}

interface SetActiveAction {
    type: typeof PlayerActionTypes.SET_ACTIVE,
    payload: ITrack,
}

interface SetDurationAction {
    type: typeof PlayerActionTypes.SET_DURATION,
    payload: number,
}

interface SetVolumeAction {
    type: typeof PlayerActionTypes.SET_VOLUME,
    payload: number,
}

interface SetCurrentAction {
    type: typeof PlayerActionTypes.SET_CURRENT_TIME,
    payload: number,
}

export type TPlayer = PlayAction | PauseAction | SetActiveAction | SetDurationAction | SetVolumeAction | SetCurrentAction
