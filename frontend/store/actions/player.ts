import {PlayerActionTypes, TPlayer} from "../../types/player";
import {ITrack} from "../../types/track";

export const playTrack = (): TPlayer => ({
    type: PlayerActionTypes.PLAY
})
export const pauseTrack = (): TPlayer => ({
    type: PlayerActionTypes.PAUSE
})
export const setDuration = (payload: number): TPlayer => ({
    type: PlayerActionTypes.SET_DURATION,
    payload: payload
})
export const setVolume = (payload: number): TPlayer => ({
    type: PlayerActionTypes.SET_VOLUME,
    payload
})
export const setCurrentTime = (payload: number): TPlayer => ({
    type: PlayerActionTypes.SET_CURRENT_TIME,
    payload
})

export const setActive = (payload: ITrack): TPlayer => ({
    type: PlayerActionTypes.SET_ACTIVE,
    payload: payload
})
