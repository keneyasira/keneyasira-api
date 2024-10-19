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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { SortParams } from '../typings/query.typings';
import { errorToPlainObject } from '../utils/error.helper';
import { ParseLimitParamPipe } from '../utils/pipes/parseLimitParamPipe';
import { DEFAULT_SORT_PARAMS, ParseSortPipe } from '../utils/pipes/parseSortParamPipe';
import { CreateSpecialtyDto } from './dtos/create-specialty.dto';
import { UpdateSpecialtyDto } from './dtos/update-specialty.dto';
import { SpecialtyService } from './specialty.service';

@ApiBearerAuth()
@ApiTags('specialty')
@Controller('specialties')
export class SpecialtyController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly SpecialtyService: SpecialtyService,
    ) {}

    @Get('/')
    async findAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
    ) {
        try {
            return this.SpecialtyService.findAndCountAll({ page, limit, sort });
        } catch (error) {
            this.logger.error(
                `SpecialtyController - failed to get specialties, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Get('/:id')
    async findOne(@Param('id') SpecialtyId: string) {
        try {
            return this.SpecialtyService.find(SpecialtyId);
        } catch (error) {
            this.logger.error(
                `SpecialtyController - failed to get access group, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Post('/')
    async create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
        try {
            return this.SpecialtyService.create(createSpecialtyDto);
        } catch (error) {
            this.logger.error(
                `SpecialtyController - failed to create specialty, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );

            throw error;
        }
    }

    @Put('/:id')
    async update(@Body() updateSpecialtyDto: UpdateSpecialtyDto, @Param('id') SpecialtyId: string) {
        if (SpecialtyId !== updateSpecialtyDto.id) {
            throw new BadRequestException('Mismatching identifiers');
        }

        try {
            return this.SpecialtyService.update(updateSpecialtyDto);
        } catch (error) {
            this.logger.error(
                `SpecialtyController - failed to update specialty, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );

            throw error;
        }
    }

    @Delete('/:id')
    async delete(@Param('id') SpecialtyId: string) {
        try {
            await this.SpecialtyService.delete(SpecialtyId);
        } catch (error) {
            this.logger.error(
                `SpecialtyController - failed to delete specialty, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );

            throw error;
        }
    }
}
