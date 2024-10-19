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
import { SortParams } from '../typings/query.typings';
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
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
    ) {
        try {
            return this.practicianService.findAndCountAll({ page, limit, sort });
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
                `PracticianController - failed to get time-slots, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Post('/')
    async create(@Body() createPracticianDto: CreatePracticianDto) {
        try {
            return this.practicianService.create(createPracticianDto);
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
    async update(@Param('id') id: string, @Body() updatePracticianDto: UpdatePracticianDto) {
        if (id !== updatePracticianDto.id) {
            throw new BadRequestException('Id mismatch');
        }

        try {
            return await this.practicianService.update(updatePracticianDto);
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
    async delete(@Param('id') id: string) {
        try {
            await this.practicianService.delete(id);
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
