import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService],
    imports: [CoreModule],
})
export class AdminModule {}