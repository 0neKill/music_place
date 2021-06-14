import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import {Box, Button, Card, Grid} from "@material-ui/core";
import {useRouter} from "next/router";
import TrackList from "../../components/TrackList";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTracks} from "../../store/actions/track";

const Index = () => {
    const router = useRouter();
    const {tracks, error} = useTypedSelector(state => state.tracks);
    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }
    return (
        <MainLayout  title={'Платформа'}>
            <Grid container justify='center'>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <Grid container justify='space-between'>
                            <h1>Список треков</h1>
                            <Button onClick={() => router.push('/tracks/create')}>Загрузить</Button>
                        </Grid>
                    </Box>
                    <TrackList tracks={tracks}/>
                </Card>
            </Grid>
        </MainLayout>
    );
};


export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchTracks())
})

export default Index;



