import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/routes/user/user.service';
import { User } from '@prisma/client';

//Проверка, что юзер залогинен
@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private userService: UserService,
	) {}
	async canActivate(context: ExecutionContext) {
		const request: Request = context.switchToHttp().getRequest();
		const authorization = request.headers.authorization;

		if (!authorization) throw new UnauthorizedException();

		try {
			const userFromReq = await this.jwtService.verifyAsync(authorization.split(' ')[1]);

			if (!userFromReq) throw new UnauthorizedException();

			const user: User | null = await this.userService.findById(userFromReq.id);

			if (!user || !user.isActive) throw new UnauthorizedException();

			request['user'] = user;
			return true;
		} catch (error: any) {
			console.error(error);
			throw new UnauthorizedException();
		}
	}
}
