import { Controller, Get } from '@nestjs/common';

class AppService {}

@Controller()
export class AppController {
	@Get()
	health() {
		return 'OK';
	}
}
