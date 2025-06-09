import { Controller, Post, Body, Req, Get, HttpCode, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginDto } from '@/routes/auth/dto/login.dto';
import { RegisterDto } from '@/routes/auth/dto/register.dto';
import { AuthGuard } from '@/guards/auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('register')
	async register(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) res: Response) {
		return this.authService.register(registerDto, res);
	}

	@HttpCode(200)
	@Post('login')
	async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
		return this.authService.login(loginDto, res);
	}

	@UseGuards(AuthGuard)
	@Get('logout')
	logout(@Res({ passthrough: true }) res: Response) {
		return this.authService.logout(res);
	}

	@UseGuards(AuthGuard)
	@Get()
	auth(@Req() req: Request) {
		return { isAuthorized: req['user'].isActive };
	}
}
