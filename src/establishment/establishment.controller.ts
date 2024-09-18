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
import { EstablishmentService } from './establishment.service';
import { CreateEstablishmentDto } from './dtos/create-establishment.dto';
import { UpdateEstablishmentDto } from './dtos/update-establishment.dto';

@ApiBearerAuth()
@ApiTags('establishment')
@Controller('establishments')
export class EstablishmentController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly establishmentService: EstablishmentService,
    ) {}

    @Get('/')
    async findAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
    ) {
        try {
            return this.establishmentService.findAndCountAll({ page, limit, sort });
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
