'use server'

import {getApiClient} from "@/utils/apiClient";

export default async function createEndpoint(prevState: any, formData: FormData) {
	const client = await getApiClient()

	try {
		const res = await client.post('/endpoint', {
			method: formData.get('method'),
			path: formData.get('path'),
			responseBody: formData.get('responseBody'),
			statusCode: Number(formData.get('statusCode')),
			delay: Number(formData.get('delay')),
		})

		return {
			success: true,
			data: res.data,
		};
	} catch (error: any) {
		console.error(error);
		return {
			success: false,
			message: error.response.data.message,
		}
	}
}