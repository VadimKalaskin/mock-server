import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@/routes/user/user.service';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
	imports: [
		JwtModule.registerAsync({
			global: true,
			useFactory: (configService: ConfigService) => ({
				global: true,
				secret: configService.getOrThrow<string>('JWT_SECRET'),
				signOptions: {
					expiresIn: '600s',
				},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [AuthService, UserService, PrismaService],
	controllers: [AuthController],
})
export class AuthModule {}
