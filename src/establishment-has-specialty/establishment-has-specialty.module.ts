import { Module } from '@nestjs/common';
import { EstablishmentHasSpecialtyController } from './establishment-has-specialty.controller';
import { EstablishmentHasSpecialtyService } from './establishment-has-specialty.service';
import { CoreModule } from 'src/core/core.module';

@Module({
    imports: [CoreModule],
    controllers: [EstablishmentHasSpecialtyController],
    providers: [EstablishmentHasSpecialtyService],
    exports: [EstablishmentHasSpecialtyService],
})
export class EstablishmentHasSpecialtyModule {}