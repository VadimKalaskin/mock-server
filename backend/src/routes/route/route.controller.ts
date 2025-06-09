import { All, Controller, Param, Req, UseGuards } from '@nestjs/common';
import { RouteService } from './route.service';
import { Request } from 'express';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('route')
export class RouteController {
	constructor(private readonly routeService: RouteService) {}

	@UseGuards(ThrottlerGuard)
	@All(':userId/*path')
	handle(@Param('userId') userId: string, @Param('path') path: string, @Req() req: Request) {
		return this.routeService.handle(Number(userId), path, req.method);
	}
}
