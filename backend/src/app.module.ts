import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EndpointModule } from '@/routes/endpoint/endpoint.module';
import { UserModule } from '@/routes/user/user.module';
import { AuthModule } from '@/routes/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		EndpointModule,
		UserModule,
		AuthModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
