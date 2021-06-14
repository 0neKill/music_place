import React from 'react';
import {ITrack} from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import {Button, Grid, TextField} from "@material-ui/core";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import axios from "axios";
import {useInput} from "../../hooks/useInput";


interface TrackPageProps {
    serverTrack: ITrack
}

const TrackPage: React.FC<TrackPageProps> = ({serverTrack}) => {
    const [track, setTrack] = React.useState<ITrack>(serverTrack);
    const router = useRouter();

    const username = useInput('');
    const text = useInput('');

    const addComment = async () => {
        if (username.value && text.value) {
            const data = {
                username: username.value,
                text: text.value,
                trackId: track.id
            }
            const response = await axios.post('http://localhost:7000/tracks/comment', data)
            setTrack(state => ({...state, comments: [...state.comments, response.data]}))
        }
    }

    return (
        <MainLayout>
            <Button
                onClick={() => router.push('/tracks')}
                variant='outlined'
                style={{fontSize: 32}}
            >
                К списку
            </Button>
            <Grid container style={{margin: '20px 0'}}>
                <img src={`http://localhost:7000/${track.picture}`} alt="" width={200} height={200}/>
                <div style={{marginLeft: '30px'}}>
                    <h1>Название трека - {track.name}</h1>
                    <h1>Исполнитель - {track.artist}</h1>
                    <h1>Прослушивание - {track.listens}</h1>
                </div>
            </Grid>
            <h1>Слова в треке</h1>
            <p>{track.text}</p>
            <h2>Комментарии</h2>
            <Grid container>
                <TextField label='Ваше имя' fullWidth {...username}/>
                <TextField label='Комментарий' fullWidth multiline rows={4} {...text}/>
                <Button onClick={addComment}>Отправить</Button>
            </Grid>
            <div>
                {
                    track.comments.map(com => (
                        <div key={com.id}>
                            <div> Автор - {com.username}</div>
                            <div> Комментарий - {com.text}</div>
                        </div>
                    ))
                }
            </div>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get<ITrack>('http://localhost:7000/tracks/' + params.id)
    return {
        props: {
            serverTrack: response.data
        }
    }
}