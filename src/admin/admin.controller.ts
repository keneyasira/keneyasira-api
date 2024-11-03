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
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AuthenticatedUser } from '../authentication/decorators/authenticated-user.param-decorator';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { SearchParams, SortParams } from '../typings/query.typings';
import { UserAttributes } from '../user/models/user.model';
import { errorToPlainObject } from '../utils/error.helper';
import { ParseLimitParamPipe } from '../utils/pipes/parseLimitParamPipe';
import { DEFAULT_SORT_PARAMS, ParseSortPipe } from '../utils/pipes/parseSortParamPipe';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';

@ApiBearerAuth()
@ApiTags('admin')
@Controller('admins')
export class AdminController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly adminService: AdminService,
    ) {}

    @Get('/')
    @ApiQuery({
        name: 'sort',
        required: false,
        type: String,
        example: `[{field: 'createdAt', order: 'DESC'}]`,
    })
    @ApiQuery({ name: 'firstName', required: false, type: String })
    @ApiQuery({ name: 'lastName', required: false, type: String })
    @ApiQuery({ name: 'email', required: false, type: String })
    @ApiQuery({ name: 'phone', required: false, type: String })
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
        @Query('firstName') firstName?: string,
        @Query('lastName') lastName?: string,
        @Query('email') email?: string,
        @Query('phone') phone?: string,
    ) {
        try {
            const search: SearchParams = {
                firstName,
                lastName,
                email,
                phone,
            };

            return this.adminService.findAndCountAll({ page, limit, sort, search });
        } catch (error) {
            this.logger.error(`AdminController - failed to get admins, ${(error as Error).message}`, {
                error: errorToPlainObject(error as Error),
            });
            throw error;
        }
    }

    @Get('/:id')
    async findOne(@Param('id') adminId: string) {
        try {
            const admin = await this.adminService.find(adminId);

            if (!admin) {
                throw new NotFoundException('Admin not found');
            }

            return admin;
        } catch (error) {
            this.logger.error(`AdminController - failed to get admin, ${(error as Error).message}`, {
                error: errorToPlainObject(error as Error),
            });
            throw error;
        }
    }

    @Post('/')
    async create(@AuthenticatedUser() user: UserAttributes, @Body() createAdminDto: CreateAdminDto) {
        try {
            return this.adminService.create({ ...createAdminDto, createdBy: user.id });
        } catch (error) {
            this.logger.error(
                `AdminController - failed to create admin, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Put('/:id')
    async update(
        @AuthenticatedUser() user: UserAttributes,
        @Body() updateAdminDto: UpdateAdminDto,
        @Param('id') adminId: string,
    ) {
        if (adminId !== updateAdminDto.id) {
            throw new BadRequestException('Mismatching identifiers');
        }

        try {
            return this.adminService.update({ ...updateAdminDto, updatedBy: user.id });
        } catch (error) {
            this.logger.error(
                `AdminController - failed to update admin, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Delete('/:id')
    async delete(@AuthenticatedUser() user: UserAttributes, @Param('id') adminId: string) {
        try {
            await this.adminService.delete({ adminId, deletedBy: user.id });
        } catch (error) {
            this.logger.error(
                `AdminController - failed to delete admin, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }
}