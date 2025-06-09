import { All, Controller, Param, Req } from '@nestjs/common';
import { RouteService } from './route.service';
import { Request } from 'express';

@Controller('route')
export class RouteController {
	constructor(private readonly routeService: RouteService) {}

	@All(':userId/*path')
	handle(@Param('userId') userId: string, @Param('path') path: string, @Req() req: Request) {
		return this.routeService.handle(Number(userId), path, req.method);
	}
}
