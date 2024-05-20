import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

@Module({
    controllers: [PatientController],
    providers: [PatientService],
    exports: [PatientService],
    imports: [CoreModule],
})
export class PatientModule {}
