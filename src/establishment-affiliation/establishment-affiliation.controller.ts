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
import { CreateEstablishmentAffiliationDto } from './dtos/create-establishment-affiliation.dto';
import { UpdateEstablishmentAffiliationDto } from './dtos/update-establishment-affiliation.dto';
import { EstablishmentAffiliationService } from './establishment-affiliation.service';

@ApiBearerAuth()
@ApiTags('establishment-affiliation')
@Controller('establishment-affiliationes')
export class EstablishmentAffiliationController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly establishmentAffiliationService: EstablishmentAffiliationService,
    ) {}

    @Get('/')
    async findAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
    ) {
        try {
            return this.establishmentAffiliationService.findAndCountAll({ page, limit, sort });
        } catch (error) {
            this.logger.error(
                `EstablishmentAffiliationController - failed to get establishment affiliation, ${
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
    async findOne(@Param('id') establishmentAffiliationId: string) {
        try {
            return this.establishmentAffiliationService.find(establishmentAffiliationId);
        } catch (error) {
            this.logger.error(
                `EstablishmentAffiliationController - failed to get establishment affiliation, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                    establishmentAffiliationId,
                },
            );
            throw error;
        }
    }

    @Post('/')
    async create(@Body() createEstablishmentAffiliationDto: CreateEstablishmentAffiliationDto) {
        try {
            return this.establishmentAffiliationService.create(createEstablishmentAffiliationDto);
        } catch (error) {
            this.logger.error(
                `EstablishmentAffiliationController - failed to create establishment affiliation, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                    createEstablishmentAffiliationDto,
                },
            );
            throw error;
        }
    }

    @Put('/:id')
    async update(
        @Param('id') establishmentAffiliationId: string,
        @Body() updateEstablishmentAffiliationDto: UpdateEstablishmentAffiliationDto,
    ) {
        if (establishmentAffiliationId !== updateEstablishmentAffiliationDto.id) {
            throw new BadRequestException('Mismatching identifiers');
        }

        try {
            return this.establishmentAffiliationService.update(updateEstablishmentAffiliationDto);
        } catch (error) {
            this.logger.error(
                `EstablishmentAffiliationController - failed to update establishment affiliation, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                    establishmentAffiliationId,
                    updateEstablishmentAffiliationDto,
                },
            );
            throw error;
        }
    }

    @Delete('/:id')
    async delete(@Param('id') establishmentAffiliationId: string) {
        try {
            await this.establishmentAffiliationService.delete(establishmentAffiliationId);
        } catch (error) {
            this.logger.error(
                `EstablishmentAffiliationController - failed to delete establishment affiliation, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                    establishmentAffiliationId,
                },
            );
            throw error;
        }
    }
}
