'use server';
import axios from 'axios';
import { cookies } from 'next/headers';

export const getApiClient = async () => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('accessToken')?.value;

	return axios.create({
		baseURL: process.env.BACKEND_URL,
		headers: {
			Authorization: accessToken ? `Bearer ${accessToken}` : '',
		},
		withCredentials: true,
	});
};
