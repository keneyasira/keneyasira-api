import { Injectable } from "@nestjs/common";
import { ApplicationLoggerService } from "src/core/logger/application.logger.service";

@Injectable()
export class AppointmentService {
    constructor(private readonly logger: ApplicationLoggerService) {}
}
