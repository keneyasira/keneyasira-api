import {
    BadRequestException,
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { errorToPlainObject } from '../utils/error.helper';
import { ParseLimitParamPipe } from '../utils/pipes/parseLimitParamPipe';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { RoleService } from './role.service';

@ApiBearerAuth()
@ApiTags('role')
@Controller('role')
export class RoleController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly roleService: RoleService,
    ) {}

    @Get('/')
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
    ) {
        return this.roleService.findAndCountAll({ page, limit });
    }

    @Get('/:id')
    async findOne(@Param('id') userId: string) {
        try {
            const role = await this.roleService.find(userId);

            if (!role) {
                throw new NotFoundException();
            }

            return role;
        } catch (error) {
            this.logger.error(`RoleController - failed to get user, ${(error as Error).message}`, {
                error: errorToPlainObject(error as Error),
            });
            throw error;
        }
    }

    @Post('/')
    async create(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.create(createRoleDto);
    }

    @Put('/:id')
    async update(
        @Body() updateRoleDto: UpdateRoleDto,
        @Param('id') userId: string,
    ) {
        if (userId !== updateRoleDto.id) {
            throw new BadRequestException('Mismatching identifiers');
        }

        return this.roleService.update(updateRoleDto);
    }

    @Delete('/:id')
    async delete(@Param('id') roleId: string) {
        return this.roleService.delete(roleId);
    }
}
