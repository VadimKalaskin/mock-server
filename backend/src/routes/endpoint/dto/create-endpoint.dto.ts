import { IsString, IsObject, IsInt, IsOptional } from 'class-validator';

export class CreateEndpointDto {
	@IsString()
	method: string;

	@IsString()
	path: string;

	@IsObject()
	responseBody: any;

	@IsInt()
	@IsOptional()
	statusCode?: number;

	@IsInt()
	@IsOptional()
	delay?: number;
}
