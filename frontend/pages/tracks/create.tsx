import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import StepWrapper from "../../components/StepWrapper";
import {Button, Grid, TextField} from "@material-ui/core";
import FileUpload from "../../components/FileUpload";
import {useInput} from "../../hooks/useInput";
import axios from "axios";
import {router} from "next/client";

const Create = () => {
        const [activeStep, setActiveStep] = React.useState<number>(0);
        const [picture, setPicture] = React.useState<File | null>(null);
        const [audio, setAudio] = React.useState<File | null>(null);
        const name = useInput('');
        const artist = useInput('');
        const text = useInput('');

        const next = () => {
            setActiveStep(step => step + 1);
        }
        React.useEffect(()=>{
            if(activeStep === 3) {
                const formData = new FormData();
                formData.append('name',name.value)
                formData.append('artist',artist.value)
                formData.append('text',text.value)
                formData.append('picture',picture)
                formData.append('audio',audio)
                axios.post('http://localhost:7000/tracks/',formData)
                    .then((data)=>router.push('/tracks'))
            }
        },[activeStep])

        const back = () => setActiveStep(step => step - 1)
        return (
            <MainLayout>
                <StepWrapper activeStep={activeStep}>
                    {{
                        0: <Grid container direction='column' style={{padding: 20}}>
                            <TextField
                                style={{marginTop: 10}}
                                label='Название трека'
                                {...name}
                            />
                            <TextField
                                style={{marginTop: 10}}
                                label='Имя исполнителя'
                                {...artist}
                            />
                            <TextField
                                style={{marginTop: 10}}
                                label='Слова к треку'
                                multiline
                                rows={3}
                                {...text}
                            />
                        </Grid>,
                        1: <FileUpload
                            setFile={setPicture}
                            accept='image/*'>
                            <Button>Загрузите обложку</Button>
                        </FileUpload>,
                        2: <FileUpload
                            setFile={setAudio}
                            accept='audio/*'>
                            <Button>Загрузите аудио</Button>
                        </FileUpload>
                    }[activeStep]}
                </StepWrapper>
                <Grid container justify='space-between'>
                    <Button disabled={activeStep === 0} onClick={back}>Назад</Button>
                    <Button disabled={activeStep >= 3} onClick={next}>Далее</Button>
                </Grid>
            </MainLayout>

        );
    }
;

export default Create;