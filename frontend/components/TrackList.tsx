import React from 'react';
import {ITrack} from "../types/track";
import {Box, Grid} from "@material-ui/core";
import TrackItem from "./TrackItem";

interface ITrackListProps {
    tracks: Array<ITrack>
}

const TrackList: React.FC<ITrackListProps> = ({
                                                  tracks
                                              }) => {
    return (
        <Grid container direction='column'>
            <Box p={2}>
                {
                    tracks.map(item => (
                        <TrackItem key={item.id} track={item} active={false}/>
                    ))
                }
            </Box>
        </Grid>
    );
};

export default TrackList;