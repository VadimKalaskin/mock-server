import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class RouteService {
	constructor(private prismaService: PrismaService) {}

	async handle(userId: number, path: string, method: string) {
		const user = await this.prismaService.user.findUnique({
			where: { id: userId },
		});

		if (!user) throw new NotFoundException('User does not exist');

		const endpoint = await this.prismaService.endpoint.findUnique({
			where: {
				method_path_userId: {
					method,
					path,
					userId,
				},
			},
		});

		if (!endpoint) throw new NotFoundException('Endpoint not found');

		if (endpoint.delay && endpoint.delay > 0) {
			await new Promise((resolve) => setTimeout(resolve, endpoint.delay || 0));
		}

		return {
			status: endpoint.statusCode,
			body: endpoint.responseBody,
		};
	}
}
