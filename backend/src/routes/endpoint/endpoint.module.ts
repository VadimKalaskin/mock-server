import { Module } from '@nestjs/common';
import { EndpointController } from './endpoint.controller';
import { EndpointService } from './endpoint.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/routes/user/user.service';

@Module({
	controllers: [EndpointController],
	providers: [EndpointService, PrismaService, UserService],
})
export class EndpointModule {}
