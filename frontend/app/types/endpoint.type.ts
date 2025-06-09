export type EndpointType = {
	id: string;
	method: string;
	path: string;
	responseBody: string;
	statusCode: number;
	delay?: number;
	createdAt: string;
	updatedAt: string;
	userId: string;
}