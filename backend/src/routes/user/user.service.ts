import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
	constructor(private prismaService: PrismaService) {}

	async create(email: string, password: string) {
		return this.prismaService.user.create({
			data: {
				email,
				passwordHash: await hash(password),
			},
		});
	}

	async findByEmail(email: string) {
		return this.prismaService.user.findUnique({
			where: { email },
		});
	}

	async findById(id: string) {
		return this.prismaService.user.findUnique({
			where: { id },
		});
	}
}
