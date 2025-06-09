import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEndpointDto } from './dto/create-endpoint.dto';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';

@Injectable()
export class EndpointService {
	constructor(private prisma: PrismaService) {}

	async create(data: CreateEndpointDto) {
		return this.prisma.endpoint.create({ data });
	}

	async findAll() {
		return this.prisma.endpoint.findMany();
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
