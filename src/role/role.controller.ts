import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AuthenticatedUser } from '../authentication/decorators/authenticated-user.param-decorator';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { SortParams } from '../typings/query.typings';
import { UserAttributes } from '../user/models/user.model';
import { errorToPlainObject } from '../utils/error.helper';
import { ParseLimitParamPipe } from '../utils/pipes/parseLimitParamPipe';
import { DEFAULT_SORT_PARAMS, ParseSortPipe } from '../utils/pipes/parseSortParamPipe';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RoleService } from './role.service';

@ApiBearerAuth()
@ApiTags('role')
@Controller('roles')
export class RoleController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly roleService: RoleService,
    ) {}

    @Get('/')
    @ApiQuery({
        name: 'sort',
        required: false,
        type: String,
        example: `[{field: 'createdAt', order: 'DESC'}]`,
    })
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
    ) {
        try {
            return this.roleService.findAndCountAll({ page, limit, sort });
        } catch (error) {
            this.logger.error(`RoleController - failed to get roles, ${(error as Error).message}`, {
                error: errorToPlainObject(error as Error),
            });
            throw error;
        }
    }

    @Get('/:id')
    async findOne(@Param('id') userId: string) {
        try {
            const role = await this.roleService.find(userId);

            if (!role) {
                throw new NotFoundException('Role not found');
            }

            return role;
        } catch (error) {
            this.logger.error(`RoleController - failed to get role, ${(error as Error).message}`, {
                error: errorToPlainObject(error as Error),
            });
            throw error;
        }
    }

    @Post('/')
    async create(@AuthenticatedUser() user: UserAttributes, @Body() createRoleDto: CreateRoleDto) {
        return this.roleService.create({ ...createRoleDto, createdBy: user.id });
    }

    @Delete('/:id')
    async delete(@AuthenticatedUser() user: UserAttributes, @Param('id') roleId: string) {
        try {
            await this.roleService.delete({ roleId, deletedBy: user.id });
        } catch (error) {
            this.logger.error(
                `RoleController - failed to delete role, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );

            throw error;
        }
    }
}
