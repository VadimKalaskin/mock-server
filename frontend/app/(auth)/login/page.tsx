'use client';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuthStore } from '@/auth.store';

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const setAccessToken = useAuthStore((state) => state.setAccessToken);

	const handleSubmit = async () => {
		try {
			const res = await axios.post(
				'/api/auth/login',
				{
					email,
					password,
				},
				{
					withCredentials: true,
				},
			);

			if (res.data.accessToken) {
				setAccessToken(res.data.accessToken);
				router.push('/admin/endpoints');
			}
		} catch (error: any) {
			toast.error(error.response?.data?.message);
		}
	};

	return (
		<Container maxWidth='xs'>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography component='h1' variant='h5' sx={{ mb: 2 }}>
					Вход
				</Typography>
				<Box component='form' noValidate sx={{ mt: 1 }}>
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email'
						name='email'
						autoComplete='email'
						type='email'
						autoFocus
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						name='password'
						label='Пароль'
						type='password'
						id='password'
						autoComplete='current-password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						type='button'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
						onClick={handleSubmit}
					>
						Войти
					</Button>
					<div className='flex justify-between'>
						<Button variant={'text'} href={'/forgot-password'}>
							Забыли пароль?
						</Button>
						<Button variant={'text'} href={'/register'}>
							Ещё нет аккаунта?
						</Button>
					</div>
				</Box>
			</Box>
		</Container>
	);
}
