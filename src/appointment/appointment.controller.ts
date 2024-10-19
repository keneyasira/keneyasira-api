import { BadRequestException, Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { SortParams } from '../typings/query.typings';
import { errorToPlainObject } from '../utils/error.helper';
import { ParseLimitParamPipe } from '../utils/pipes/parseLimitParamPipe';
import { DEFAULT_SORT_PARAMS,ParseSortPipe } from '../utils/pipes/parseSortParamPipe';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';

@ApiBearerAuth()
@ApiTags('appointment')
@Controller('appointments')
export class AppointmentController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly appointmentService: AppointmentService,
    ) {}


    @Get('/')
    async findAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
    ) {
        try {
            return this.appointmentService.findAndCountAll({ page, limit, sort });
        } catch (error) {
            this.logger.error(
                `AppointmentController - failed to get appointments, ${
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
    async findOne(@Param('id') appointmentId: string) {
        try {
            return this.appointmentService.find(appointmentId);
        } catch (error) {
            this.logger.error(
                `AppointmentController - failed to get appointment, ${
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
    async create(@Body() createAppointmentDto: CreateAppointmentDto) {
        try {
            return this.appointmentService.create(createAppointmentDto);
        } catch (error) {
            this.logger.error(
                `AppointmentController - failed to create appointment, ${
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
        @Body() updateAppointmentDto: UpdateAppointmentDto,
        @Param('id') appointmentId: string,
    ) {
        if (appointmentId !== updateAppointmentDto.id) {
            throw new BadRequestException('Mismatching identifiers');
        }

        try {
            return this.appointmentService.update(updateAppointmentDto);
        } catch (error) {
            this.logger.error(
                `AppointmentController - failed to update appointment, ${
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
    async delete(@Param('id') appointmentId: string) {
        try {
            await this.appointmentService.delete(appointmentId);
        } catch (error) {
            this.logger.error(
                `AppointmentController - failed to delete appointment, ${
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
