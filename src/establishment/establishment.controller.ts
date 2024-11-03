import {
    BadRequestException,
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { type EstablishmentSearchParams, SortParams } from '../typings/query.typings';
import { errorToPlainObject } from '../utils/error.helper';
import { ParseLimitParamPipe } from '../utils/pipes/parseLimitParamPipe';
import { DEFAULT_SORT_PARAMS, ParseSortPipe } from '../utils/pipes/parseSortParamPipe';
import { CreateEstablishmentDto } from './dtos/create-establishment.dto';
import { UpdateEstablishmentDto } from './dtos/update-establishment.dto';
import { EstablishmentService } from './establishment.service';

@ApiBearerAuth()
@ApiTags('establishment')
@Controller('establishments')
export class EstablishmentController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly establishmentService: EstablishmentService,
    ) {}

    @Get('/')
    @ApiQuery({
        name: 'sort',
        required: false,
        type: String,
        example: `[{field: 'createdAt', order: 'DESC'}]`,
    })
    @ApiQuery({ name: 'name', required: false, type: String })
    @ApiQuery({ name: 'address', required: false, type: String })
    @ApiQuery({ name: 'phone', required: false, type: String })
    @ApiQuery({ name: 'city', required: false, type: String })
    @ApiQuery({ name: 'country', required: false, type: String })
    @ApiQuery({ name: 'specialty', required: false, type: String })
    @ApiQuery({ name: 'name_search', required: false, type: String })
    @ApiQuery({ name: 'location_search', required: false, type: String })
    async findAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
        @Query('name') name?: string,
        @Query('address') address?: string,
        @Query('phone') phone?: string,
        @Query('city') city?: string,
        @Query('country') country?: string,
        @Query('specialty') specialty?: string,
        @Query('name_search') nameSearch?: string,
        @Query('location_search') locationSearch?: string,
    ) {
        try {
            const establishmentSearch: EstablishmentSearchParams = {
                name,
                address,
                phone,
                city,
                country,
                specialty,
                nameSearch,
                locationSearch,
            };

            return this.establishmentService.findAndCountAll({
                page,
                limit,
                sort,
                establishmentSearch,
            });
        } catch (error) {
            this.logger.error(
                `EstablishmentController - failed to get establishments, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Get('/:id')
    async findOne(@Param('id') establishmentId: string) {
        try {
            return this.establishmentService.find(establishmentId);
        } catch (error) {
            this.logger.error(
                `EstablishmentController - failed to get establishment, ${
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
        @Param('id') establishmentId: string,
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
    ) {
        try {
            return this.establishmentService.findEstablishmentTimeSlots(establishmentId, {
                page,
                limit,
                sort,
            });
        } catch (error) {
            this.logger.error(
                `EstablishmentController - failed to get timeslots, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Get('/:id/appointments')
    async findAppointments(
        @Param('id') establishmentId: string,
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
    ) {
        try {
            return this.establishmentService.findEstablishmentAppointments(establishmentId, {
                page,
                limit,
                sort,
            });
        } catch (error) {
            this.logger.error(
                `EstablishmentController - failed to get appointments, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Post('/')
    async create(@Body() createEstablishmentDto: CreateEstablishmentDto) {
        try {
            return this.establishmentService.create(createEstablishmentDto);
        } catch (error) {
            this.logger.error(
                `EstablishmentController - failed to create establishment, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Put('/:id')
    async update(
        @Body() updateEstablishmentDto: UpdateEstablishmentDto,
        @Param('id') establishmentId: string,
    ) {
        if (establishmentId !== updateEstablishmentDto.id) {
            throw new BadRequestException('Mismatching identifiers');
        }

        try {
            return this.establishmentService.update(updateEstablishmentDto);
        } catch (error) {
            this.logger.error(
                `EstablishmentController - failed to update establishment, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Delete('/:id')
    async delete(@Param('id') establishmentId: string) {
        try {
            await this.establishmentService.delete(establishmentId);
        } catch (error) {
            this.logger.error(
                `EstablishmentController - failed to delete establishment, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }
}
