import { Module } from '@nestjs/common';
import { EndpointModule } from '@/routes/endpoint/endpoint.module';
import { UserModule } from '@/routes/user/user.module';
import { AuthModule } from '@/routes/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@/prisma/prisma.service';
import { RouteModule } from '@/routes/route/route.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from '@/app.controller';

@Module({
	imports: [
		EndpointModule,
		UserModule,
		AuthModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		RouteModule,
		ThrottlerModule.forRoot({
			throttlers: [
				{
					ttl: 60000,
					limit: 10,
				},
			],
		}),
	],
	controllers: [AppController],
	providers: [PrismaService],
})
export class AppModule {}
