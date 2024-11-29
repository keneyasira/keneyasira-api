import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { EstablishmentTypeController } from './establishment-type.controller';
import { EstablishmentTypeService } from './establishment-type.service';

@Module({
    providers: [EstablishmentTypeService],
    controllers: [EstablishmentTypeController],
    imports: [CoreModule],
    exports: [EstablishmentTypeService],
})
export class EstablishmentTypeModule {}
