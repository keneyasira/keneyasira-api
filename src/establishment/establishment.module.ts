import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { EstablishmentController } from './establishment.controller';
import { EstablishmentService } from './establishment.service';

@Module({
    controllers: [EstablishmentController],
    providers: [EstablishmentService],
    exports: [EstablishmentService],
    imports: [CoreModule],
})
export class EstablishmentModule {}