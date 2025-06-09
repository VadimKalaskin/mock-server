import { Controller, All, Param, Req } from '@nestjs/common';
import { AppService } from '@/app.service';
import { Request } from 'express';

@Controller()
export class AppController {
	constructor(private appService: AppService) {}
	@All(':userId/*path')
	handle(@Param('userId') userId: string, @Param('path') path: string, @Req() req: Request) {
		return this.appService.handle(userId, path, req.method);
	}
}
