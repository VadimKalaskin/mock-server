import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getApiClient } from '@/utils/apiClient';

export async function middleware(request: NextRequest) {
	try {
		const client = await getApiClient();
		const res = await client.get('/auth');

		if (res.data.isAuthorized) {
			return NextResponse.next();
		}
	} catch (error) {
		console.error('Error fetching profile:', error);
	}

	// Если не авторизован — перенаправляем на логин
	return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
	matcher: ['/admin/:path*'],
};
