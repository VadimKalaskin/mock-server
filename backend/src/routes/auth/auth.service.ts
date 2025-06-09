import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { hash, verify } from 'argon2';
import { Response } from 'express';
import { RegisterDto } from '@/routes/auth/dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/routes/user/user.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private userService: UserService,
	) {}

	async register(registerDto: RegisterDto, res: Response) {
		const user = await this.userService.create(registerDto.email, registerDto.password);

		const { accessToken } = await this.createToken(user.id, user.email);

		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			maxAge: 60 * 60 * 1000, // 1 час
		});

		return {
			accessToken,
		};
	}

	async login(loginDto: LoginDto, res: Response) {
		const user = await this.validateUser(loginDto.email, loginDto.password);

		const { accessToken } = await this.createToken(user.id, user.email);

		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			maxAge: 60 * 60 * 1000, // 1 час
		});

		return {
			accessToken,
		};
	}

	async logout(res: Response) {
		res.cookie('accessToken', null, { httpOnly: true });
		return { accessToken: null };
	}

	private async validateUser(email: string, password: string) {
		const user: User | null = await this.userService.findByEmail(email);

		if (!user || !user.isActive) throw new UnauthorizedException();

		const passwordIsValid = await verify(user.passwordHash, password);

		if (!passwordIsValid) throw new UnauthorizedException();

		return {
			id: user.id,
			email: user.email,
		};
	}

	private async createToken(userId: string, userEmail: string) {
		const accessToken = await this.jwtService.signAsync({
			id: userId,
			email: userEmail,
		});

		return {
			accessToken,
		};
	}
}
