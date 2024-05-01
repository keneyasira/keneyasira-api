import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { SpecialtyController } from './specialty.controller';
import { SpecialtyService } from './specialty.service';

@Module({
    providers: [SpecialtyService],
    controllers: [SpecialtyController],
    imports: [CoreModule],
    exports: [SpecialtyService],
})
export class SpecialtyModule {}
