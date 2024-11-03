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

import { AuthenticatedUser } from '../authentication/decorators/authenticated-user.param-decorator';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { SortParams } from '../typings/query.typings';
import { UserAttributes } from '../user/models/user.model';
import { errorToPlainObject } from '../utils/error.helper';
import { ParseLimitParamPipe } from '../utils/pipes/parseLimitParamPipe';
import { DEFAULT_SORT_PARAMS, ParseSortPipe } from '../utils/pipes/parseSortParamPipe';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { PatientService } from './patient.service';

@ApiBearerAuth()
@ApiTags('patient')
@Controller('patients')
export class PatientController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly patientService: PatientService,
    ) {}

    @Get('/')
    @ApiQuery({
        name: 'sort',
        required: false,
        type: String,
        example: `[{field: 'createdAt', order: 'DESC'}]`,
    })
    async findAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
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
    async create(
        @AuthenticatedUser() user: UserAttributes,
        @Body() createPatientDto: CreatePatientDto,
    ) {
        try {
            return this.patientService.create({ ...createPatientDto, createdBy: user.id });
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
        @AuthenticatedUser() user: UserAttributes,
        @Body() updatePatientDto: UpdatePatientDto,
        @Param('id') patientId: string,
    ) {
        if (patientId !== updatePatientDto.id) {
            throw new BadRequestException('Mismatching identifiers');
        }

        try {
            return this.patientService.update({ ...updatePatientDto, updatedBy: user.id });
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
    async delete(@AuthenticatedUser() user: UserAttributes, @Param('id') patientId: string) {
        try {
            await this.patientService.delete({ patientId, deletedBy: user.id });
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
