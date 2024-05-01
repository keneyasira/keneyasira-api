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
import { KeycloakUser, Public, RoleMatchingMode, Roles, User } from 'nestjs-keycloak-admin';

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
    @Roles({ roles: ['admin'], mode: RoleMatchingMode.ALL })
    @Public()
    async findAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[],
    ) {
        try {
            return this.patientService.findAndCountAll({ page, limit, sort });
        } catch (error) {
            this.logger.error(
                `PatientController - failed to get categories, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Get('/:id')
    @Public()
    // @Roles({ roles: ['admin'], mode: RoleMatchingMode.ALL })
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
    async create(@User() user: KeycloakUser, @Body() createPatientDto: CreatePatientDto) {
        try {
            return this.patientService.create(createPatientDto, user.email);
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
    @Roles({ roles: ['admin'], mode: RoleMatchingMode.ALL })
    async update(
        @User() user: KeycloakUser,
        @Body() updatePatientDto: UpdatePatientDto,
        @Param('id') userId: string,
    ) {
        if (userId !== updatePatientDto.id) {
            throw new BadRequestException('Mismatching identifiers');
        }

        try {
            return this.patientService.update(updatePatientDto, user.email);
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
    @Roles({ roles: ['admin'], mode: RoleMatchingMode.ALL })
    async delete(@User() user: KeycloakUser, @Param('id') patientId: string) {
        try {
            return this.patientService.delete(patientId, user.email);
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
