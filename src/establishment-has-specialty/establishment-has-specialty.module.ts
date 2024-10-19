import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { EstablishmentHasSpecialtyController } from './establishment-has-specialty.controller';
import { EstablishmentHasSpecialtyService } from './establishment-has-specialty.service';

@Module({
    imports: [CoreModule],
    controllers: [EstablishmentHasSpecialtyController],
    providers: [EstablishmentHasSpecialtyService],
    exports: [EstablishmentHasSpecialtyService],
})
export class EstablishmentHasSpecialtyModule {}