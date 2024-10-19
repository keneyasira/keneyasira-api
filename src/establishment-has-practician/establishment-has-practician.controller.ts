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

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { SortParams } from '../typings/query.typings';
import { errorToPlainObject } from '../utils/error.helper';
import { ParseLimitParamPipe } from '../utils/pipes/parseLimitParamPipe';
import { DEFAULT_SORT_PARAMS, ParseSortPipe } from '../utils/pipes/parseSortParamPipe';
import { CreateEstablishmentHasPracticianDto } from './dtos/create-establishment-has-practician.dto';
import { EstablishmentHasPracticianService } from './establishment-has-practician.service';

@Controller('establishment-has-practicians')
export class EstablishmentHasPracticianController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly establishmentHasPracticianService: EstablishmentHasPracticianService,
    ) {}

    @Get()
    async findAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
    ) {
        try {
            return this.establishmentHasPracticianService.findAndCountAll({ page, limit, sort });
        } catch (error) {
            this.logger.error(
                `EstablishmentHasPracticianController - failed to get establishmentHasPracticians, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return this.establishmentHasPracticianService.find(id);
        } catch (error) {
            this.logger.error(
                `EstablishmentHasPracticianController - failed to get establishmentHasPractician, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Post()
    async create(@Body() createEstablishmentHasPracticianDto: CreateEstablishmentHasPracticianDto) {
        try {
            return this.establishmentHasPracticianService.create(
                createEstablishmentHasPracticianDto,
            );
        } catch (error) {
            this.logger.error(
                `EstablishmentHasPracticianController - failed to create establishmentHasPracticians, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            return this.establishmentHasPracticianService.delete(id);
        } catch (error) {
            this.logger.error(
                `EstablishmentHasPracticianController - failed to delete establishmentHasPracticians, ${
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
