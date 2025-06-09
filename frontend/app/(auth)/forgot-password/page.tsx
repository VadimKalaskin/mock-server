'use client';

import { Box, Button, TextField, Typography, Container } from '@mui/material';
import {useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";

export default function PasswordReset() {

    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsPending(true);

        const response = await axios.post('/api/auth/forgot-password', {
            email: formData.get("email"),
        }).then(res => res.data)
            .catch(err => err.response.data)
            .finally(() => setIsPending(false));



        toast(response.message, {type: response.success ? "success" : "error"})
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
                    Восстановление пароля
                </Typography>
                <Box component="form" action={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Электронная почта"
                        name="email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        loading={isPending}
                    >
                        Отправить
                    </Button>
                </Box>

            </Box>
        </Container>
    );
}
