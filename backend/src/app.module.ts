import { Module } from '@nestjs/common';
import { EndpointModule } from '@/routes/endpoint/endpoint.module';
import { UserModule } from '@/routes/user/user.module';
import { AuthModule } from '@/routes/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@/prisma/prisma.service';
import { RouteModule } from '@/routes/route/route.module';

@Module({
	imports: [
		EndpointModule,
		UserModule,
		AuthModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		RouteModule,
	],
	controllers: [],
	providers: [PrismaService],
})
export class AppModule {}
