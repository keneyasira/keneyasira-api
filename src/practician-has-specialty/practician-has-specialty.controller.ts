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
import { CreatePracticianHasSpecialtyDto } from './dtos/create-practician-has-specialty.dto';
import { PracticianHasSpecialtyService } from './practician-has-specialty.service';

@Controller('practician-has-specialties')
export class PracticianHasSpecialtyController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly practicianHasSpecialtyService: PracticianHasSpecialtyService,
    ) {}

    @Get()
    async findAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
    ) {
        try {
            return this.practicianHasSpecialtyService.findAndCountAll({ page, limit, sort });
        } catch (error) {
            this.logger.error(
                `PracticianHasSpecialtyController - failed to get practicianHasSpecialties, ${
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
            return this.practicianHasSpecialtyService.find(id);
        } catch (error) {
            this.logger.error(
                `PracticianHasSpecialtyController - failed to get practicianHasSpecialty, ${
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
    async create(@Body() createPracticianHasSpecialtyDto: CreatePracticianHasSpecialtyDto) {
        try {
            return this.practicianHasSpecialtyService.create(createPracticianHasSpecialtyDto);
        } catch (error) {
            this.logger.error(
                `PracticianHasSpecialtyController - failed to create practicianHasSpecialties, ${
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
            return this.practicianHasSpecialtyService.delete(id);
        } catch (error) {
            this.logger.error(
                `PracticianHasSpecialtyController - failed to delete practicianHasSpecialties, ${
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
