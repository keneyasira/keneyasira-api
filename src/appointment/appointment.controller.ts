import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApplicationLoggerService } from 'src/core/logger/application.logger.service';
import { AppointmentService } from './appointment.service';

@ApiBearerAuth()
@ApiTags('appointment')
@Controller('appointments')
export class AppointmentController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly appointmentService: AppointmentService,
    ) {}
}
