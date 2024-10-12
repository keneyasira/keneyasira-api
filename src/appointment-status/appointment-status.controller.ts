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

import { AppointmentStatusService } from './appointment-status.service';
import { CreateAppointmentStatusDto } from './dtos/create-appointment-status.dto';
import { UpdateAppointmentStatusDto } from './dtos/update-appointment-status.dto';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { SortParams } from '../typings/query.typings';
import { errorToPlainObject } from '../utils/error.helper';
import { ParseLimitParamPipe } from '../utils/pipes/parseLimitParamPipe';
import { DEFAULT_SORT_PARAMS, ParseSortPipe } from '../utils/pipes/parseSortParamPipe';

@ApiBearerAuth()
@ApiTags('Appointment Status')
@Controller('appointment-statuses')
export class AppointmentStatusController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly appointmentStatusService: AppointmentStatusService,
    ) {}

    @Get('/')
    async findAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
    ) {
        try {
            return this.appointmentStatusService.findAndCountAll({ page, limit, sort });
        } catch (error) {
            this.logger.error(
                `AppointmentStatusController - failed to get appointment status, ${
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
    async findOne(@Param('id') appointmentStatusId: string) {
        try {
            return this.appointmentStatusService.find(appointmentStatusId);
        } catch (error) {
            this.logger.error(
                `AppointmentStatusController - failed to get appointment status, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                    appointmentStatusId,
                },
            );
            throw error;
        }
    }

    @Post('/')
    async create(@Body() createAppointmentStatusDto: CreateAppointmentStatusDto) {
        try {
            return this.appointmentStatusService.create(createAppointmentStatusDto);
        } catch (error) {
            this.logger.error(
                `AppointmentStatusController - failed to create appointment status, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                    createAppointmentStatusDto,
                },
            );
            throw error;
        }
    }

    @Put('/:id')
    async update(
        @Param('id') appointmentStatusId: string,
        @Body() updateAppointmentStatusDto: UpdateAppointmentStatusDto,
    ) {
        if (appointmentStatusId !== updateAppointmentStatusDto.id) {
            throw new BadRequestException('Mismatching identifiers');
        }

        try {
            return this.appointmentStatusService.update(updateAppointmentStatusDto);
        } catch (error) {
            this.logger.error(
                `AppointmentStatusController - failed to update appointment status, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                    appointmentStatusId,
                    updateAppointmentStatusDto,
                },
            );
            throw error;
        }
    }

    @Delete('/:id')
    async delete(@Param('id') appointmentStatusId: string) {
        try {
            await this.appointmentStatusService.delete(appointmentStatusId);
        } catch (error) {
            this.logger.error(
                `AppointmentStatusController - failed to delete appointment status, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                    appointmentStatusId,
                },
            );
            throw error;
        }
    }
}
