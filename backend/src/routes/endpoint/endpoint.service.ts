import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateEndpointDto } from './dto/create-endpoint.dto';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';
import { Request } from 'express';

@Injectable()
export class EndpointService {
	constructor(private prisma: PrismaService) {}

	async create(data: CreateEndpointDto, req: Request) {
		return this.prisma.endpoint.create({
			data: {
				...data,
				userId: req['user']?.id,
			},
		});
	}

	async findAll(req: Request) {
		return this.prisma.endpoint.findMany({
			where: {
				userId: req['user']?.id as string,
			},
		});
	}

	async findOne(id: string) {
		return this.prisma.endpoint.findUniqueOrThrow({ where: { id } });
	}

	async update(id: string, data: UpdateEndpointDto) {
		return this.prisma.endpoint.update({ where: { id }, data });
	}

	async remove(id: string) {
		return this.prisma.endpoint.delete({ where: { id } });
	}
}
