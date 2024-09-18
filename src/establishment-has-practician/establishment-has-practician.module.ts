import { Module } from '@nestjs/common';
import { EstablishmentHasPracticianController } from './establishment-has-practician.controller';
import { EstablishmentHasPracticianService } from './establishment-has-practician.service';
import { CoreModule } from 'src/core/core.module';

@Module({
    imports: [CoreModule],
    controllers: [EstablishmentHasPracticianController],
    providers: [EstablishmentHasPracticianService],
    exports: [EstablishmentHasPracticianService],
})
export class EstablishmentHasPracticianModule {}