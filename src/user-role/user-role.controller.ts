import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { SortParams } from '../typings/query.typings';
import { errorToPlainObject } from '../utils/error.helper';
import { ParseLimitParamPipe } from '../utils/pipes/parseLimitParamPipe';
import { DEFAULT_SORT_PARAMS, ParseSortPipe } from '../utils/pipes/parseSortParamPipe';
import { CreateUserRoleDto } from './dtos/create-user-role.dto';
import { UserRoleService } from './user-role.service';

@ApiBearerAuth()
@ApiTags('user-role')
@Controller('user-role')
export class UserRoleController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly userRoleService: UserRoleService,
    ) {}

    @Get('/')
    async findAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
    ) {
        try {
            return this.userRoleService.findAndCountAll({ page, limit, sort });
        } catch (error) {
            this.logger.error(
                `UserRoleController - failed to get user-roles, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Get('/:id')
    async findOne(@Param('id') userRoleId: string) {
        try {
            return await this.userRoleService.find(userRoleId);
        } catch (error) {
            this.logger.error(
                `UserRoleController - failed to get user-role, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Post('/')
    async create(@Body() createUserRoleDto: CreateUserRoleDto) {
        try {
            return this.userRoleService.create(createUserRoleDto);
        } catch (error) {
            this.logger.error(
                `UserRoleController - failed to create user role, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );

            throw error;
        }
    }

    @Delete('/:id')
    async delete(@Param('id') userRoleId: string) {
        try {
            await this.userRoleService.delete(userRoleId);
        } catch (error) {
            this.logger.error(
                `UserRoleController - failed to delete user role, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );

            throw error;
        }
    }
}
