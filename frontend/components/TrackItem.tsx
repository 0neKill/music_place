import React from 'react';
import {ITrack} from "../types/track";
import {Card, Grid, IconButton} from "@material-ui/core";

import styles from '../styles/TrackItem.module.scss'
import {Delete, Pause, PlayArrow} from "@material-ui/icons";
import {useRouter} from "next/router";
import {useAction} from "../hooks/useAction";

type TrackItemProps = {
    track: ITrack,
    active?: boolean
}

const TrackItem: React.FC<TrackItemProps> = (
    {
        track,
        active = false
    }
) => {

    const router = useRouter();

    const {pauseTrack, setActive} = useAction();

    const play = (e) => {
        e.stopPropagation();
        setActive(track);
        pauseTrack();
    }
    console.log(process.env.REACT_APP_API_URL + track.picture)
    return (
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track.id)}>
            <IconButton onClick={play}>
                {active ? <Pause/> : <PlayArrow/>}
            </IconButton>
            <img width={70} height={70} src={'http://localhost:7000/' + track.picture} alt={''}/>
            <Grid container direction='column' style={{width: 200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
            </Grid>
            {active && <div>02:42 / 03:22</div>}
            <IconButton style={{marginLeft: 'auto'}} onClick={(e) => e.stopPropagation()}>
                <Delete/>
            </IconButton>
        </Card>
    );
};

export default TrackItem;