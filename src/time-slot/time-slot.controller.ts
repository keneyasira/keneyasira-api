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

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
// import { Roles } from '../role/decorators/roles.decorator';
// import { ROLE_NAMES } from '../role/role.service';
import { SortParams } from '../typings/query.typings';
import { errorToPlainObject } from '../utils/error.helper';
import { ParseLimitParamPipe } from '../utils/pipes/parseLimitParamPipe';
import { DEFAULT_SORT_PARAMS, ParseSortPipe } from '../utils/pipes/parseSortParamPipe';
import { CreateTimeSlotDto } from './dtos/create-time-slot.dto';
import { UpdateTimeSlotDto } from './dtos/update-time-slot.dto';
import { TimeSlotService } from './time-slot.service';

@ApiBearerAuth()
@ApiTags('time-slot')
@Controller('time-slots')
export class TimeSlotController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly timeSlotService: TimeSlotService,
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
            return this.timeSlotService.findAndCountAll({ page, limit, sort });
        } catch (error) {
            this.logger.error(
                `TimeSlotController - failed to get time slots, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Get('/:id')
    async findOne(@Param('id') timeSlotId: string) {
        try {
            return this.timeSlotService.find(timeSlotId);
        } catch (error) {
            this.logger.error(
                `TimeSlotController - failed to get time slot, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Post('/')
    // @Roles(ROLE_NAMES.ADMIN, ROLE_NAMES.PRACTICIAN)
    async create(@Body() createTimeSlotDto: CreateTimeSlotDto) {
        try {
            return this.timeSlotService.create(createTimeSlotDto);
        } catch (error) {
            this.logger.error(
                `TimeSlotController - failed to create time slot, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Put('/:id')
    // @Roles(ROLE_NAMES.ADMIN, ROLE_NAMES.PRACTICIAN)
    async update(@Body() updateTimeSlotDto: UpdateTimeSlotDto, @Param('id') timeSlotId: string) {
        if (timeSlotId !== updateTimeSlotDto.id) {
            throw new BadRequestException('Mismatching identifiers');
        }

        try {
            return this.timeSlotService.update(updateTimeSlotDto);
        } catch (error) {
            this.logger.error(
                `TimeSlotController - failed to update time slot, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Delete('/:id')
    // @Roles(ROLE_NAMES.ADMIN, ROLE_NAMES.PRACTICIAN)
    async delete(@Param('id') timeSlotId: string) {
        try {
            await this.timeSlotService.delete(timeSlotId);
        } catch (error) {
            this.logger.error(
                `TimeSlotController - failed to delete time slot, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }
}
