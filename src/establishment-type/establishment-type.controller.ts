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
import { CreateEstablishmentTypeDto } from './dtos/create-establishment-type.dto';
import { UpdateEstablishmentTypeDto } from './dtos/update-establishment-type.dto';
import { EstablishmentTypeService } from './establishment-type.service';

@ApiBearerAuth()
@ApiTags('establishment-type')
@Controller('establishment-typees')
export class EstablishmentTypeController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly establishmentTypeService: EstablishmentTypeService,
    ) {}

    @Get('/')
    async findAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
    ) {
        try {
            return this.establishmentTypeService.findAndCountAll({ page, limit, sort });
        } catch (error) {
            this.logger.error(
                `EstablishmentTypeController - failed to get establishment type, ${
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
    async findOne(@Param('id') establishmentTypeId: string) {
        try {
            return this.establishmentTypeService.find(establishmentTypeId);
        } catch (error) {
            this.logger.error(
                `EstablishmentTypeController - failed to get establishment type, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                    establishmentTypeId,
                },
            );
            throw error;
        }
    }

    @Post('/')
    async create(@Body() createEstablishmentTypeDto: CreateEstablishmentTypeDto) {
        try {
            return this.establishmentTypeService.create(createEstablishmentTypeDto);
        } catch (error) {
            this.logger.error(
                `EstablishmentTypeController - failed to create establishment type, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                    createEstablishmentTypeDto,
                },
            );
            throw error;
        }
    }

    @Put('/:id')
    async update(
        @Param('id') establishmentTypeId: string,
        @Body() updateEstablishmentTypeDto: UpdateEstablishmentTypeDto,
    ) {
        if (establishmentTypeId !== updateEstablishmentTypeDto.id) {
            throw new BadRequestException('Mismatching identifiers');
        }

        try {
            return this.establishmentTypeService.update(updateEstablishmentTypeDto);
        } catch (error) {
            this.logger.error(
                `EstablishmentTypeController - failed to update establishment type, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                    establishmentTypeId,
                    updateEstablishmentTypeDto,
                },
            );
            throw error;
        }
    }

    @Delete('/:id')
    async delete(@Param('id') establishmentTypeId: string) {
        try {
            await this.establishmentTypeService.delete(establishmentTypeId);
        } catch (error) {
            this.logger.error(
                `EstablishmentTypeController - failed to delete establishment type, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                    establishmentTypeId,
                },
            );
            throw error;
        }
    }
}
