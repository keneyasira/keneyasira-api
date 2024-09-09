import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { PracticianController } from './practician.controller';
import { PracticianService } from './practician.service';

@Module({
    imports: [CoreModule],
    controllers: [PracticianController],
    providers: [PracticianService],
    exports: [PracticianService],
})
export class PracticianModule {}
