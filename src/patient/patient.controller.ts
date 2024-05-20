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
import { ParseSortPipe } from '../utils/pipes/parseSortParamPipe';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';

@ApiBearerAuth()
@ApiTags('patient')
@Controller('patient')
export class PatientController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly patientService: PatientService,
    ) {}

    @Get('/')
    async findAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[],
    ) {
        try {
            return this.patientService.findAndCountAll({ page, limit, sort });
        } catch (error) {
            this.logger.error(
                `PatientController - failed to get patients, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Get('/:id')
    async findOne(@Param('id') patientId: string) {
        try {
            return this.patientService.find(patientId);
        } catch (error) {
            this.logger.error(
                `PatientController - failed to get patient, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Post('/')
    async create(@Body() createPatientDto: CreatePatientDto) {
        try {
            return this.patientService.create(createPatientDto);
        } catch (error) {
            this.logger.error(
                `PatientController - failed to create patient, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );

            throw error;
        }
    }

    @Put('/:id')
    async update(
        @Body() updatePatientDto: UpdatePatientDto,
        @Param('id') patientId: string,
    ) {

        if (patientId !== updatePatientDto.id) {
            throw new BadRequestException('Mismatching identifiers');
        }

        try {
            return this.patientService.update(updatePatientDto);
        } catch (error) {
            this.logger.error(
                `PatientController - failed to update patient, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );

            throw error;
        }
    }

    @Delete('/:id')
    async delete(@Param('id') patientId: string) {
        try {
            return this.patientService.delete(patientId);
        } catch (error) {
            this.logger.error(
                `PatientController - failed to delete patient, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );

            throw error;
        }
    }
}
