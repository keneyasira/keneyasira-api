import { Module } from '@nestjs/common';
import { EstablishmentController } from './establishment.controller';
import { EstablishmentService } from './establishment.service';
import { CoreModule } from '../core/core.module';

@Module({
    controllers: [EstablishmentController],
    providers: [EstablishmentService],
    exports: [EstablishmentService],
    imports: [CoreModule],
})
export class EstablishmentModule {}