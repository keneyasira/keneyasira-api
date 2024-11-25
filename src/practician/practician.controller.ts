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
import { type SearchParams, SortParams } from '../typings/query.typings';
import { UserAttributes } from '../user/models/user.model';
import { errorToPlainObject } from '../utils/error.helper';
import { ParseLimitParamPipe } from '../utils/pipes/parseLimitParamPipe';
import { DEFAULT_SORT_PARAMS, ParseSortPipe } from '../utils/pipes/parseSortParamPipe';
import { CreatePracticianDto } from './dtos/create-practician.dto';
import { UpdatePracticianDto } from './dtos/update-practician.dto';
import { PracticianService } from './practician.service';

@ApiBearerAuth()
@ApiTags('practician')
@Controller('practicians')
export class PracticianController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly practicianService: PracticianService,
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
    @ApiQuery({ name: 'specialty', required: false, type: String })
    @ApiQuery({ name: 'name_search', required: false, type: String })
    @ApiQuery({ name: 'location_search', required: false, type: String })
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
        @Query('firstName') firstName?: string,
        @Query('lastName') lastName?: string,
        @Query('email') email?: string,
        @Query('phone') phone?: string,
        @Query('specialty') specialty?: string,
        @Query('name_search') nameSearch?: string,
    ) {
        try {
            const search: SearchParams = {
                firstName,
                lastName,
                email,
                phone,
                specialty,
                nameSearch,
            };

            return this.practicianService.findAndCountAll({ page, limit, sort, search });
        } catch (error) {
            this.logger.error(
                `PracticianController - failed to get practicians, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Get('/:id')
    async findOne(@Param('id') practicianId: string) {
        try {
            const practician = await this.practicianService.find(practicianId);

            if (!practician) {
                throw new NotFoundException('Practician not found');
            }

            return practician;
        } catch (error) {
            this.logger.error(
                `PracticianController - failed to get practician, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Get('/:id/appointments')
    async findAppointments(
        @Param('id') practicianId: string,
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
    ) {
        try {
            return this.practicianService.findPracticianAppointments(practicianId, {
                page,
                limit,
                sort,
            });
        } catch (error) {
            this.logger.error(
                `PracticianController - failed to get practician appointments, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Get('/:id/time-slots')
    async findTimeSlots(
        @Param('id') practicianId: string,
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
    ) {
        try {
            return this.practicianService.findPracticianTimeSlots(practicianId, {
                page,
                limit,
                sort,
            });
        } catch (error) {
            this.logger.error(
                `PracticianController - failed to get time-slots, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Get('/:id/establishments/:establishmentId/appointments')
    async findAppointmentsForAnEstablishment(
        @Param('id') practicianId: string,
        @Param('establishmentId') establishmentId: string,
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
    ) {
        try {
            return this.practicianService.findPracticianAppointments(
                practicianId,
                {
                    page,
                    limit,
                    sort,
                },
                establishmentId,
            );
        } catch (error) {
            this.logger.error(
                `PracticianController - failed to get practician appointments, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Get('/:id/establishments/:establishmentId/time-slots')
    async findTimeSlotsForAnEstablishment(
        @Param('id') practicianId: string,
        @Param('establishmentId') establishmentId: string,
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
    ) {
        try {
            return this.practicianService.findPracticianTimeSlots(
                practicianId,
                {
                    page,
                    limit,
                    sort,
                },
                establishmentId,
            );
        } catch (error) {
            this.logger.error(
                `PracticianController - failed to get time-slots, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Post('/')
    async create(
        @AuthenticatedUser() user: UserAttributes,
        @Body() createPracticianDto: CreatePracticianDto,
    ) {
        try {
            return this.practicianService.create({
                ...createPracticianDto,
                createdBy: user.id,
            });
        } catch (error) {
            this.logger.error(
                `PracticianController - failed to create practician, ${(error as Error).message}`,
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
        @Param('id') id: string,
        @Body() updatePracticianDto: UpdatePracticianDto,
    ) {
        if (id !== updatePracticianDto.id) {
            throw new BadRequestException('Id mismatch');
        }

        try {
            return await this.practicianService.update({
                ...updatePracticianDto,
                updatedBy: user.id,
            });
        } catch (error) {
            this.logger.error(
                `PracticianController - failed to update practician, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Delete('/:id')
    async delete(@AuthenticatedUser() user: UserAttributes, @Param('id') id: string) {
        try {
            await this.practicianService.delete({ practicianId: id, deletedBy: user.id });
        } catch (error) {
            this.logger.error(
                `PracticianController - failed to delete practician, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }
}
