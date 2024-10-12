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
import { EstablishmentHasSpecialtyService } from './establishment-has-specialty.service';
import { CreateEstablishmentHasSpecialtyDto } from './dtos/create-establishment-has-specialty.dto';
import { ParseLimitParamPipe } from '../utils/pipes/parseLimitParamPipe';
import { SortParams } from '../typings/query.typings';
import { DEFAULT_SORT_PARAMS, ParseSortPipe } from '../utils/pipes/parseSortParamPipe';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { errorToPlainObject } from '../utils/error.helper';

@Controller('establishment-has-specialties')
export class EstablishmentHasSpecialtyController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly establishmentHasSpecialtyService: EstablishmentHasSpecialtyService,
    ) {}

    @Get()
    async findAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
    ) {
        try {
            return this.establishmentHasSpecialtyService.findAndCountAll({ page, limit, sort });
        } catch (error) {
            this.logger.error(
                `EstablishmentHasSpecialtyController - failed to get establishmentHasSpecialties, ${
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
            return this.establishmentHasSpecialtyService.find(id);
        } catch (error) {
            this.logger.error(
                `EstablishmentHasSpecialtyController - failed to get establishmentHasSpecialty, ${
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
    async create(@Body() createEstablishmentHasSpecialtyDto: CreateEstablishmentHasSpecialtyDto) {
        try {
            return this.establishmentHasSpecialtyService.create(createEstablishmentHasSpecialtyDto);
        } catch (error) {
            this.logger.error(
                `EstablishmentHasSpecialtyController - failed to create establishmentHasSpecialties, ${
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
            return this.establishmentHasSpecialtyService.delete(id);
        } catch (error) {
            this.logger.error(
                `EstablishmentHasSpecialtyController - failed to delete establishmentHasSpecialties, ${
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
