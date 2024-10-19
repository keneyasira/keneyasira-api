import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { EstablishmentHasPracticianController } from './establishment-has-practician.controller';
import { EstablishmentHasPracticianService } from './establishment-has-practician.service';

@Module({
    imports: [CoreModule],
    controllers: [EstablishmentHasPracticianController],
    providers: [EstablishmentHasPracticianService],
    exports: [EstablishmentHasPracticianService],
})
export class EstablishmentHasPracticianModule {}