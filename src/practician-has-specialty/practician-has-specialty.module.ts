import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { PracticianHasSpecialtyController } from './practician-has-specialty.controller';
import { PracticianHasSpecialtyService } from './practician-has-specialty.service';

@Module({
    imports: [CoreModule],
    controllers: [PracticianHasSpecialtyController],
    providers: [PracticianHasSpecialtyService],
    exports: [PracticianHasSpecialtyService],
})
export class PracticianHasSpecialtyModule {}
