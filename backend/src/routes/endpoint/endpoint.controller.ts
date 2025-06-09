import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Param,
	Body,
	HttpStatus,
	HttpCode,
	UseGuards,
	Res,
	Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

import { EndpointService } from './endpoint.service';
import { CreateEndpointDto } from './dto/create-endpoint.dto';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';
import { AuthGuard } from '@/guards/auth.guard';
import { Request } from 'express';

@ApiTags('Endpoint')
@Controller('endpoint')
export class EndpointController {
	constructor(private readonly service: EndpointService) {}

	@UseGuards(AuthGuard)
	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: 'Create a new endpoint' })
	@ApiBody({ type: CreateEndpointDto })
	@ApiResponse({ status: 201, description: 'Endpoint created' })
	create(@Body() dto: CreateEndpointDto, @Req() req: Request) {
		return this.service.create(dto, req);
	}

	@UseGuards(AuthGuard)
	@Get()
	@ApiOperation({ summary: 'Get all endpoints' })
	@ApiResponse({ status: 200, description: 'List of endpoints' })
	findAll(@Req() req: Request) {
		return this.service.findAll(req);
	}

	@UseGuards(AuthGuard)
	@Get(':id')
	@ApiOperation({ summary: 'Get endpoint by ID' })
	@ApiParam({ name: 'id', type: 'string' })
	@ApiResponse({ status: 200, description: 'Found endpoint' })
	@ApiResponse({ status: 404, description: 'Endpoint not found' })
	findOne(@Param('id') id: string) {
		return this.service.findOne(id);
	}

	@UseGuards(AuthGuard)
	@Put(':id')
	@ApiOperation({ summary: 'Update endpoint by ID' })
	@ApiParam({ name: 'id', type: 'string' })
	@ApiBody({ type: UpdateEndpointDto })
	@ApiResponse({ status: 200, description: 'Endpoint updated' })
	@ApiResponse({ status: 404, description: 'Endpoint not found' })
	update(@Param('id') id: string, @Body() dto: UpdateEndpointDto) {
		return this.service.update(id, dto);
	}

	@UseGuards(AuthGuard)
	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: 'Delete endpoint by ID' })
	@ApiParam({ name: 'id', type: 'string' })
	@ApiResponse({ status: 204, description: 'Endpoint deleted' })
	@ApiResponse({ status: 404, description: 'Endpoint not found' })
	remove(@Param('id') id: string) {
		return this.service.remove(id);
	}
}
