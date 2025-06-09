'use client';

import { Box, Button, TextField, Typography, Container } from '@mui/material';
import {Suspense, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import axios from "axios";
import {toast} from "react-toastify";

export default function ResetPasswordPage() {
    const [isPending, setIsPending] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);

    const InputsWithAutoFilling = () => {
        const searchParams = useSearchParams();

        return (

            <>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Электронная почта"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    defaultValue={searchParams.get('email') || ""}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="otp"
                    label="Одноразовый код из письма"
                    type="text"
                    defaultValue={searchParams.get('otp') || ""}
                />
            </>

        )
    }


    const handleSubmit = async (formData: FormData) => {
        setIsPending(true);

        const response = await axios.post('/api/auth/reset-password', {
            email: formData.get("email"),
            otp: formData.get("otp"),
            password: formData.get("password")
        }).then(res => res.data)
            .catch(err => err.response.data)
            .finally(() => setIsPending(false));

        if(response.success) {
            setResetSuccess(true)
        }

        toast(response.message)
    }



    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                    Сброс пароля
                </Typography>
                <Box component="form" action={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Suspense>
                        <InputsWithAutoFilling />
                    </Suspense>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Новый пароль"
                        type="password"
                        autoComplete="new-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="passwordConfirmation"
                        label="Подтверждение пароля"
                        type="password"
                        id="passwordConfirmation"
                        autoComplete="new-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        loading={isPending}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Сбросить пароль
                    </Button>
                </Box>
                {
                    resetSuccess && (
                        <Button sx={{width: "100%"}} variant={'outlined'} href={'/admin/login'}>На страницу логина</Button>
                    )
                }
            </Box>
        </Container>
    );
}
