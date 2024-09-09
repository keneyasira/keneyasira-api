import { Module } from '@nestjs/common';
import { PracticianHasSpecialtyController } from './practician-has-specialty.controller';
import { PracticianHasSpecialtyService } from './practician-has-specialty.service';
import { CoreModule } from 'src/core/core.module';

@Module({
    imports: [CoreModule],
    controllers: [PracticianHasSpecialtyController],
    providers: [PracticianHasSpecialtyService],
    exports: [PracticianHasSpecialtyService],
})
export class PracticianHasSpecialtyModule {}
