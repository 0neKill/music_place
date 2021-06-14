import React from 'react';
import {Grid, IconButton} from "@material-ui/core";
import {Pause, PlayArrow, VolumeUp} from "@material-ui/icons";
import styles from '../styles/Player.module.scss';
import TrackProgress from "./TrackProgress";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useAction} from "../hooks/useAction";

let audio;
const Player = () => {
    const {pause, volume, active, duration, currentTime} = useTypedSelector(state => state.player);

    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration} = useAction();

    React.useEffect(() => {
        if (!audio) {
            audio = new Audio();
        } else {
            ActiveTrack();
            play();
        }
    }, [active])

    const ActiveTrack = () => {
        if (active) {
            audio.src = `http://localhost:7000/${active.audio}`;
            audio.volume = volume / 100;
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.onended = () => {
                pauseTrack();
                setCurrentTime(0)
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }

    const play = () => {
        if (pause) {
            playTrack();
            audio.play()
        } else {
            pauseTrack();
            audio.pause()
        }
    }

    const handlerVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100;
        setVolume(Number(e.target.value))
    }
    const handlerCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value);
        setCurrentTime(Number(e.target.value))
    }
    if (!active) {
        return null;
    }
    return (
        <div className={styles.player}>
            <IconButton onClick={play}>
                {!pause ? <Pause/> : <PlayArrow/>}
            </IconButton>
            <Grid container direction='column' style={{width: 200, margin: '0 20px'}}>
                <div>{active?.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{active?.artist}</div>
            </Grid>
            <TrackProgress left={currentTime} right={duration} onChange={handlerCurrentTime}/>
            <VolumeUp style={{marginLeft: 'auto'}}/>
            <TrackProgress left={volume} right={100} onChange={handlerVolume}/>
        </div>
    );
};

export default Player;