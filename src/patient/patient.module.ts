import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { CategoryController } from './patient.controller';
import { CategoryService } from './patient.service';

@Module({
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService],
    imports: [CoreModule],
})
export class CategoryModule {}
